import {APIEntity} from "@/core/Entities/APIEntity";

export interface SchoolEntity extends APIEntity {
    name: string;
    address: string;
    code: string;
    ended: Date;
    value: number;
}

export type WithSchool<T> = T & { school: SchoolEntity };