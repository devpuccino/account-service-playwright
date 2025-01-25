import { expect, test } from "@playwright/test"
import ResponseKeyword from "../fixtures/ResponseKeyword"
import CategoryKeyword from "../fixtures/CategoryKeyword"
import {category} from "../data/category.json"
import DatabaseKeyword from "../fixtures/DatabaseKeyword"
test.describe("Category Management", () => {
    test.describe.configure({mode:"serial"})
    test("should response success when get all category",{
        tag:["@regression"],
        annotation:[
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
        const expects = await CategoryKeyword.getAllActiveCategory() as Array<any>
        const response = await request.get(`${process.env.CONTEXT_PATH}/api/category`)
        
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const actual = await response.json()
        ResponseKeyword.shouldResponseSuccess(actual)
        expect(actual.data).not.toBeNull()
        expect(actual.data.length).toEqual(expects.length)
        expects.forEach((element,index) => {
            expect(actual.data[index].id).toEqual(String(element.id))
            expect(actual.data[index].category_name).toEqual(element.category_name)
            expect(actual.data[index].active).toEqual(true)
        });
    })

    test("should response success when get category by id",{
        tag: "@regression"
    }, async ({ request }) => {
        await CategoryKeyword.deleteCategoryByName(category.success.category_name)
        await CategoryKeyword.insertCategoryToDatabase(category.success.category_name,true)
        const expected = await CategoryKeyword.getCategoryByCategoryNameFromDatabase(category.success.category_name,true)
        const categoryId = expected[0].id
        const response = await request.get(`${process.env.CONTEXT_PATH}/api/category/${categoryId}`)
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const actual = await response.json()
        ResponseKeyword.shouldResponseSuccess(actual)
        expect(actual.data).not.toBeNull()
        expect(actual.data.id).toEqual(String(expected[0].id))
        expect(actual.data.category_name).toEqual(expected[0].category_name)
        expect(actual.data.active).toEqual(expected[0].is_active == 1 ? true : false)
    })
    test("Should response success when insert category",{
        tag:"@regression"
    }, async ({ request }) => {
        await CategoryKeyword.deleteCategoryByName(category.success.category_name)
        const response = await request.post(`${process.env.CONTEXT_PATH}/api/category`, {
            headers: {
                "content-Type": "application/json"
            },
            data: {
                "category_name": category.success.category_name,
                "is_active": "true"
            }
        })
        ResponseKeyword.shouldHttpStatusSuccess(response)
        const responseBody = await response.json()
        ResponseKeyword.shouldResponseSuccess(responseBody)
    })
    test("Should response duplicate data when insert category",{
        tag: "@regression"
    },async ({request})=>{
        await CategoryKeyword.insertCategoryToDatabase(category.duplicate.category_name,true)
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