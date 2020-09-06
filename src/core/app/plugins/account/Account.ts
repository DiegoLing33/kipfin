import {AccountAuthorization} from "@/core/app/plugins/account/AccountAuthorization";
import {AccountProfile} from "@/core/app/plugins/account/AccountProfile";

/**
 * The main account class
 */
export default class Account {

    /**
     * Authorization methods
     */
    public static authorization = AccountAuthorization;

    /**
     * Account profile
     */
    public static profile = AccountProfile;

}