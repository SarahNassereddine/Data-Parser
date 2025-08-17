import { parseCSV } from "./parsers/csvParser";
import { BookBuilder } from "./model/builders/Book.builder";

import { ToyBuilder } from "./model/builders/Toy.builder";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import logger from "./logger/logger";
import { CSVOrderMapper } from "./mappers/Order.mapper";
import config from "./config";
import { CakeOrderRepository } from "./repository/file/cakeOrder.repository";

async function main(){
    //before:
    // const data=await parseCSV("src/data/cake orders.csv");
    //const cakeMapper=new CSVCakeMapper();
    //const orderMapper=new CSVOrderMapper(cakeMapper);
    //const orders= data.map(row=>orderMapper.map(row));
    //logger.info("list of orders: \n %o",orders);

    const path=config.storagePath.csv.cake;
    const repository=new CakeOrderRepository(path);
    const data=await repository.get("14");

    logger.info("list of orders: \n %o",data);
}
    
main();
