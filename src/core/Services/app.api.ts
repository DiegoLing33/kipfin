import {Dict} from "@/core/app/types";

export abstract class APIServiceRequest<ArgsType, ResponseType = Promise<any>> {
    public readonly path: string;
    public readonly method: string;
    protected args: Dict<any> = {};

    public abstract getArgs(): ArgsType;

    protected constructor(path: string, method: string) {
        this.path = path;
        this.method = method;
    }

    public add(args: Dict<any>) {
        this.args = Object.assign(args, this.args);
        return this;
    }

    public abstract send(): ResponseType;
}

export class APIServiceGetRequest extends APIServiceRequest<URLSearchParams> {
    constructor(path: string) {
        super(path, "get");
    }

    public getArgs(): URLSearchParams {
        const search = new URLSearchParams();
        Object.keys(this.args).forEach(k => search.append(k, this.args[k]));
        return search;
    }

    public async send(): Promise<any> {
        const url = APIService.URL + this.path + "?" + this.getArgs().toString();
        const fetchResults = await fetch(url);
        return fetchResults.json();
    }

}

export class APIServicePostRequest extends APIServiceRequest<FormData> {
    constructor(path: string) {
        super(path, "get");
    }

    public getArgs(): FormData {
        const search = new FormData();
        Object.keys(this.args).forEach(k => search.append(k, this.args[k]));
        return search;
    }

    public async send(): Promise<any> {
        const url = APIService.URL + this.path;
        const fetchResults = await fetch(url, {
            method: "post",
            body: this.getArgs()
        });
        return fetchResults.json();
    }

}

export default class APIService {

    /**
     * Global URL
     */
    public static URL = "http://localhost:8001/api/v1";

    public static get(path: string) {
        return new APIServiceGetRequest(path);
    }

    public static post(path: string) {
        return new APIServicePostRequest(path);
    }
}