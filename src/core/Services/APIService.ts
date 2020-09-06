import {Dict} from "@/core/app/types";

export interface IAPIService<EntityType> {
    // Utilities
    getEmpty(): Promise<EntityType>;

    // Getters
    getById(id: number): Promise<EntityType>;

    getList(args: Dict<never>): Promise<EntityType[]>;

    // Create
    create(entity: Partial<EntityType>): Promise<boolean>;

    // Update
    update(id: number): Promise<boolean>;
}