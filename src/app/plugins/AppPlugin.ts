import KIPD from "@/app/KIPD";
import {FieldFormatter, FieldTester} from "@/components/fields/Field";
import UserUtils from "@/app/utils/UserUtils";
import {TextFormatter} from "@/ling/support/TextValidation";
import {APIPluginInterface, APITransactionFunc} from "@/app/api/API";

export interface AppPluginApp {
    infoStatus: typeof KIPD.infoStatus;
    specialization: typeof KIPD.specializations;
    short: typeof KIPD.short;
    bases: typeof KIPD.bases;
    studentStatus: typeof KIPD.studentStatus;
    parentName: typeof KIPD.parentName;
    fileTypes: typeof KIPD.fileTypes;
    yesNo: { "0": string; "1": string };
    gender: { "1": string; "2": string };

    userUtils: typeof UserUtils;

    formatPhone(s: string): string;

    fieldTester: typeof FieldTester;
    fieldFormatter: typeof FieldFormatter;

    textFormatter: typeof TextFormatter;

    modalShow(ctx: any, name: string): void;
    modalClose(ctx: any, name: string): void;
}

declare module 'vue/types/vue' {
    interface Vue {
        readonly $app: AppPluginApp;
        readonly $api: APIPluginInterface;
        readonly $transaction: APITransactionFunc;
    }
}
export default function AppPlugin(vue: any): void {
    vue.prototype.$app = {
        textFormatter: TextFormatter,
        infoStatus: KIPD.infoStatus,
        studentStatus: KIPD.studentStatus,
        short: KIPD.short,
        userUtils: UserUtils,
        specialization: KIPD.specializations,
        parentName: KIPD.parentName,
        fileTypes: KIPD.fileTypes,
        bases: KIPD.bases,
        yesNo: {"0": "Нет", "1": "Да"},
        gender: {"1": "Мужской", "2": "Женский"},
        formatPhone(s: string): string {
            const code = (s.substr(0, 1) === '7') ? '+7' : "7";
            return code + " (" + s.substr(1, 3) + ") "
                + s.substr(4, 3) + " " + s.substr(7, 2) + "-" + s.substr(9, 2);
        },
        modalShow(ctx: any, name: string){
          ctx.$refs[name].show();
        },
        modalClose(ctx: any, name: string){
          ctx.$refs[name].close();
        },

        fieldTester: FieldTester,
        fieldFormatter: FieldFormatter,
    } as AppPluginApp;
}


