import API, {APIResult, NumericString} from "@/core/app/api/API";
import {Dict} from "@/core/app/types";
import Server from "@/core/app/api/Server";

export interface APIFileResult {
    file_id: NumericString;
    file_type: string;
    file_ext: string;
    file_name: string;
    file_status: NumericString;
    user_id: NumericString;
    created: string;
    [key: string]: any;
}

export default class APIFiles {

    /**
     * The files.list method
     *
     * @param userId
     * @param removed
     */
    public async list(userId?: number | NumericString, removed?: boolean): Promise<{ list: APIFileResult[] }> {
        const args: Dict<any> = {};
        if (userId !== undefined) args["userId"] = userId;
        if (removed !== undefined) args["removed"] = removed;
        return await API.request("files.list", args);
    }

    /**
     * The files.setStatus method
     *
     * @param fileId
     * @param statusCode
     */
    public async setStatus(fileId: NumericString | number, statusCode: NumericString | number): Promise<APIResult> {
        return await API.request("files.setStatus", {fileId, statusCode});
    }

    /**
     * The files.setStatus method
     *
     * @param fileId
     * @param storage
     */
    public async setStorage(fileId: NumericString | number, storage: string): Promise<APIResult> {
        return await API.request("files.setStorage", {fileId, storage});
    }

    /**
     * The files.remove method
     *
     * @param fileId
     */
    public async remove(fileId: number): Promise<APIResult> {
        return await API.request("files.remove", {fileId});
    }

    /**
     * The files.upload method
     *
     * @param files
     * @param storage
     * @param encrypt
     */
    public async upload(files: Blob | Blob[], storage: string, encrypt = false): Promise<APIResult> {
        return await Server.request("files2.upload", {type: storage, encrypt}, {files: files});
    }

    /**
     * The files.upload method
     *
     * @param files
     * @param storage
     * @param userId
     * @param status
     */
    public async uploadX(files: Blob | Blob[], storage: string, userId: string, status = "1000"): Promise<APIResult> {
        return await Server.request("files2.uploadX", {type: storage, userId, status}, {files: files});
    }

}
