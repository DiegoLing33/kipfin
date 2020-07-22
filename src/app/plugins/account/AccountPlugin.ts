import Vue from 'vue';
import Account from "@/app/plugins/account/Account";
import {NameList} from "@/ling/types/Common";

/**
 * The account interface
 */
declare module 'vue/types/vue' {
    interface Vue {
        $account: typeof Account;
    }
}

/**
 * The account plugin
 */
export default class AccountPlugin {
    /**
     * Install function
     * @param vue
     * @param options
     */
    static install(vue: typeof Vue, options: NameList<any> = {}) {
        //
        //  Variables
        //
        vue.prototype.$account = Account;

        //
        //  Directives
        //
        Vue.directive("user-access", {
            bind(el, binding, vnode, oldVnode) {
                if (vnode.data) vnode.data.show = false;
                else vnode.data = {show: false};
            },
        })
    }

    [key: string]: any;
}