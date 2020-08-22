import {NameList} from "@/ling/types/Common";

export interface SelectBoxValidOption<T = any> {
    text: string;
    value: T;
}

export type SelectBoxOptions = NameList | {} | SelectBoxValidOption[] | [];