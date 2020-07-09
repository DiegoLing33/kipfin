import {Field} from "@/components/fields/Field";

export interface DateFieldProps extends Field{
    prepend?: string;
    max?: Date;
}
