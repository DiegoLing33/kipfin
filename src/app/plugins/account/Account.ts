/**
 * The main account class
 */
import {AccountAuthorization} from "@/app/plugins/account/AccountAuthorization";

export default class Account {

    /**
     * Authorization methods
     */
    public static authorization = AccountAuthorization;

}