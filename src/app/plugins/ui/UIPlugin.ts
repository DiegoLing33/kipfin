import Vue from "vue";
import {NameList} from "@/ling/types/Common";
import UI from "@/app/plugins/ui/UI";

/**
 * The account interface
 */
declare module 'vue/types/vue' {
    interface Vue {
        $ui: typeof UI;
        $modalShow: (name: string) => void;
        $transaction: typeof UI.transaction;
    }
}

/**
 * THE UI PLUGIN
 */
export default class UIPlugin {
    static install(vue: typeof Vue, options: NameList<any> = {}) {
        vue.prototype.$ui = UI;
        vue.prototype.$modalShow = (name: string) => {
            UI.eventBus.$emit("m::" + name + "::show");
        };
        vue.prototype.$transaction = UI.transaction;
    }
}