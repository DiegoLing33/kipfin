import {Field} from "@/core/Components/forms/fields/Field";

export interface DateFieldProps extends Field{
    prepend?: string;
    max?: Date;
}
