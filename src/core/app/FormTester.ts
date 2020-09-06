/**
 * The form tester
 */
import {OptionValue} from "@/core/app/types";

export default class FormTester {

    static formatPhone(phone: string) {
        return phone
            .replace(/ /g, "")
            .replace(/[()+-]/g, "");
    }

    static testPhone(phone?: string) {
        if (phone === undefined || phone === null) return false;
        return FormTester.formatPhone(phone).length >= 11;
    }

    static testMail(mail?: string) {
        if (mail === undefined || mail === null) return false;

        if (!mail.includes("@")) return false;
        const pars = mail.split("@");
        if (pars.some(v => v.length < 2)) return false;
        if (pars.length < 2 || !pars[1].includes(".")) return false;
        const post = pars[1].split(".");
        if (post.some(v => v.length < 2)) return false;
        return true;
    }

    static testName(name?: string) {
        if (name === undefined || name === null) return false;
        return name.length > 4;
    }

    static testLength(len: number) {
        return (name?: string) => {
            if (name === undefined || name === null) return false;
            return name.length >= len;
        }
    }

    static testDate(date?: string) {
        if (date === undefined || date === null) return false;
        return date.includes("-");
    }

    static testPassport(text?: string) {
        if (text === undefined || text === null) return false;
        text = text.replace(/ /g, '');
        return text.length === 10;
    }

    static testNotNull(data?: any) {
        return data !== null && data !== undefined;
    }

    static testRegion(data?: any) {
        if (data !== undefined && data instanceof Array) {
            return data.length === 2 && (data as Array<any>).every(value => value !== undefined);
        }
        return false;
    }

}
