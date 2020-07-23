/**
 * URL utilities class
 */
import {NameList} from "@/ling/types/Common";

export default class UrlIO {

    /**
     * Convert name list to args string
     * @param args
     */
    public static params(args: NameList<any>) {
        return Object.keys(args).map(key => key + "="
            + encodeURIComponent(args[key].toString())).join("&");
    }

}