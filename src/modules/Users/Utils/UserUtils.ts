import {APIUserResults, APIUserShort} from "@/core/app/api/APIUsers";

/**
 * The user utils
 */
export default class UserUtils {

    /**
     * Returns the full user name
     * @param user
     */
    public static getFullName(user: APIUserResults | APIUserShort){
        const arr = [user.lastname, user.name];
        if(user.surname !== '-') arr.push(user.surname);
        return arr.join(" ");
    }

}