import { expect, test } from "@playwright/test"
import ResponseKeyword from "../fixtures/ResponseKeyword"
import CategoryKeyword from "../fixtures/CategoryKeyword"
import { category } from "../data/category.json"
import DatabaseKeyword from "../fixtures/DatabaseKeyword"
test.describe("Wallet Management", () => {

    test("should response success when get all wallet", {
        tag: ["@regression"],
        annotation: [
            {
                type: "feature",
                description: "category management"
            },
            {
                type: "issue",
                description: "P210001-111"
            }
        ]
    }, async ({ request }) => {
        const result = await CategoryKeyword.getAllWallet()
    })

})