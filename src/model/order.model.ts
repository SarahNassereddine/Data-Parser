import { IdentifiableItem } from "./IItem";
import {IItem} from "./IItem";
import { IIdentifiableOrderItem} from "./IOrder";
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

export class IdentifiableOrderItem  implements IIdentifiableOrderItem {
    constructor(private identifiableItem: IdentifiableItem,
                private price: number,
                private quantity: number,
                private id: string) {
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
    getItem(): IdentifiableItem {
        return this.identifiableItem;
    }
}
