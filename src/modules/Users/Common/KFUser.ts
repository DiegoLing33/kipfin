import {APIUserResults} from "@/core/app/api/APIUsers";
import API, {NumericString} from "@/core/app/api/API";
import UserUtils from "@/modules/Users/Utils/UserUtils";
import {APIFileResult} from "@/core/app/api/APIFiles";
import KFUserGroup from "@/modules/Users/Common/KFUserGroup";
import KFUserFlags from "@/modules/Users/Common/KFUserFlags";
import KFDocument from "@/modules/Documents/Common/KFDocument";
import {Numeric, optional, Optional} from "@/core/Common/Common";

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
            "tags": "",
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
    public tags!: string[];

    public studentTeacherName = "";
    public specializationId!: Numeric;
    public baseId!: Numeric;

    public raw!: APIUserResults;

    public loadedFiles = Array<APIFileResult>();
    public onDataChanged = optional<(name: keyof KFUser, value: any) => void>();


    constructor(raw: APIUserResults) {
        this.init(raw);
    }

    isZero(){
        return this.userId === '' || this.userId === '-1';
    }

    async byRaw(raw: APIUserResults) {
        this.init(raw);
    }

    async updateUserMe() {
        const user = await API.users.me();
        this.init(user);
    }

    public set(name: keyof KFUser, value: any) {
        this[name] = value;
        if (this.onDataChanged) this.onDataChanged(name, value);
    }

    private init(raw: APIUserResults) {
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
        this.tags = (raw.tags || '').split(",").filter((v: string) => v !== '');

        this.group = new KFUserGroup(raw.group || {});

        this.specializationId = raw.facultyId || "0";
        this.baseId = raw.studyBase || "0";

        this.raw = raw;
    }

    /**
     * Updates the user files
     */
    public async updateFiles() {
        const res = await API.files.list(this.userId);
        this.loadedFiles = (res).list;
        return this.loadedFiles;
    }

    /**
     * Loads all user files (KFDocument 's)
     */
    public async loadAllUserFiles() {
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
    async createReserve(reserved: string) {
        return await API.request('mission.createReserve', {userId: this.userId, reserved});
    }

}

export interface WithAvatarAndName {
    avatar: string;

    getFullName(): string;
}