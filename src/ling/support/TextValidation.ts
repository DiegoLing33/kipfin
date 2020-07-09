/**
 * The text validation supporting tool
 */
export default class TextValidation {

    /**
     * The length validation
     * @param len
     */
    public static validationLength(len: number) {
        return (value: string) => {
            if(value === null) return false;
            return value.trim().length >= len;
        };
    }

    /**
     * The length validation
     * @param value
     */
    public static validateNull(value: unknown) {
        if(value === null) return false;
        return value !== null;
    }

    /**
     * Validates the email
     * @param email
     */
    public static validateEmail(email: string) {
        if(email === null) return false;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Validates the phone number
     * @param phone
     */
    public static validatePhone(phone: string) {
        if(phone === null) return false;
        return /\+([0-9() -]+)/.test(phone.toLowerCase());
    }

}

/**
 * The text formatter tool
 */
export class TextFormatter {

    /**
     * Formats the phone
     * @param phone
     */
    public static formatPhone(phone: string) {
        return phone.replace(/[^0-9+()\- ]/g, "");
    }

}