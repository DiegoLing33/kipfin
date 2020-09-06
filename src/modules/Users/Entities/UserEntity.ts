import {APIEntity} from "@/core/Entities/APIEntity";

export type UserGenderEntity = 0 | 1 | 2;

export interface UserGroupEntity extends APIEntity{
    title: string;
    access: string;
}

// User entity
// password - is hidden by privacy
export interface UserEntity extends APIEntity{
    // Primary data
    mail: string;

    // Human
    name: string;
    lastname: string;
    surname: string;
    gender: UserGenderEntity;
    birthday: Date;

    // Portal
    group: UserGroupEntity;
}