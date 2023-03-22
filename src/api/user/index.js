import request from "@/utils/request.js";

// 登陆
export function loginAPI(data) {
  return request({ url: "/api/v1/user/login", method: "post", data });
}

// 注册
export function registerAPI(data) {
  return request({ url: "/api/v1/user/register", method: "post", data });
}

// 获取用户信息
export function getUserInfoAPI(params) {
  return request({ url: "/api/v1/user/getUserInfo", method: "get", params });
}
