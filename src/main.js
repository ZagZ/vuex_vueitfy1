import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import axios from "axios";
import VueAxios from "vue-axios";
import router from './router'

// Usage in Vue 2:
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    router,
    render: (h) => h(App)
}).$mount("#app");
