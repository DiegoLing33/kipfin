import {APIUserResults} from "@/api/APIUsers";
import {APIFileResult} from "@/api/APIFiles";

export default class StepAssistant {

    public static schoolDone(me: APIUserResults) {
        return me.school.schoolDegreeCode && me.school.schoolName &&
            me.school.schoolAddress && me.school.schoolValue;
    }

    public static specializationDone(me: APIUserResults) {
        return me.facultyId && me.studyBase && parseInt(me.studentStatus) > 0;
    }

    public static theEnd(me: APIUserResults) {
        return me.studentStatus === '9';
    }

    public static documentsDone(me: APIUserResults, files: APIFileResult[]) {
        const tester = (type: string) => files.some((f: APIFileResult) => f.file_type === type && f.file_status === "1");
        const result = ["passport", "attestat", "student-photo"].filter(tester);
        return result.length === 3;
    }

    public static getStep(me: APIUserResults, files: APIFileResult[]){
        if(!StepAssistant.schoolDone(me)) return 1;
        if(!StepAssistant.documentsDone(me, files)) return 2;
        if(!StepAssistant.specializationDone(me)) return 3;

        if(StepAssistant.theEnd(me)) return 6;
        return 4;
    }

}
