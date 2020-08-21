import {Field} from "@/components/forms/fields/Field";
import {OptionValue} from "@/app/types";

export interface SelectFieldProps extends Field{
    prepend?: string;
    options: OptionValue[];
}
