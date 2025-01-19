import dotenv from "dotenv"
import DatabaseKeyword from "./fixtures/DatabaseKeyword"
const setupEnvironment = async()=>{
    dotenv.config({
        path: `./config/${process.env.NODE_ENV}/.env`
    })
    dotenv.config({
        path: "./config/common.env"
    })
    DatabaseKeyword.connect();
}
export  default setupEnvironment;