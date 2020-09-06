import Vue from "vue";
import {NameList} from "@/core/Common/Common";
import UI from "@/core/app/plugins/ui/UI";

interface ToastTypeOptions {
    type?: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    dismissible?: boolean;
    onClose?: Function;
    queue?: boolean; // Wait for existing to close before showing new
}

/**
 * The account interface
 */
declare module 'vue/types/vue' {
    interface Vue {
        $ui: typeof UI;
        $modalShow: (name: string) => void;
        $transaction: typeof UI.transaction;

        $toast: {
            open: (text: string, options?: ToastTypeOptions) => void;
            error: (text: string, options?: ToastTypeOptions) => void;
            success: (text: string, options?: ToastTypeOptions) => void;
            info: (text: string, options?: ToastTypeOptions) => void;
        };
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