import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {title: 'Home'},
      redirect: '/dashboard',
      component: BasicLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {title: '看板', icon: 'icon-icon-test'},
          component: () => import('@/views/dashboard/index.vue'),
        },
      ]
    },
  ]
})

export default router
