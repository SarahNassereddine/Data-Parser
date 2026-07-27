import { InvalidItemException, ItemNotFoundException } from "../../util/exceptions/RepositoryExceptions";
import { id, IRepository } from "../IRepository";
import logger from "../../logger/logger";
import { IOrder } from "../../model/IOrder";

export abstract class OrderRepository implements IRepository<IOrder>{

    //to be implemented later -> abstract (complex to implement it here bcz we have different files types)
    protected abstract load(): Promise<IOrder[]>; 
    protected abstract save(orders: IOrder[]):Promise<void>;

    async create(item:IOrder):Promise <id>{
        //validate the order(single resp we will check only if null)
        if(!item){
            logger.error("Order cannot be null");
            throw new InvalidItemException("Order cannot be null");
        }
        //load all orders
        const orders=await this.load();
        //add the new order 
        const id=orders.push(item); //returns length: this is the id
        //save all orders
        await this.save(orders);
        logger.info("Successfully created order of id %d",id);
        // if I was returning ID return {getId:()=>String(id)}; //return the function bcz we should return an ID 
        return String(id);
    }
    async get(id:id):Promise <IOrder>{
        const orders=await this.load();
        const foundOrder=orders.find(o=>o.getId()===id);
        if(!foundOrder){
            logger.error("Failed to find order of id %s",id);
            throw new ItemNotFoundException("Failed to find the element");
        }
         logger.info("found item of id %s",id);
        return foundOrder;
    }
    async getAll():Promise<IOrder[]>{
        const orders = await this.load();
        logger.info("Retrieving %d elements", orders.length);
        return orders;
    }
    async update(item:IOrder):Promise<void>{
        if(!item){
            logger.error("Order cannot be null");
             throw new InvalidItemException("Order cannot be null");
        }
        const orders=await this.load();
        const index=orders.findIndex(o=>o.getId()===item.getId());
        if(index===-1){
             logger.error("Failed to find order of id %s",item.getId());
            throw new ItemNotFoundException("Failed to find the element");
        }
        orders[index]=item;
        logger.info("item with id %s is updated",item.getId());
        await this.save(orders);

    }
    async delete(id:id): Promise<void>{
         const orders = await this.load();
        const index = orders.findIndex(o => o.getId() === id);
        if (index === -1) {
            logger.error("Failed to find order of id %s", id);
            throw new ItemNotFoundException("Failed to find the element");
        }
        orders.splice(index, 1);
        await this.save(orders);
        logger.info("Successfully deleted order of id %s", id);
    }

}
