import {NameList} from "@/core/Common/Common";

export interface SelectBoxValidOption<T = any> {
    text: string;
    value: T;
}

export type SelectBoxOptions = NameList | {} | SelectBoxValidOption[] | [];