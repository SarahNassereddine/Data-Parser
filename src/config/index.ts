import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(__dirname, "../../.env")})

export default{
    //SECRET:process.env.secret || 'default secret'
    logDir: process.env.LOGS_DIR || "./logs",
    isDev: process.env.NODE_ENV === "development", // if I am in development 
}