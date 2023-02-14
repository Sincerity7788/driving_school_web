import router from "@/router";
import { getToken } from "@/utils/auth";

router.beforeEach((to, form, next) => {
  // 定义路由白名单
  const whiteList = ["/login", "/my", "/"];
  // 判断是否有token
  if (getToken()) {
    // 判断是不是进入的登录页
    if (to.path === "/login") {
      // 直接放行，因为登陆过了
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // 如果没有token，进入的是白名单的页面，就直接放行
    if (whiteList.includes(to.path)) {
      next();
    } else {
      // 否则就直接去登录页面
      next({ path: "/login" });
    }
  }
});
