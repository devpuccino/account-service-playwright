import { APIRequestContext } from "@playwright/test";
import DatabaseKeyword from "./DatabaseKeyword";

class CategoryKeyword {
    async deleteCategoryByName(categoryName: string, request: APIRequestContext) {
        const response = await request.get(`${process.env.CONTEXT_PATH}/api/category`)
        const responseBody = await response.json()
        const category = responseBody.data.find((category) => category.category_name == categoryName)
        if (category) {
            await request.delete(`${process.env.CONTEXT_PATH}/api/category/${category.id}`)
        }
    }
    async getAllWallet() {
        const result = await DatabaseKeyword.query("SELECT * FROM wallet")
        return result
    }
}
export default new CategoryKeyword()