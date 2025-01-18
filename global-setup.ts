import dotenv from "dotenv"
const setupEnvironment = async()=>{
    dotenv.config({
        path: `./config/${process.env.NODE_ENV}/.env`
    })
    dotenv.config({
        path: "./config/common.env"
    })
}
module.exports = setupEnvironment;