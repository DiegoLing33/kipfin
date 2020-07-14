import Vue from 'vue'
import App from './views/App.vue'
import './registerServiceWorker'
import router from './app/router'
import store from './app/store'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue";
import VueCookie from "vue-cookies-ts";
import AppPlugin from "@/app/plugins/AppPlugin";
import {APIPlugin} from "@/app/api/API";


Vue.use(AppPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCookie);
Vue.use(APIPlugin);

Vue.config.productionTip = false

import "@/styles/style.scss";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
