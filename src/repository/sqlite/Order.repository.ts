
import { id, initializable, IRepository } from "../../repository/IRepository";
import logger from "../../logger/logger";
import { dbException, InitializationException } from "../../repository/util/exceptions/RepositoryExceptions";
import {ConnectionManager} from "./ConnectionManager";
import { IdentifiableItem } from "../../model/IItem";
import { IIdentifiableOrderItem } from "../../model/IOrder";
import { ItemCategory } from "../../model/IItem";
import { SQLiteCSVOrderMapper, SQLiteOrder } from "../../mappers/Order.mapper";
import { ItemNotFoundException } from "../util/exceptions/RepositoryExceptions";

const tableName= ItemCategory.CAKE;
const CREATE_TABLE=`CREATE TABLE IF NOT EXISTS "orders" (
        id TEXT PRIMARY KEY,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        item_category TEXT NOT NULL,
        item_id TEXT NOT NULL
        )`;
const INSERT_ORDER=`INSERT INTO "orders" (id, quantity, price, item_category, item_id) VALUES (?, ?, ?, ?, ?)`;
const SELECT_BY_ID=`SELECT * FROM "orders" WHERE id = ?`;

const SELECT_ALL=`SELECT * FROM "orders" WHERE item_category = ?`;

export class OrderRepository  implements IRepository<IIdentifiableOrderItem>, initializable{ //implements the 2
    constructor( private readonly ItemRepository: IRepository<IdentifiableItem> & initializable){

    }
    async init(){
        try{ const conn= await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            await this.ItemRepository.init();
            logger.info('order table initialized');
        }catch (error){
            logger.error('Error initializing order table', error);
            throw new InitializationException('Failed to initialize order table',error as Error);
        }
        logger.info('order table initialized');
        
    }
    async create(order: IIdentifiableOrderItem): Promise<string> {
        let conn;
        try{
            conn = await ConnectionManager.getConnection();
            conn.exec('BEGIN TRANSACTION');
            const item_id= await this.ItemRepository.create(order.getItem());
            await conn.run(INSERT_ORDER, 
            order.getId(),
            order.getQuantity(),
            order.getPrice(),
            order.getItem().getCategory(),
            item_id);
            conn.exec('COMMIT');
            return order.getId();
        }
        catch(error){
            logger.error('Error creating order', error);
            conn && conn.exec('ROLLBACK'); // Rollback transaction if connection is established
            throw new dbException('Failed to create order', error as Error);
        }
        //transaction
            //insert data into item table
            //insert data into order table
        //commit
        //return order id

        //if error, log and rollBack
    }
    async get(id: id): Promise<IIdentifiableOrderItem> {
         try{
            const conn= await ConnectionManager.getConnection();
            const result = await conn.get<SQLiteOrder>(SELECT_BY_ID, id);
            if(!result){
                logger.error("order of id %s not found", id);
                throw new ItemNotFoundException("order of id"+ id +" not found.");
            }
            const cake =await this.ItemRepository.get(result.item_id);
            logger.info("order got %o", result);
            return new SQLiteCSVOrderMapper().map({data: result, item: cake}) as IIdentifiableOrderItem; //to do must remove & map.
         }catch(error){
            logger.error('Error getting order of id %s %o', id, error);
            throw new dbException('Failed to get order of id '+id,  error as Error);
         }
    }
    async getAll(): Promise<IIdentifiableOrderItem[]> {
        try {
            const conn = await ConnectionManager.getConnection();
            const rows = await conn.all<SQLiteOrder>(SELECT_ALL, itemCategory);
            return rows.map(row => new SQLiteCSVOrderMapper().map({ data: row, item: this.ItemRepository.get(row.item_id) })) as IIdentifiableOrderItem[];
        } catch (error) {
            logger.error('Error getting all orders %o', error);
            throw new dbException('Failed to get all orders', error as Error);
        }
    }
    update(item: IIdentifiableOrderItem): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: id): Promise<void> {
        throw new Error("Method not implemented.");
    }
}