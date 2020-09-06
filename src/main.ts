import Vue from 'vue'
import App from './views/App.vue'
import './registerServiceWorker'
import router from './core/Routes'
import store from './core/Store'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue";
import VueCookie from "vue-cookies-ts";
import AppPlugin from "@/core/app/plugins/AppPlugin";
import {APIPlugin} from "@/core/app/api/API";
import AccountPlugin from "@/core/app/plugins/account/AccountPlugin";
import UIPlugin from "@/core/app/plugins/ui/UIPlugin";
import LingPlugin from "@/modules/ling/LingPlugin";

// Vue toast plugin
const VueToast = require('vue-toast-notification/dist/index') as any;
const VueContentPlaceholders = require('vue-content-placeholders') as any;
const VSelect = require('@alfsnd/vue-bootstrap-select/dist/vue-bootstrap-select.esm').default as any;

Vue.use(AppPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCookie);
Vue.use(APIPlugin);
Vue.use(AccountPlugin);
Vue.use(UIPlugin);
Vue.use(VueToast, {position: 'top'});
Vue.use(VueContentPlaceholders);
Vue.use(VSelect);
Vue.use(LingPlugin);

Vue.config.productionTip = false

import "@/styles/style.scss";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
