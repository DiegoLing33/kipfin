import {APIUserFlags} from "@/api/APIUsers";

export default class KFUserFlags {

    private readonly canEdit: '1' | '0';
    private readonly canChangeFaculty: '1' | '0';
    private readonly canChangeSchool: '1' | '0';

    constructor(raw: APIUserFlags) {
        this.canEdit = raw.canEdit;
        this.canChangeFaculty = raw.canChangeFaculty;
        this.canChangeSchool = raw.canChangeSchool;
    }

    /**
     * Returns true, if user can edit primary data
     */
    public isCanEdit(){
        return this.canEdit === '1';
    }

    /**
     * Returns true, if user can edit school data
     */
    public isCanSchoolEdit(){
        return this.canChangeSchool === '1';
    }

    /**
     * Returns true, if user can edit faculty data
     */
    public isCanFacultyEdit(){
        return this.canChangeFaculty === '1';
    }

}