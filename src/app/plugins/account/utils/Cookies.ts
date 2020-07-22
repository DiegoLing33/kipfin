import {Nullable} from "@/ling/types/Common";

/**
 * Deletes the cookies
 * @param name
 */
export function deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

/**
 * Sets the cookie
 *
 * @param name
 * @param val
 * @param days
 */
export function setCookie(name: string, val: Nullable<string>, days = 90) {
    const date = new Date();
    const value = val;
    if(value !== null) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }else{
        deleteCookie(name);
    }
}

/**
 * Returns the cookie value
 * @param name
 */
export function getCookie(name: string): Nullable<string> {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2)
        return parts.pop()!.split(";").shift() || null;
    return null;
}

