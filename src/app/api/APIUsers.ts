import API, {APIResult, NumericString} from "@/app/api/API";

export interface APIUserFlags {
    canEdit: '1'|'0';
    canChangeFaculty: '1'|'0';
    canChangeSchool: '1'|'0';
}

export interface APIUserResults extends APIResult {
    user_id: NumericString;
    mail: string;
    name: string;
    phone: string;
    facultyId: string;
    motherCapital: NumericString;
    studentStatus: NumericString;
    studyBase: NumericString;
    notified: NumericString;
    created: string;
    school: {
        schoolStatus: NumericString;
        schoolName: string | null;
        schoolAddress: string | null;
        schoolValue: NumericString | null;
        schoolDegreeCode: NumericString | null;
    };
    group: {
        group_id: NumericString;
        title: string;
        access: string;
    };
    flags: APIUserFlags;
}

export interface APIUserShort {
    userId: NumericString;
    name: string;
    lastname: string;
    surname: string;
    groupId: NumericString;
    groupTitle: string;
}

/**
 * API Users
 */
export default class APIUsers {

    /**
     * The users.me method (by token)
     */
    public async me(): Promise<APIUserResults> {
        return await API.request("users.me");
    }

    /**
     * The users.get method
     */
    public async get(userId: NumericString|number): Promise<APIUserResults> {
        return await API.request("users.get", {"user_id": userId});
    }

    /**
     * The users.list method
     */
    public async list(): Promise<{list: APIUserResults[]}>{
        return await API.request("users.list");
    }

    /**
     * The users.login method
     *
     * @param login
     * @param password
     */
    public async login(login: string, password: string): Promise<APIResult> {
        return await API.request("users.login", {login, password});
    }

    /**
     * The users.logout method
     */
    public async logout(): Promise<APIResult> {
        return await API.request("users.logout");
    }

    /**
     * The users.setField method
     */
    public async setField(userId: NumericString|number, fieldName: string, fieldValue: string): Promise<APIResult> {
        return await API.request("users.setField", {userId, fieldName, fieldValue});
    }

}
