import { defineStore } from "pinia";
import { getUserInfo, setToken, setUserInfo } from "@/utils/auth";

let userInfo = JSON.parse(getUserInfo() || "{}");
export const userStore = defineStore("user", {
  state: () => ({
    userName: userInfo.userName,
    userInfo,
  }),
  actions: {
    // 登陆
    login(data) {
      this.userName = data.userName;
      this.userInfo = data;
      // 保存token之类的操作
      setToken(data.token);
      // 保存用户信息
      setUserInfo(JSON.stringify(data));
    },
    // 更新用户信息
    getUserInfo() {
      // 本地获取一下用户信息
    },
  },
  getters: {},
});
