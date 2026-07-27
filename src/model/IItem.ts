import { ID } from "../repository/IRepository";

export interface IItem{
    getCategory(): ItemCategory;
}

export interface IdentifiableItem extends ID,IItem{
}

export enum ItemCategory{
    CAKE="cake",
    BOOK="book",
    TOY="toy",
}