import "@ant-design-vue/pro-layout/dist/style.css"
import "ant-design-vue/dist/antd.variable.min.css"
// import "ant-design-vue/dist/antd.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import ProLayout, { PageContainer } from "@ant-design-vue/pro-layout";

createApp(App)
  .use(router)
  .use(Antd)
  // .use(ProLayout)
  // .use(PageContainer)
  .component("pro-layout", ProLayout)
  .component("page-container", PageContainer)
  .mount('#app')
