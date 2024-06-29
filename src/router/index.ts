import { createWebHistory, createRouter } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

const appTitle = import.meta.env.VITE_APP_TITLE;

// 菜单栏：meta.menu: 菜单名称
// 标题名称：meta.title: 标题名称
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/application'
  },
  {
    path: "/application",
    name: 'Application',
    component: () => import("@/views/Appication/index.vue"),
    meta: {
      title: "Application"
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import("@/views/Home/index.vue"),
    meta: {
      title: "Home"
    }
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASEURL),
  routes,
})

// 全局路由守卫（设置标题）
router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') {
    document.title = `${title} | ${appTitle}`;
  } else {
    document.title = appTitle;
  }
}) 