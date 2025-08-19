import { parseCSV } from "./parsers/csvParser";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import logger from "./logger/logger";
import { CSVOrderMapper } from "./mappers/Order.mapper";
import { parseJSON } from "./parsers/jsonParser";
import { JSONBookMapper } from "./mappers/Book.mapper";
import { parseXml } from "./parsers/xmlParser";
import { XMLToyMapper } from "./mappers/Toy.mapper";

async function main(){
    const CSVallData=await parseCSV("src/data/cake orders.csv");
    const data=CSVallData.slice(1);
    const cakeMapper=new CSVCakeMapper();
    const orderMapper=new CSVOrderMapper(cakeMapper);
    const orders= data.map(row=>orderMapper.map(row));
    logger.debug("list of orders: %o", orders);
    logger.info({ message: "list of orders", orders });
    logger.info("finished maping csv data");

    const JSONdata= await parseJSON("src/data/book orders.json");
    const bookMapper=new JSONBookMapper();
    const books = JSONdata.map((item: { [key: string]: string }) => bookMapper.map(item));
    logger.debug("list of books: %o", books);
    logger.info({ message: "list of books", books });
    logger.info("finished mapping json data");

    const XmlToyData = await parseXml("src/data/toy orders.xml");
    const toyMapper = new XMLToyMapper();
    const toys = XmlToyData.data.row.map((row: { [key: string]: string }) => {
        const flatRow: { [key: string]: string } = {};
        for (const key in row) {
            flatRow[key] = row[key][0]; 
        }
        return toyMapper.map(flatRow);
});
    logger.debug("list of toys: %o", toys);
    logger.info({ message: "list of toys", toys });
    logger.info("Finished mapping XML toys");

}
    
main();
