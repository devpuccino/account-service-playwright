import mysql, { Connection, QueryResult } from "mysql2"
class DataBaseKeyword {
    private dbConnection: Connection | null = null
    constructor() {
        this.dbConnection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT!),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        });
        this.dbConnection.connect();
        console.log("Connect database")
    }
    query = async (tableName: string, fields: string[], values: string[]): Promise<QueryResult> => {
        if (this.dbConnection != null) {
            const fieldString = fields.map(field => {
                return `${field}=?`
            }).join(" AND ")
            const [result, _] = await this.dbConnection.promise()
                .query(`SELECT * FROM ${tableName} WHERE ${fieldString}`, values)
            return result
        } else {
            return Promise.reject("Database did not connected")
        }

    }
    delete = async (tableName: string, fields: string[], values: any[]) => {
        if (this.dbConnection != null) {
            const fieldsString = fields.map(field => {
                return `${field}=?`
            })
            const [result, _] = await this.dbConnection.promise()
                .execute(`DELETE FROM ${tableName} WHERE ${fieldsString}`, values)
        } else {
            return Promise.reject("Database did not connected")
        }
    }
    insert = async (tableName: string, fields: string[], values: string[]) => {
        if (this.dbConnection != null) {
            const fieldString = fields.join(",")
            let valueString = ""
            values.forEach((value) => {
                if (valueString != "")
                    valueString += ","
                valueString += "?"
            })
            console.log(`INSERT INTO ${tableName}(${fieldString}) VALUES(${valueString})`)
            const [result, _] = await this.dbConnection.promise()
                .execute(`INSERT INTO ${tableName}(${fieldString}) VALUES(${valueString})`, values)
        } else {
            return Promise.reject("Database did not connected")
        }
    }
}
export default new DataBaseKeyword();