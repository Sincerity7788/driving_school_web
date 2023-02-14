<template>
  <div class="home_root">
    <div class="home_root_title">欢迎使用驾考必过练习</div>
    <div>
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="科目一">
          <div class="home_root_btn">
            <van-circle
              v-model:current-rate="currentRate"
              layer-color="#ebedf0"
              fill="#eee"
              :rate="rate"
              :color="gradientColor"
              text="练习进度(0/100)"
            />
          </div>
          <div class="home_root_btn_group">
            <div>
              <van-button plain block type="success">顺序练习</van-button>
            </div>
            <div>
              <van-button plain block type="primary">随机练习</van-button>
            </div>
            <div>
              <van-button plain block type="warning">错题练习</van-button>
            </div>
            <div>
              <van-button block type="success">模拟考试</van-button>
            </div>
          </div>
        </van-tab>
        <van-tab title="科目四">内容 2</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { userStore } from "@/store/userStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
export default {
  name: "HomeView",
  setup() {
    const active = ref(0);
    const user = userStore();
    const { userName } = storeToRefs(user);
    const currentRate = ref(0);
    const rate = ref(0);
    const gradientColor = {
      "0%": "#3fecff",
      "100%": "#6149f6",
    };

    // 切换tab
    const onClickTab = () => {};

    return {
      userName,
      active,
      onClickTab,
      currentRate,
      gradientColor,
      rate,
    };
  },
};
</script>

<style lang="less" scoped>
.home_root {
  .home_root_title {
    font-size: 50px;
    font-weight: bold;
    padding: 100px 0;
    text-align: center;
  }
  .home_root_btn {
    padding-top: 50px;
    text-align: center;
  }
  .home_root_btn_group {
    padding: 40px 200px;
    & > div {
      padding: 20px 0;
    }
  }
}
</style>
