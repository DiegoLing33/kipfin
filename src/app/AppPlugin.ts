import KIPD from "@/app/KIPD";
import {FieldFormatter, FieldTester} from "@/components/fields/Field";
import {fmt, lang} from "@/app/Dictionaries";
import UserUtils from "@/utils/UserUtils";
import {TextFormatter} from "@/ling/support/TextValidation";

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
}

declare module 'vue/types/vue' {
    interface Vue {
        readonly $app: AppPluginApp;
        readonly $lang: typeof lang;
        readonly $fmt: typeof fmt;
    }
}

export default function AppPlugin(vue: any): void {
    vue.prototype.$lang = lang;
    vue.prototype.$fmt = fmt;
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

        fieldTester: FieldTester,
        fieldFormatter: FieldFormatter,
    } as AppPluginApp;
}


