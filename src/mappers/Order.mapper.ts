import { IItem } from "../model/IItem";
import { OrderBuilder } from "../model/builders/Order.builder";
import { IMapper } from "./IMapper";
import { IOrder } from "../model/IOrder";

export class CSVOrderMapper implements IMapper<string[], IOrder>{
    constructor(private itemMapper:IMapper<string[],IItem>){};
    map(data:string[]):IOrder
    // considering the client will work in the same order of inputs ie id first then... if not we will search headers before, using include headers in the call of readcsv
    {
        //insead of const item: IItem=new CSVCakeMapper().map(data); we created constructor to solve the strongly coppeled problem using dependancy insertion so we can call directly this...
        const  item: IItem=this.itemMapper.map(data);
        

        return OrderBuilder.newBuilder()
                            .setId(data[0])
                            .setQuantity(parseInt(data[15]))
                            .setPrice(parseInt(data[16]))
                            .setItem(item)
                            .build();            
    }
    reverseMap(data: IOrder): string[] {
    // On commence par mapper l'item en string[]
    const item: string[] = this.itemMapper.reverseMap(data.getItem());

    return [
        data.getId(),
        ...item, // ...:concatenates the array.
        data.getQuantity().toString(),
        data.getPrice().toString()
    ];
}
}
/*export async function parseJSON<T = any>(filePath: string): Promise<T> {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    if(!fileContent.trim()) {
        return [] as T; // Return an empty array if the file is empty
    }
    try {
        return JSON.parse(fileContent) as T; // Parse the JSON content
    } catch (error) {
        throw new Error(`Failed to parse JSON from file ${filePath}: ${(error as Error).message}`);
    }

}
 */
export class JSONOrderMapper implements IMapper<any, IOrder> {
    constructor(private itemMapper: IMapper<any, IItem>) {}

    map(data: any): IOrder {
        const item: IItem = this.itemMapper.map(data);

        return OrderBuilder.newBuilder()
            .setId(data.id)
            .setQuantity(data.quantity)
            .setPrice(data.price)
            .setItem(item)
            .build();
    }

    reverseMap(data: IOrder): any {
        return {
            id: data.getId(),
            item: this.itemMapper.reverseMap(data.getItem()),
            quantity: data.getQuantity(),
            price: data.getPrice()
        };
    }
}
/*
export async function parseXml<T = any>(filePath: string): Promise<T> {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        if (!fileContent.trim()) {
            return {} as T; // Return an empty object if the file is empty
        }
        const result = await parseStringPromise(fileContent, {
            explicitArray: true,
            trim: true,
            mergeAttrs: true,
        });
        return result as T;
    } catch (error) {
        throw new Error(`Failed to parse XML: ${(error as Error).message}`);
    }
} */
export class XmlOrderMapper implements IMapper<any, IOrder> {
    constructor(private itemMapper: IMapper<any, IItem>) {}

    map(data: any): IOrder {
        // Assuming XML is parsed to JS object with structure: { id: [string], quantity: [string], price: [string], ... }
        const item: IItem = this.itemMapper.map(data);
        return OrderBuilder.newBuilder()
            .setId(data.OrderID?.[0] ?? "")
            .setQuantity(parseInt(data.Quantity?.[0] ?? "0"))
            .setPrice(parseInt(data.Price?.[0] ?? "0"))
            .setItem(item)
            .build();
    }

    reverseMap(data: IOrder): any {
        return {
            OrderID: [data.getId()],
            item: [this.itemMapper.reverseMap(data.getItem())],
            Quantity: [data.getQuantity().toString()],
            Price: [data.getPrice().toString()]
        };
    }
}
