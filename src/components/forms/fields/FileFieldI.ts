import {Field} from "@/components/forms/fields/Field";

export interface FileFieldProps extends Field{
    accept?: string;
    multiply?: boolean;
}
