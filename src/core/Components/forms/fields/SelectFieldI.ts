import {Field} from "@/core/Components/forms/fields/Field";
import {OptionValue} from "@/core/app/types";

export interface SelectFieldProps extends Field{
    prepend?: string;
    options: OptionValue[];
}
