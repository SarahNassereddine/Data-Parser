import { dbException, InitializationException } from "../../repository/util/exceptions/RepositoryExceptions";
import logger from "../../logger/logger";
import { IdentifiableCake } from "../../model/cake.model";
import { id, initializable, IRepository } from "../../repository/IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { SQLiteCake, SQLiteCakeMapper } from "../../mappers/Cake.mapper";
import { ItemNotFoundException } from "../util/exceptions/RepositoryExceptions";

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "cakes" (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    flavor TEXT NOT NULL,
    filling TEXT NOT NULL,
    size INTEGER NOT NULL,
    layers INTEGER NOT NULL,
    frostingType TEXT NOT NULL,
    frostingFlavor TEXT NOT NULL,
    decorationType TEXT NOT NULL,
    decorationColor TEXT NOT NULL,
    customMessage TEXT NOT NULL,
    shape TEXT NOT NULL,
    allergies TEXT NOT NULL,
    specialIngredients TEXT NOT NULL,
    packagingType TEXT NOT NULL
)`;
const INSERT_CAKE = `INSERT INTO "cakes" (id, type, flavor, filling, size, layers, frostingType, frostingFlavor, decorationType, decorationColor, customMessage, shape, allergies, specialIngredients, packagingType)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const SELECT_BY_ID=`SELECT * FROM "cakes" WHERE id = ?`;

export class CakeRepository implements IRepository<IdentifiableCake>, initializable {
    async init(): Promise<void> {
        try{ const conn= await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            logger.info('cake table initialized');
        }catch (error){
            logger.error('Error initializing cake table', error);
            throw new InitializationException('Failed to initialize cake table',error as Error);
        }
    }
    async create(item: IdentifiableCake): Promise<id> {
        // it is expected that transaction has been initiated before this method is called.
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(INSERT_CAKE,
                item.getId(),
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType()
            );
            return item.getId();
        } catch (error) {
            logger.error('Error creating cake', error);
            throw new dbException('Failed to create cake', error as Error);
        }
    }
    async get(id: id): Promise<IdentifiableCake> {
         try{
            const conn= await ConnectionManager.getConnection();
            const row = await conn.get<SQLiteCake>(SELECT_BY_ID, id);
            logger.info("cake got %o", row);
            if(!row)
                throw new ItemNotFoundException("cake of id"+ id +" not found.");
            return new SQLiteCakeMapper().map(row);
         }catch(error){
            logger.error('Error getting cake of id %s %o', id, error);
            throw new dbException('Failed to get cake of id '+id,  error as Error);
         }
    }
    getAll(): Promise<IdentifiableCake[]> {
        throw new Error("Method not implemented.");
    }
    update(item: IdentifiableCake): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: id): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
