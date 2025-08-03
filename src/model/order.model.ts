import {IItem} from "./item.model"
export interface IOrder{
    getItem():IItem;
    getPrice(): number;
    getQuantity():number;
    getId():string;
}
export class Order implements IOrder{
    constructor(private item: IItem,
                private price: number,
                private quantity: number,
                private id: string) {}
    getItem(): IItem {
        return this.item;
    }
    getPrice(): number {
        return this.price;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getId(): string {
        return this.id;
    }
}

           
