<template>
  <div class="my_root">
    <div v-if="userInfo.userName">
      <div class="my_root_user_info">
        <div>{{ userInfo.nickName }}</div>
        <div>id: {{ userInfo.userName }}</div>
      </div>

      <div class="my_root_user_integral">
        <div>
          <span>{{ userInfo.quantity }}</span>
          <span>练习</span>
        </div>
        <div>
          <span>{{ userInfo.mistake }}</span>
          <span>错题</span>
        </div>
        <div>
          <span>{{ userInfo.fraction }}</span>
          <span>最高分</span>
        </div>
      </div>
      <div>
        <van-cell title="错题记录" is-link to="/wrongRecord" />
        <van-cell title="我的收藏" is-link to="/myCollect" />
        <van-cell title="设置" is-link to="/setUp" />
      </div>
    </div>
    <div v-else class="my_root_default">
      <div>请先登录</div>
      <van-button type="primary" size="small" @click="toLogin">
        立即登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  name: "myView",
  setup() {
    // 路由
    const router = useRouter();

    const user = userStore();
    const { userInfo } = storeToRefs(user);
    console.log(userInfo);

    // 跳转登录
    const toLogin = () => {
      router.push("/login");
    };

    return {
      userInfo,
      toLogin,
    };
  },
};
</script>

<style lang="less" scoped>
.my_root {
  .my_root_user_info {
    text-align: center;
    padding-top: 200px;
    & > div:nth-child(1) {
      font-size: 60px;
      padding-bottom: 20px;
    }
  }
  .my_root_user_integral {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding: 20px 50px;
    & > div {
      display: flex;
      padding: 20px;
      box-shadow: 1px 1px 10px 1px #eee;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > span:nth-child(1) {
        color: #999;
      }
      & > span:nth-child(2) {
        font-size: 30px;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .my_root_default {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    & > div {
      padding-bottom: 20px;
      font-size: 40px;
      color: #999999;
    }
  }
}
</style>
