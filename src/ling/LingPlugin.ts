import {InputReformers} from "@/ling/components/input/common/InputReformers";
import {InputPreTests} from "@/ling/components/input/common/InputPreTests";
import DateIO from "@/ling/utils/DateIO";

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