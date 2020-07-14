import {NumericString} from "@/app/api/API";

/**
 * The group entity
 */
export default class KFUserGroup {

    public readonly groupId!: NumericString;
    public readonly groupTitle!: string;
    public readonly groupAccess!: string[];

    constructor(raw: any) {
        this.groupId = raw['group_id'] || '-1';
        this.groupTitle = raw['title'] || "Undefined";
        this.groupAccess = (raw['access'] || "").split('|');
    }

    /**
     * Returns true, if user contains access index
     * @param accessIndex
     */
    public hasAccess(accessIndex: NumericString){
        return this.groupAccess.includes(accessIndex);
    }
}