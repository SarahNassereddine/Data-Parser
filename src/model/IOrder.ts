import { ID } from "../repository/IRepository";
import {IdentifiableItem, IItem} from "./IItem"
export interface IOrder{
    getItem():IItem;
    getPrice(): number;
    getQuantity():number;
    getId():string;
}

export interface IIdentifiableOrderItem extends IOrder, ID{
    getItem(): IdentifiableItem;
}
