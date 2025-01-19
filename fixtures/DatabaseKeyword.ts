import mysql, { Connection, QueryResult } from "mysql2"
class DatabaseKeyword {
    private dbConnection: Connection | null = null
    constructor() {
        this.dbConnection = mysql.createConnection({
            user: "root",
            password: "P@ssw0rd",
            database: "account_db",
            host: "192.168.7.100"
        })
    }
    connect() {
        console.log("connecting database")
        this.dbConnection?.connect()
    }
    disconnect() {
        console.log("disconnecting database")
        this.dbConnection?.destroy()
    }
    async query(command): Promise<QueryResult> {
        if (this.dbConnection == null) {
            throw new Error("No database connect")
        }
        const [result, _] = await this.dbConnection.promise().query(command)
        return result
    }
    async execute(command) {
        if (this.dbConnection == null) {
            throw new Error("No database connect")
        }
        const [result, _] = await this.dbConnection.promise().execute(command)
        return result
    }
}

export default new DatabaseKeyword();