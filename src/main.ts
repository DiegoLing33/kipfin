import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue";
import VueCookie from "vue-cookies-ts";
import AppPlugin from "@/app/AppPlugin";
import {APIPlugin} from "@/api/API";


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
