export type id= string;
export interface ID {
    getId():id;
}
/**
 * Generic interface defining the standard CRUD operations for a repository.
 * @template T - The type of items managed by the repository, must extend ID.
 */
export interface IRepository<T extends ID> {
    /**
     * Creates a new item in the repository.
     * @param item - The item to create.
     * @throws {InvalidItemException} if the item does not meet validity constraints.
     * @returns A promise resolving to the ID of the newly created item.
     */
    create(item: T): Promise<id>; // why T? to avoid using any. T extends ID to be cont'd

    /**
     * Retrieves an item from the repository by its identifier.
     * @param item - An object containing the identifier to search for.
     * @throws {ItemNotFoundException} if no item with the given identifier exists.
     * @returns A promise resolving to the found item.
     */
    get(id: id): Promise<T>;

    /**
     * Retrieves all items present in the repository.
     * @returns A promise resolving to an array of all items.
     */
    getAll(): Promise<T[]>;

     /**
     * Updates an existing item in the repository.
     * @param item - The item to update.
     * @throws {ItemNotFoundException} if the item to update does not exist.
     * @throws {InvalidItemException} if the updated item violates validity constraints.
     * @returns A promise resolved once the update is complete.
     */
    update(item: T): Promise<void>;

    /**
     * Deletes an existing item from the repository.
     * @param item - The item to delete.
     * @throws {ItemNotFoundException} if the item to delete does not exist.
     * @returns A promise resolved once the deletion is complete.
     */
    delete(id:string):Promise<void>;

}
