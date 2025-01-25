import { QueryResult } from "mysql2";
import DatabaseKeyword from "./DatabaseKeyword";

class CategoryKeyword {
    private tableName:string = "category"
    async deleteCategoryByName(categoryName: string) {
        await DatabaseKeyword.delete(this.tableName,["category_name"],[categoryName])
    }
    async insertCategoryToDatabase(categoryName:string,isActive:boolean){
        await DatabaseKeyword.insert(this.tableName, ["category_name", "is_active"], [categoryName, isActive ? "1" : "0"])
    }
    async getCategoryByCategoryNameFromDatabase(categoryName:string,isActive:boolean):Promise<QueryResult>{
        return await DatabaseKeyword.query(
            this.tableName,
            ["category_name","is_active"],
            [categoryName, isActive ? "1" : "0"]
        )
    }
     getAllActiveCategory = async():Promise<QueryResult>=>{
        return await DatabaseKeyword.query(this.tableName,["is_active"],["1"])
    }
    
}
export default new CategoryKeyword()