import {UserGroupEntity} from "@/modules/Users/Entities/UserEntity";
import {IAPIService} from "@/core/Services/APIService";
import {Dict} from "@/core/app/types";

export interface IUserGroupsService extends IAPIService<UserGroupEntity>{
}

export const UserGroupsService = new class implements IUserGroupsService{
    create(entity: Partial<UserGroupEntity>): Promise<boolean> {
        return Promise.resolve(false);
    }

    getById(id: number): Promise<UserGroupEntity> {
        return Promise.reject();
    }

    getList(args: Dict<never>): Promise<UserGroupEntity[]> {
        return Promise.resolve([]);
    }

    update(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }
    async getEmpty(): Promise<UserGroupEntity> {
        return Promise.resolve({
            id: 0,
            changed: new Date(),
            created: new Date(),
            access: "",
            title: "Undefined",
            state: 0,
        });
    }
}