import Vue from 'vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import toYuanFilter from 'components/filters/toYuan';

import App from './app.vue';
import routes from './route';

//import './vendor';
import './index.scss';

Vue.use(Element, { size: 'small' });
Vue.use(VueRouter);
Vue.filter(toYuanFilter.name, toYuanFilter.function);

const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

