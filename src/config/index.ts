import dotenv from "dotenv"
import path from "path"
import {DBMode} from "repository/repository.factory"
dotenv.config({path: path.join(__dirname, "../../.env")})

export default{
    //SECRET:process.env.secret || 'default secret'
    logDir: process.env.LOGS_DIR || "./logs",
    isDev: process.env.NODE_ENV === "development", // if I am in development 
    storagePath:{
        csv:{
            cake:'src/data/cake orders.csv'
        },
        sqlite:'src/data/orders.db'
    },
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: process.env.HOST || "localhost",
    dbMode: DBMode.SQLITE,
}