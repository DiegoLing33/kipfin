import {NameList} from "@/ling/types/Common";

export interface SelectBoxValidOption {
    text: string;
    value: unknown;
}

export type SelectBoxOptions = NameList | {} | SelectBoxValidOption[] | [];