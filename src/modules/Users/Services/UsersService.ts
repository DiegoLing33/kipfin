import {UserEntity} from "@/modules/Users/Entities/UserEntity";
import {UserGroupsService} from "@/modules/Users/Services/UserGroupsService";
import {IAPIService} from "@/core/Services/APIService";
import {Dict} from "@/core/app/types";

export interface IUsersService extends IAPIService<UserEntity>{


}

export const UsersService = new class implements IUsersService{
    create(entity: Partial<UserEntity>): Promise<boolean> {
        return Promise.resolve(false);
    }

    getById(id: number): Promise<UserEntity> {
        return Promise.reject();
    }

    getList(args: Dict<never>): Promise<UserEntity[]> {
        return Promise.resolve([]);
    }

    update(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }
    async getEmpty(): Promise<UserEntity> {
        return Promise.resolve({
            id: 0,
            name: "Unnamed",
            lastname: "",
            surname: "",
            mail: "undefined@mail.ru",
            birthday: new Date(),
            changed: new Date(),
            created: new Date(),
            gender: 0,
            state: 0,
            group: await UserGroupsService.getEmpty(),
        });
    }

}