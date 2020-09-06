import {BvComponent} from "bootstrap-vue";

export interface FormElement {
    name: string;
    description: string;
    placeholder: string;
    tester: (v: any) => boolean;
    type: string;
    error?: string;
    inputType?: string;
    multiply?: boolean;
    own?: boolean;
    send?: (name: string, value: any) => Promise<boolean>;
    pre?: string;
    ref?: (a: BvComponent) => void;
    max?: any;
    options?: Array<{text: string; value: any}>;
    accept?: string;
}

export const FormElementTye = {
    TEXT: "text",
    TEXTAREA: "textarea",
    SELECTION: "selection",
    GENDER: "gender",
    DATE: "date",
    FILE: "file",
    REGION: "region",
};
