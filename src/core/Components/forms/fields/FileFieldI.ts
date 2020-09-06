import {Field} from "@/core/Components/forms/fields/Field";

export interface FileFieldProps extends Field{
    accept?: string;
    multiply?: boolean;
}
