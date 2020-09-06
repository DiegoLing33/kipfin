import {InputReformers} from "@/modules/InputControllers/Common/InputReformers";
import {InputPreTests} from "@/modules/InputControllers/Common/InputPreTests";
import DateIO from "@/core/Utils/DateIO";

const LingPluginItems = {
    reformers: InputReformers,
    preTests: InputPreTests,
    io: {
        date: DateIO,
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        readonly $lp: typeof LingPluginItems;
    }
}

export default function LingPlugin(vue: any): void {
    // Components

    // Body mod
    vue.prototype.$lp = LingPluginItems;
}