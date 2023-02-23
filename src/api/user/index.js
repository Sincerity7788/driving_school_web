import request from "@/utils/request.js";

// 登陆
export function loginAPI(data) {
  return request({ url: "/api/v1/user/login", method: "post", data });
}

// 注册
export function registerAPI(data) {
  return request({ url: "/api/v1/user/register", method: "post", data });
}

// 注册
export function questionAddAPI(data) {
  return request({ url: "/api/v1/question/add", method: "post", data });
}
