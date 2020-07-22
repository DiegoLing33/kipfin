import {AccountAuthorization} from "@/app/plugins/account/AccountAuthorization";
import {AccountProfile} from "@/app/plugins/account/AccountProfile";

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