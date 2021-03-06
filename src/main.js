// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

import './common/less/index.less';
/* eslint-disable no-new */

// change the homepage to  specified page
router.push('goods');

Vue.use(VueResource);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  }
});
