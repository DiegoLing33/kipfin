import {APIEntity} from "@/core/Entities/APIEntity";

export interface StudentGroupEntity extends APIEntity {
    title: string;
    teacherName: string;
}

export interface StudentEntity {
    studentIdentifier: number;
    studentGroup: StudentGroupEntity;
}

// As Student modifier
export type WithStudent<T> = T & { student: StudentEntity };