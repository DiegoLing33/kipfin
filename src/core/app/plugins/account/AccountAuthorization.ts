/**
 * Account authorization utils
 */
import {Nullable} from "@/core/Common/Common";
import {deleteCookie, getCookie, setCookie} from "@/core/app/plugins/account/utils/Cookies";

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