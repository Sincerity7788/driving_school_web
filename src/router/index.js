import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home";
const routes = [
  {
    path: "/",
    name: "HomeView",
    component: Home,
  },
  {
    path: "/my",
    name: "myView",
    component: () => import("@/views/my/index.vue"),
  },
  {
    path: "/login",
    name: "loginView",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
