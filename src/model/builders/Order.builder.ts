import { IdentifiableItem, IItem } from "../IItem";
import logger from "../../logger/logger";
import { IdentifiableOrderItem, Order } from "../order.model";


    export class OrderBuilder {
    private item!: IItem;
    private price!: number;
    private quantity!: number;
    private id!: string;

    public static newBuilder(): OrderBuilder {
        return new OrderBuilder();
    }

    setItem(item: IItem): OrderBuilder {
        this.item = item;
        return this;
    }

    setPrice(price: number): OrderBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    setId(id: string): OrderBuilder {
        this.id = id;
        return this;
    }

    build(): Order {
        const requiredProperties = [
            this.item,
            this.price,
            this.quantity,
            this.id
        ];

        for (const property of requiredProperties) {
            if (property===null || property===undefined) {
                logger.error("Missing required properties, could not build an order");
                throw new Error("Missing required properties");
            }
        }

        return new Order(
            this.item,
            this.price,
            this.quantity,
            this.id
        );
    }
}

export class IdentifiableOrderItemBuilder{
    private item!: IdentifiableItem;
    private order!: Order;

    public static newBuilder(): IdentifiableOrderItemBuilder {
        return new IdentifiableOrderItemBuilder();
    }
    setOrder(order: Order): IdentifiableOrderItemBuilder {
        this.order = order;
        return this;
    }
    setItem(item: IdentifiableItem): IdentifiableOrderItemBuilder {
        this.item = item;
        return this;
    }

    build(): IdentifiableOrderItem {

            if (!this.item || !this.order) {
                logger.error("Missing required properties, could not build an identifiable order item");
                throw new Error("Missing required properties");
            }

        return new IdentifiableOrderItem(
            this.item,
            this.order.getPrice(),
            this.order.getQuantity(),
            this.order.getId()
        );
    }
}