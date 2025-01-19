import { expect, test } from "@playwright/test"
import ResponseKeyword from "../fixtures/ResponseKeyword"
import CategoryKeyword from "../fixtures/CategoryKeyword"
import { category } from "../data/category.json"
import DatabaseKeyword from "../fixtures/DatabaseKeyword"
test.describe("Category Management", () => {
    test.describe.configure({ mode: "serial" })
    test("should response success when get all category", {
        tag: ["@e2e"],
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
        const response = await request.get(`${process.env.CONTEXT_PATH}/api/category`)
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const responseBody = await response.json()
        ResponseKeyword.shouldResponseSuccess(responseBody)
        expect(responseBody.data).not.toBeNull()
    })

    test("should response success when get category by id", {
        tag: "@timeout"
    }, async ({ request }) => {
        const response = await request.get(`${process.env.CONTEXT_PATH}/api/category/1`)
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const responseBody = await response.json()
        ResponseKeyword.shouldResponseSuccess(responseBody)
        expect(responseBody.data).not.toBeNull()
    })
    test("Should response success when insert category", {
        tag: "@regression"
    }, async ({ request }) => {
        const result = await DatabaseKeyword.execute(`DELETE FROM category WHERE category_name='Coffee'`)
        const response = await request.post(`${process.env.CONTEXT_PATH}/api/category`, {
            headers: {
                "content-Type": "application/json"
            },
            data: {
                "category_name": `Coffee`,
                "is_active": "true"
            }
        })
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const responseBody = await response.json()
        ResponseKeyword.shouldResponseSuccess(responseBody)
    })
    test("Should response duplicate data when insert category", {
        tag: "@regression"
    }, async ({ request }) => {
        await DatabaseKeyword.execute(`INSERT INTO category(category_name,is_active) values('${category.duplicate.category_name}',true)`)
        const response = await request.post(`${process.env.CONTEXT_PATH}/api/category`, {
            headers: {
                "content-Type": "application/json"
            },
            data: {
                "category_name": `${category.duplicate.category_name}`,
                "is_active": "true"
            }
        })
        ResponseKeyword.shouldHttpStatusBadRequest(response)
        const responseBody = await response.json()
        ResponseKeyword.shouldResponseDuplicateData(responseBody)
    })
})