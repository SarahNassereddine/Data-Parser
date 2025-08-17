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
