import {APIFileResult} from "@/api/APIFiles";
import {Dict} from "@/app/types";

export default class PSPUtils {

    public static groupItems(items: APIFileResult[]){
        const groups: Dict<APIFileResult[]> = {};
        for(const item of items){
            if(groups[item.file_type] === undefined) groups[item.file_type] = [];
            groups[item.file_type].push(item);
        }
        return groups;
    }

}