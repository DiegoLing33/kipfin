import APIUsers from "@/app/api/APIUsers";
import APIFiles from "@/app/api/APIFiles";
import {Dict} from "@/app/types";
import APIChat from "@/app/api/APIChat";
import APIMission from "@/app/api/APIMission";

export interface APITransactionFunc {
    (context: any, func: () => void): unknown;
}

export interface APIPluginInterface {
    transaction(context: any, func: () => void): void;
    error(context: any, text: string): void;
}

/**
 * The API plugin
 * @param vue
 * @constructor
 */
export function APIPlugin(vue: any): void {
    vue.prototype.$api         = {
        async transaction(context: any, func: () => void) {
            try {
                await func.bind(context)();
            } catch (e) {
                this.error(context, e);
            }
        },
        error(context: any, text: string){
            context.$store.state.apiErrorText = text;
            context.$bvModal.show("m_apiError");
        }
    };
    vue.prototype.$transaction = async(context: any, func: () => void) => {
        return await vue.prototype.$api.transaction(context, func);
    };
}


/**
 * Default API response result
 */
export interface APIResult {
    [name: string]: any;

    ok: boolean;
}

export type NumericString = string;

/**
 * Default API list response
 */
export interface APIListResult<T = any> extends APIResult {
    list: Array<T>;
}

/**
 * Default API error result
 */
export interface APIErrorResult extends APIResult {
    message: string;
    code: number;
    ok: false;
}

/**
 * KIPFIN API CLASS
 */
export default class API {

    /**
     * The access token
     */
    public static TOKEN = "";

    /**
     * The URL
     */
    private static URL = "http://kipfin.ru/new/index.php?";

    /**
     * The mission api
     */
    public static mission = new APIMission();

    /**
     * The users API methods
     */
    public static users = new APIUsers();

    /**
     * The files API methods
     */
    public static files = new APIFiles();

    /**
     * The chat API methods
     */
    public static chat = new APIChat();

    /**
     * Inits the api
     * @param token
     */
    public static init(token: string) {
        API.TOKEN = token;
    }

    /**
     * Builds the REQUEST URL
     * @param req
     * @private
     */
    private static __url(req: string): string {
        const [c, m] = req.split(".");
        return API.URL + `class=${c}&method=${m}`;
    }

    /**
     * Builds the pretty files request
     * @param files
     * @private
     */
    private static __files(files: Dict<Blob[] | Blob> = {}): Dict<Blob[]> {
        const result: Dict<Blob[]> = {};
        Object.keys(files).forEach(key => {
            let blobs = files[key];
            if (!(blobs instanceof Array)) blobs = [blobs];
            result[key] = blobs;
        });
        return result;
    }

    /**
     * Builds the form data
     *
     * @param args
     * @param files
     * @private
     */
    private static __formData(args: Dict<any> = {}, files?: Dict<Blob | Blob[]>): FormData {
        const formData = new FormData();
        if (files) {
            const __files = API.__files(files);
            Object.keys(__files).forEach(key => __files[key]
                .forEach(file => formData.append(`${key}[]`, file)));
        }
        formData.append("token", API.TOKEN);
        Object.keys(args).forEach(key => formData.append(key, args[key]));
        return formData;
    }

    /**
     * Makes api request
     *
     * @param method    - the api class.method
     * @param args      - the args
     * @param [files]   - the files
     */
    public static async request<T = APIResult>(method: string, args: Dict<any> = {}, files?: Dict<Blob[] | Blob>): Promise<T> {
        try {
            const url          = API.__url(method);
            const body         = API.__formData(args, files);
            const fetchResults = await fetch(url, {
                method: "POST",
                body
            });
            const json         = await fetchResults.json();
            if (json.ok) {
                return Promise.resolve(json);
            } else {
                return Promise.reject(json.message || "Неизвестная ошибка #1");
            }
        } catch (e) {
            return Promise.reject("Неизвестная ошибка: " + e);
        }
    }
}
