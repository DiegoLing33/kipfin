import Vue from 'vue'
import App from './views/App.vue'
import './registerServiceWorker'
import router from './app/router'
import store from './app/store'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue";
import VueCookie from "vue-cookies-ts";
import AppPlugin from "@/app/plugins/AppPlugin";
import {APIPlugin} from "@/app/api/API";
import AccountPlugin from "@/app/plugins/account/AccountPlugin";
import UIPlugin from "@/app/plugins/ui/UIPlugin";

// Vue toast plugin
const VueToast = require('vue-toast-notification/dist/index') as any;
const VueContentPlaceholders = require('vue-content-placeholders') as any;

Vue.use(AppPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCookie);
Vue.use(APIPlugin);
Vue.use(AccountPlugin);
Vue.use(UIPlugin);
Vue.use(VueToast, {position: 'top'});
Vue.use(VueContentPlaceholders)

Vue.config.productionTip = false

import "@/styles/style.scss";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
