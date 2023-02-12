import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      userName: "用户名",
    };
  },
  actions: {
    // 登陆
    login(data) {
      this.userName = data.userName;
      // 保存token之类的操作
    },
  },
  getters: {},
});
