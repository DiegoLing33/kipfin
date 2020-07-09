import {Field} from "@/components/fields/Field";
import {OptionValue} from "@/app/types";

export interface SelectFieldProps extends Field{
    prepend?: string;
    options: OptionValue[];
}
