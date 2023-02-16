<template>
  <div class="login_root">
    <div class="login_root_title">
      {{ isRegister ? "欢迎注册" : "欢迎登陆" }}
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-if="isRegister"
            v-model="searchParams.nickName"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="searchParams.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="searchParams.passWord"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            {{ isRegister ? "注册" : "登陆" }}
          </van-button>
          <div v-if="isRegister" class="login_root_register">
            <span>已有账号？</span>
            <span @click="changeIsRegister(false)">立即登陆</span>
          </div>
          <div v-else class="login_root_register">
            <span>没有账号？</span>
            <span @click="changeIsRegister(true)">立即注册</span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { loginAPI, registerAPI } from "@/api/user/index.js";
import { showSuccessToast } from "vant";
import { userStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
export default {
  name: "loginView",
  setup() {
    const router = useRouter();

    // 是否登陆
    let isRegister = ref(false);

    const user = userStore();

    const searchParams = reactive({
      userName: "",
      passWord: "",
      nickName: "",
    });

    // 切换登陆注册
    const changeIsRegister = (type) => {
      isRegister.value = type;
      searchParams.userName = "";
      searchParams.passWord = "";
      searchParams.nickName = "";
    };

    // 登陆
    const onSubmit = () => {
      if (isRegister.value) {
        registerAPI(searchParams)
          .then(() => {
            changeIsRegister(false);
            showSuccessToast("注册成功，请登陆");
          })
          .catch(() => {});
      } else {
        console.log(1);
        loginAPI(searchParams)
          .then((res) => {
            user.login(res.data);
            showSuccessToast("登陆成功");
            router.push("/");
          })
          .catch(() => {});
      }
    };

    return {
      onSubmit,
      searchParams,
      isRegister,
      changeIsRegister,
    };
  },
};
</script>

<style lang="less" scoped>
.login_root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  .login_root_title {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    padding: 20px 0;
  }
  .login_root_register {
    text-align: right;
    padding-top: 50px;
    & > span:nth-child(2) {
      font-size: 30px;
      color: rgba(64, 158, 255, 0.83);
    }
  }
}
</style>
