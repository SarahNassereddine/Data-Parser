import config from "config";
import { ItemCategory } from "model/IItem";
import { IIdentifiableOrderItem } from "model/IOrder";
import { IRepository } from "repository/IRepository";
import { RepositoryFactory } from "repository/repository.factory";
import { ServiceException } from "repository/util/exceptions/ServiceException";

export class OrderManegmentService {
    // Service methods go here
    public async createOrder(order: IIdentifiableOrderItem): Promise<IIdentifiableOrderItem> {
    this.validateOrder(order);
    const repo = await this.getRepo(order.getItem().getCategory());
    await repo.create(order);
    return order;
}
public async getOrder(id: string): Promise<IIdentifiableOrderItem> {
    const categories = Object.values(ItemCategory);
    for (const category of categories) {
        const repo = await this.getRepo(category);
        const order = await repo.get(id);
        if (order) {
            return order;
        }
    }
    throw new ServiceException(`Order with id ${id} not found`);
}
public async updateOrder(order: IIdentifiableOrderItem): Promise<void> {
    this.validateOrder(order);
    const repo = await this.getRepo(order.getItem().getCategory());
    await repo.update(order);
}
public async deleteOrder(id: string): Promise<void> {
    const categories = Object.values(ItemCategory);
    for (const category of categories) {
        const repo = await this.getRepo(category);
        const order = await repo.get(id);
        if (order) {
            await repo.delete(id);
            return;
        }
    }
    throw new ServiceException(`Order with id ${id} not found`);
}
public async getAllOrders(): Promise<IIdentifiableOrderItem[]> {
    const categories = Object.values(ItemCategory);
    const allOrders: IIdentifiableOrderItem[] = [];
    for (const category of categories) {
        const repo = await this.getRepo(category);
        const orders = await repo.getAll();
        allOrders.push(...orders);
    }
    return allOrders;
}
public async getTotalRevenue(): Promise<number> {
    const orders = await this.getAllOrders();
    const revenues = orders.map(order => order.getPrice() * order.getQuantity());
    let total = 0;
    for (const revenue of revenues) {
        total += revenue;
    }
    return total;
}
public async getTotalOrders(): Promise<number> {
    const orders = await this.getAllOrders();
    return orders.length;
}
//helpers:
private async getRepo(category: ItemCategory): Promise<IRepository<IIdentifiableOrderItem>> {
    return RepositoryFactory.create(config.dbMode, category);
}
private validateOrder(order: IIdentifiableOrderItem): void {
    if (!order.getItem() || order.getPrice() <= 0 || order.getQuantity() <= 0) {
        throw new ServiceException("Invalid order: item, price, and quantity must be valid.");
    }
}
}
