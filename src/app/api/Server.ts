import {Dict} from "@/app/types";
import ServerUsers from "@/app/api/classes/ServerUsers";
import {NameList} from "@/ling/types/Common";
import ServerChats from "@/app/api/classes/ServerChats";

/**
 * Server response
 */
export interface ServerResponse {
    [name: string]: any;

    ok?: boolean;
}

/**
 * Server pages request
 */
export interface ServerPaged<T> {
    items: T[];
    count: number;
}

/**
 * API server class
 */
export default class Server {

    /**
     * The access token
     */
    public static TOKEN = "";

    /**
     * The URL
     */
    private static URL = "http://kipfin.ru/api/index.php?";

    /**
     * Server users class
     */
    public static users = new ServerUsers();

    /**
     * Server chats class
     */
    public static chats = new ServerChats();

    /**
     * Inits the api
     * @param token
     */
    public static init(token: string) {
        Server.TOKEN = token;
    }

    /**
     * Builds the REQUEST URL
     * @param req
     * @private
     */
    private static __url(req: string): string {
        const [c, m] = req.split(".");
        return Server.URL + `class=${c}&method=${m}`;
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
            const __files = Server.__files(files);
            Object.keys(__files).forEach(key => __files[key]
                .forEach(file => formData.append(`${key}[]`, file)));
        }
        formData.append("token", Server.TOKEN);
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
    public static async request<T = ServerResponse>(method: string, args: Dict<any> = {}, files?: Dict<Blob[] | Blob>): Promise<T> {
        try {
            const url = Server.__url(method);
            const body = Server.__formData(args, files);
            const fetchResults = await fetch(url, {
                method: "POST",
                body
            });
            const json = await fetchResults.json();
            if (json.ok) {
                return Promise.resolve(json);
            } else {
                return Promise.reject(json.message);
            }
        } catch (e) {
            return Promise.reject("Неизвестная ошибка: " + e);
        }
    }

    public static async loadAllPages<T>(method: (...args: any[]) => Promise<ServerPaged<T>>, args: NameList<unknown> = {}) {
        const pagedArgs = {page: 0, ...args};
        const first = await method.call(this, pagedArgs);
        const count = first.count;
        const items = Array<T>();
        while (items.length < count) {
            pagedArgs.page++;
            const result = await method.call(this, pagedArgs);
            items.push(...result.items);
        }
        return {items, count};
    }
}
