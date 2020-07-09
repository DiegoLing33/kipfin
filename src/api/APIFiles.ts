import API, {APIResult, NumericString} from "@/api/API";
import {Dict} from "@/app/types";

export interface APIFileResult {
    file_id: NumericString;
    file_type: string;
    file_ext: string;
    file_name: string;
    file_status: NumericString;
    user_id: NumericString;
    created: string;
}

export default class APIFiles {

    /**
     * The files.list method
     *
     * @param userId
     * @param removed
     */
    public async list(userId?: number|NumericString, removed?: boolean): Promise<{list: APIFileResult[]}>{
        const args: Dict<any> = {};
        if(userId !== undefined) args["userId"] = userId;
        if(removed !== undefined) args["removed"] = removed;
        return await API.request("files.list", args);
    }

    /**
     * The files.setStatus method
     *
     * @param fileId
     * @param statusCode
     */
    public async setStatus(fileId: number, statusCode: number): Promise<APIResult>{
        return await API.request("files.setStatus", {fileId, statusCode});
    }

    /**
     * The files.remove method
     *
     * @param fileId
     */
    public async remove(fileId: number): Promise<APIResult>{
        return await API.request("files.remove", {fileId});
    }

    /**
     * The files.upload method
     *
     * @param files
     * @param storage
     * @param encrypt
     */
    public async upload(files: Blob|Blob[], storage: string, encrypt = false): Promise<APIResult>{
        return await API.request("files.upload", {type: storage, encrypt}, {files: files});
    }

    /**
     * The files.upload method
     *
     * @param files
     * @param storage
     * @param userId
     */
    public async uploadX(files: Blob|Blob[], storage: string, userId: string): Promise<APIResult>{
        return await API.request("files.uploadX", {type: storage, userId}, {files: files});
    }

}
