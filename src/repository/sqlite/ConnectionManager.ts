import config from "../../config";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export class ConnectionManager {
    // to get one instance in all the program. singleton pattern
  private constructor() {} ///private 
  private static db: Database | null = null;

    public static async getConnection(): Promise<Database> {
        if (!this.db) {
            this.db = await open({
                filename: config.storagePath.sqlite,
                driver: sqlite3.Database
            });
        }
        return this.db;
    }
}
