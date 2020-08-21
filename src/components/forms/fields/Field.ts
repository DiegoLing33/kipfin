/**
 * The field types
 */
import {Dict} from "@/app/types";
import {SelectFieldProps} from "@/components/forms/fields/SelectFieldI";
import {DateFieldProps} from "@/components/forms/fields/DateFieldI";

export const FieldType = {
    TEXT: "text",
    DATE: "date",
    RADIO: "radio",
    SELECT: "select",
    CHECK: "check",
    FILE: "file",
    SEPARATOR: "separator",
}

/**
 * The field interface
 */
export interface Field {
    name: string;
    placeholder: string;
    design?: string;

    title?: string;
    description?: string;
    type?: string;

    tester?: (a: any) => boolean | string | null;
    formatter?: (a: any) => typeof a;

    own?: boolean;
    pre?: any;
    save?: (value: any, name: string) => Promise<any>;

    [name: string]: any;
}


export const FieldTester = {

    /**
     * The length tester
     * @param min
     * @param max
     */
    length(min: number, max?: number) {
        return function(value: string) {
            if (value === undefined || value === null || value === '') return "Вы еще ничего не ввели";
            if (value.length < min) return "Вы ввели меньше символов, чем необходимо";
            if (max !== undefined && value.length > max) return "Вы ввели больше символов, чем необходимо"
            return true;
        }
    },

    /**
     * The not null tester
     * @param value
     */
    notNull(value: any) {
        if (value !== undefined && value !== null) return true;
        return "Поле не может быть пустым"
    },

    /**
     * Tests the email
     * @param value
     */
    emailTester(value: any) {
        if(value === undefined || value === null) return 'Вы еще ничего не ввели';
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(value))) return true;
        return 'Email введен не корректно';
    }

};

/**
 * Formatters
 */
export const FieldFormatter = {

    /**
     * Trims the value
     * @param value
     */
    trim(value: string) {
        return value.trim();
    },

    /**
     * Trims the value
     * @param value
     */
    empty(value: string) {
        return value;
    },

    /**
     * Numbers only formatter
     * @param value
     */
    numbersOnly(value: string) {
        return FieldFormatter.trim(value)
            .replace(/[А-яA-z]+/g, "");
    },


    /**
     * Numbers only formatter
     * @param value
     */
    passport(value: string) {
        let result = '';
        const src  = FieldFormatter.numbersOnly(value).replace(/ /g, "");
        if (src.length > 3) {
            result = src.substr(0, 2) + " " + src.substr(2, 2) + " " + src.substr(4);
        } else result = src;
        return result;
    },


    /**
     * Numbers only formatter
     * @param value
     */
    passportCode(value: string) {
        let result = '';
        const src  = FieldFormatter.numbersOnly(value).replace(/ /g, "");
        if (src.length > 4) {
            result = src.substr(0, 3) + "-" + src.substr(4);
        } else result = src;
        return result;
    },

    /**
     * Formats the phone
     * @param phone
     */
    formatPhone(phone: string) {
        return FieldFormatter.trim(phone)
            .replace(/[()-]/g, "");
    }
};

export class Fields {
    /**
     * Creates gender field
     * @param name
     * @param ops
     */
    public static gender(name: string, ops: Dict<any> = {}): SelectFieldProps{
        return {
            name,
            description: 'Выберите пол',
            placeholder: 'Выберите пол',
            type: FieldType.RADIO,
            options: [
                {text: "Мужской", value: "1"},
                {text: "Женский", value: "2"},
            ],
            tester: FieldTester.notNull,
            ...ops,
        };
    }
    /**
     * Creates gender field
     * @param name
     * @param ops
     */
    public static birthday(name: string, ops: Dict<any> = {}): DateFieldProps{
        return {
            name,
            placeholder: 'Выберите дату',
            type: FieldType.DATE,
            tester: FieldTester.notNull,
            ...ops,
        };
    }
}
