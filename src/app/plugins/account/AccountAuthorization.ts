/**
 * Account authorization utils
 */
import {Nullable} from "@/ling/types/Common";
import {deleteCookie, getCookie, setCookie} from "@/app/plugins/account/utils/Cookies";

export const AuthorizationCookieTokenName = "token"

export const AccountAuthorization = {
    /**
     * Returns the token value
     */
    getToken: () => getCookie(AuthorizationCookieTokenName),
    /**
     * Sets the token
     * @param token - the token value
     */
    setToken: (token: Nullable<string>) => setCookie(AuthorizationCookieTokenName, token, 30),
    /**
     * Removes the token
     */
    removeToken: () => deleteCookie(AuthorizationCookieTokenName),
};