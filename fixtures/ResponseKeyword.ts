import { APIResponse, expect } from "@playwright/test";
import {response_status as ResponseStatus} from "../data/response_status.json"
class ResponesKeyword {
    shouldHttpStatusSuccess(response:APIResponse) {
        expect(response).toBeOK()
    }
    shouldHttpStatusBadRequest(response:APIResponse){
        expect(response.status()).toEqual(400)
    }
    shouldResponseSuccess(responseBody:any) {
        expect(responseBody.code).toEqual(ResponseStatus.success.code)
        expect(responseBody.message).toEqual(ResponseStatus.success.message)
    }
    shouldResponseDuplicateData(responseBody:any) {
        expect(responseBody.code).toEqual(ResponseStatus.duplicate_data.code)
        expect(responseBody.message).toEqual(ResponseStatus.duplicate_data.message)
    }

}
export default new ResponesKeyword()