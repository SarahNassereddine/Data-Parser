import { CSVOrderMapper } from "../../mappers/Order.mapper";
import { IOrder } from "../../model/IOrder";
import { parseCSV, writeCSVFile } from "../../parsers/csvParser";
import { OrderRepository } from "./order.repository"
import { CSVCakeMapper } from "../../mappers/Cake.mapper";

export class CakeOrderRepository extends OrderRepository{
    private mapper=new CSVOrderMapper(new CSVCakeMapper());
    constructor(private readonly filePath:string){
        super();
    }
    protected async load(): Promise<IOrder[]>{
        //read 2D string from the file
        const csv=await parseCSV(this.filePath);
        //convert the string [] into an object
        //const mapper=new CSVOrderMapper(new CSVCakeMapper);
        //return the list of objects
        return csv.map(this.mapper.map.bind(this.mapper));
    }
    protected async save(orders: IOrder[]):Promise<void>{
        //generate the list of headers
         const header = [
        "id", "Type", "Flavor", "Filling", "Size", "Layers",
        "Frosting Type", "Frosting Flavor", "Decoration Type",
        "Decoration Color", "Custom Message", "Shape", "Allergies",
        "Special Ingredients", "Packaging Type", "Price", "Quantity"
    ];
    //convert the orders into 2d string
    const rawItems = orders.map(this.mapper.reverseMap.bind(this.mapper));
    //parse,write
    await writeCSVFile(this.filePath, [header, ...rawItems]);
   }
    }
    

