import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/display.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// import './styles/dark/css-vars.css'
import './styles/cover.scss';
import './components/styles/common.scss';
import locale from 'element-plus/dist/locale/zh-cn.mjs';

// import AvatarGroup from '@/components/AvatarGroup/AvatarGroup.vue';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.component('AvatarGroup', AvatarGroup);
app.use(ElementPlus, { locale });
app.use(createPinia());
app.use(router);

app.mount("#app");
