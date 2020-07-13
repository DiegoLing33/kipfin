/**
 * Api class usersX
 */
import {NameList, Numeric} from "@/ling/types/Common";
import Server, {ServerPaged, ServerResponse} from "@/api/Server";

/**
 * Server user group response
 */
export interface ServerUserGroup {
    groupId: number;
    groupTitle: string;
}

/**
 * Server user group extended response
 */
export interface ServerUserGroupExtended extends ServerUserGroup {
    groupAccess: string;
    groupState: number;
}

/**
 * Server user response
 */
export interface ServerUser extends ServerResponse {
    userId: number;
    name: string;
    lastname: string;
    surname: string;
    avatar: string;
    birthday: string;
    gender: number;
    group: {
        groupId: number;
        groupTitle: string;
    };
}

/**
 * Server user root response
 */
export interface ServerUsersRoot extends ServerUser {
    group: {
        groupId: number;
        groupTitle: string;
        groupAccess: string;
    };
    school: {
        schoolValue: string;
        schoolName: string;
        schoolAddress: string;
        schoolDate: string;
        schoolDegreeCode: string;
    };
    specialization: {
        specializationId: number;
        baseId: number;
    };
    states: {
        isWorked: number;
        isMotherCapital: number;
    };
    flags: {
        canEdit: number;
        canEditSpecialization: number;
        canEditSchool: number;
    };
}

/**
 * Server user
 */
export default class ServerUsers {

    /**
     * API method users.login
     *
     * @param mail
     * @param password
     */
    public async login(mail: string, password: string) {
        return await Server.request("usersX.login", {mail, password});
    }

    /**
     * API method logout
     */
    public async logout() {
        return await Server.request("usersX.logout");
    }

    /**
     * API method users.me
     */
    public async me(): Promise<ServerUsersRoot> {
        return await Server.request<ServerUsersRoot>("usersX.me");
    }

    /**
     * API method users.me
     */
    public async getById(userId: number): Promise<ServerUser | ServerUsersRoot> {
        return await Server.request<ServerUser | ServerUsersRoot>("usersX.getById", {
            userId
        });
    }

    /**
     * API method users.setField
     */
    public async setField(field: string, value: unknown): Promise<ServerResponse> {
        return await Server.request<ServerResponse>("usersX.setField", {
            field, value
        });
    }

    /**
     * API method users.setFieldUser
     */
    public async setFieldUser(field: string, value: unknown, userId: number): Promise<ServerResponse> {
        return await Server.request<ServerResponse>("usersX.setFieldUser", {
            field, value, userId
        });
    }

    /**
     * API method users.getList
     */
    public async getList(page: number, args: NameList<unknown> = {}): Promise<ServerPaged<ServerUser>> {
        const paged = {page, ...args};
        return await Server.request<ServerPaged<ServerUser>>("usersX.getList", paged);
    }

    /**
     * API method users.setGroup
     *
     * @param groupId
     * @param userId
     */
    public async setGroup(groupId: Numeric, userId: Numeric) {
        return await Server.request("usersX.setGroup",
            {groupId, userId});
    }

    /**
     * API method users.getGroups
     */
    public async getGroups(page: number): Promise<ServerPaged<ServerUserGroupExtended>> {
        return await Server.request("usersX.getGroups", {page});
    }

}