import axios from "axios";
import { showFailToast } from "vant";
import "vant/es/toast/style";

const request = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000,
});

// 请求拦截
request.interceptors.request.use((config) => {
  config.headers["X-Token"] = "123456";
  return config;
});

// 响应拦截

request.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 校验toke

    // 校验非200的
    if (data.code !== "200") {
      showFailToast(data.message);
      return Promise.reject(false);
    }

    return data;
  },
  (error) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    return Promise.reject(new Error(message));
  }
);

export default request;
