/**
 * The LANG dictionaries
 */
import {Dict} from "@/app/types";

/**
 * Lang
 */
export const lang = {

    "states": {
        "inProgress": "В обработке",
        "done": "Принято",
        "deny": "Не принято"
    },

    "profile": {
        "profile": "Личный кабинет",
        "documents": "Документы",
        "education": "Образование",

        "heading": {}
    },
    "form": {
        "tips": {}
    }

};

/**
 * Formats the string
 *
 * @example
 * String: Hi, #name, its #me
 *
 * @param str
 * @param o
 */
export function fmt(str: string, o: Dict<any>): string {
    return str.replace(/#([A-Za-z_]+)/g, o["$1"]);
}