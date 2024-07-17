import { createApp, Vue } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { dragscroll } from 'vue-dragscroll'; 
import router from './router';


loadFonts();



createApp(App)
  .directive('dragscroll', dragscroll)
  .use(vuetify)
  .use(router)
  .mount('#app');
