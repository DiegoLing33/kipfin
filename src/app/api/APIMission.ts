import API, {NumericString} from "@/app/api/API";
import {Dict} from "@/app/types";

export default class APIMission {

    public async setField(field: string, value: any, userId?: NumericString, admin = false) {
        const args: Dict<unknown> = {field, value};
        if (userId) args["userId"] = userId;
        return await API.request(admin ? "mission.setFieldAdmin" : "mission.setField", args);
    }

    public async setFieldAdmin(field: string, value: any, userId?: NumericString) {
        const args: Dict<unknown> = {field, value};
        if (userId) args["userId"] = userId;
        return await API.request("mission.setFieldAdmin", args);
    }

}