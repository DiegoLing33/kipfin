import {Field} from "@/components/forms/fields/Field";

export interface DateFieldProps extends Field{
    prepend?: string;
    max?: Date;
}
