<template>
  <pro-layout
    v-bind="layoutConf"
    v-model:open-keys="state.openKeys"
    v-model:collapsed="state.collapsed"
    v-model:selected-keys="state.selectedKeys"
    :loading="loading"
    :menu-data="menuData"
    :disable-mobile="true"
    @collapse="handleCollapse"
    :breadcrumb="{routes: breadcrumb}"
    disable-content-margin
    style="min-height: 100vh"
    iconfont-url="//at.alicdn.com/t/font_2804900_2sp8hxw3ln8.js"
  >
    <template #menuHeaderRender>
      <router-link :to="{path: '/'}">
        <img src="/avatar.png" />
        <h1>{{ title }}</h1>
      </router-link>
    </template>
    <template #rightContentRender>
      <RightContent :current-user="currentUser" />
    </template>
    <template #breadcrumbRender="{route, params, routes}">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        <HeartOutlined />
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{path: route.path, params}">
        <SmileOutlined />
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <SettingDrawer v-model="layoutConf" />
    <RouterView v-slot="{Component, route}">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </pro-layout>
</template>

<script setup>
import {computed, reactive, ref, watch, onMounted, nextTick} from "vue";
import {useRouter} from "vue-router"
import {getMenuData, clearMenuItem} from "@ant-design-vue/pro-layout";
import {SmileOutlined, HeartOutlined} from "@ant-design/icons-vue";
import SettingDrawer from "@/components/SettingDrawer/SettingDrawer.vue";
import RightContent from "@/components/RightContent/RightContent.vue";

const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive({
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
});
const loading = ref(false);
// 标题
const title = ref("外挂报告");
// 布局配置
const layoutConf = ref({
  layout: 'mix',
  navTheme: 'light',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true,
});
const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    };
  }),
);
const currentUser = reactive({
  nickname: 'Admin',
  avatar: 'A',
});

watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    state.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path);
  },
  {
    immediate: true,
  }
);


onMounted(() => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Edge') > -1) {
    nextTick(() => {
      state.collapsed = !state.collapsed;
      setTimeout(() => {
        state.collapsed = !state.collapsed;
      }, 16);
    })
  }
})

function handleCollapse(val) {
  state.collapsed = val;
}


</script>

<style scoped>

</style>
