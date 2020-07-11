import {APIUserResults, APIUserShort} from "@/api/APIUsers";
import API, {NumericString} from "@/api/API";
import UserUtils from "@/utils/UserUtils";
import {APIFileResult} from "@/api/APIFiles";
import KFUserGroup from "@/client/user/KFUserGroup";
import KFUserFlags from "@/client/user/KFUserFlags";
import KFDocument from "@/client/KFDocument";

export default class KFUser {

    public static createZeroUser() {
        return new KFUser({
            groupId: "",
            groupTitle: "",
            ok: false,
            "user_id": "",
            userId: "-1",
            lastname: "",
            name: "",
            surname: "",
            mail: "",
            "phone": "",
            "birthday": "",
            "gender": "",
            "facultyId": "0",
            "motherCapital": "0",
            "studentStatus": "0",
            "studyBase": "0",
            "notified": "0",
            "created": "2020-06-04 16:26:12",
            "school": {
                "schoolStatus": "0",
                "schoolName": null,
                "schoolAddress": null,
                "schoolValue": null,
                "schoolDegreeCode": "0",
            },
            "group": {
                "group_id": "0",
                "title": "",
                "access": "0"
            },
            "flags": {
                canEdit: '0',
                canChangeFaculty: '0',
                canChangeSchool: '0',
            },
        })
    }

    public userId!: NumericString;
    public lastname!: string;
    public name!: string;
    public surname!: string;
    public phone!: string;
    public mail!: string;
    public group!: KFUserGroup;
    public flags!: KFUserFlags;
    public avatar!: string;

    public raw!: APIUserResults;

    public loadedFiles = Array<APIFileResult>();

    constructor(raw: APIUserResults) {
        this.set(raw);
    }

    async byRaw(raw: APIUserResults){
        this.set(raw);
    }

    async updateUserMe(){
        const user = await API.users.me();
        this.set(user);
    }

    private set(raw: APIUserResults){
        if ((raw as any)['user_id']) this.userId = (raw as any)['user_id'];
        else if (raw.userId) this.userId = raw.userId;
        else raw.userId = "-1";

        this.lastname = raw.lastname;
        this.surname = raw.surname;
        this.name = raw.name;
        this.phone = raw.phone;
        this.mail = raw.mail;
        this.flags = new KFUserFlags(raw.flags);
        this.avatar = raw.avatar || '';

        this.group = new KFUserGroup(raw.group || {});

        this.raw = raw;
    }

    /**
     * Updates the user files
     */
    public async updateFiles() {
        this.loadedFiles = (await API.files.list(this.userId)).list;
    }

    /**
     * Loads all user files (KFDocument 's)
     */
    public async loadAllUserFiles(){
        const raw = (await API.files.list(this.userId)).list || [];
        return KFDocument.fromList(raw as any); //@fixme - any case
    }

    /**
     * Updates the full user
     */
    public async update() {
        await this.updateFiles();
    }

    public getFiles(): APIFileResult[] {
        return this.loadedFiles;
    }

    /**
     * Returns the raw user object
     */
    getRaw() {
        return this.raw;
    }

    /**
     * Returns the full name
     */
    getFullName() {
        return UserUtils.getFullName(this.getRaw());
    }

    /**
     * Creates the reserve
     * @param reserved
     */
    async createReserve(reserved: string){
        return await API.request('mission.createReserve', {userId: this.userId, reserved});
    }

}

export interface WithAvatarAndName {
    avatar: string;
    getFullName(): string;
}