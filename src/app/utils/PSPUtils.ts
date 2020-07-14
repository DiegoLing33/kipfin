import {APIFileResult} from "@/app/api/APIFiles";
import {Dict} from "@/app/types";
import KFDocument from "@/app/client/KFDocument";

export default class PSPUtils {

    public static groupItems(items: APIFileResult[]){
        const groups: Dict<APIFileResult[]> = {};
        for(const item of items){
            if(groups[item.file_type] === undefined) groups[item.file_type] = [];
            groups[item.file_type].push(item);
        }
        return groups;
    }

    public static group(items: KFDocument[]){
        const groups: Dict<KFDocument[]> = {};
        for(const item of items){
            if(groups[item.storageName] === undefined) groups[item.storageName] = [];
            groups[item.storageName].push(item);
        }
        return groups;
    }

}