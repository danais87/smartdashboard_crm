import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueTelInput from "vue-tel-input";
import 'vue-tel-input/dist/vue-tel-input.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueTelInput)


Amplify.configure(aws_exports);
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
