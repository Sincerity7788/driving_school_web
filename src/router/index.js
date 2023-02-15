import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home";
const routes = [
  {
    path: "/",
    name: "HomeView",
    mate: { title: "首页" },
    component: Home,
  },
  {
    path: "/my",
    name: "myView",
    mate: { title: "个人中心" },
    component: () => import("@/views/my/index.vue"),
  },
  {
    path: "/wrongRecord",
    name: "wrongRecord",
    mate: { title: "错题记录" },
    component: () => import("@/views/wrongRecord/index"),
  },
  {
    path: "/myCollect",
    name: "myCollect",
    mate: { title: "我的收藏" },
    component: () => import("@/views/wrongRecord/index"),
  },
  {
    path: "/setUp",
    name: "setUp",
    mate: { title: "设置" },
    component: () => import("@/views/setUp/index"),
  },
  {
    path: "/login",
    name: "loginView",
    mate: { title: "登录" },
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
