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
              :text="`练习进度(${userInfo.quantity || 0}/${questionTotal})`"
            />
          </div>

          <div class="home_root_btn_group">
            <div>
              <van-button plain block type="success" @click="toTestPage(1)">
                顺序练习
              </van-button>
            </div>

            <div>
              <van-button plain block type="primary" @click="toTestPage(2)">
                随机练习
              </van-button>
            </div>

            <div>
              <van-button plain block type="warning" @click="toTestPage(3)">
                错题练习
              </van-button>
            </div>

            <div>
              <van-button block type="success" @click="toTestPage(4)">
                模拟考试
              </van-button>
            </div>
          </div>
        </van-tab>

        <van-tab title="科目四"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { userStore } from "@/store/userStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getQuestionTotalAPI } from "@/api/home";

export default {
  name: "HomeView",
  setup() {
    // 路由
    const router = useRouter();
    // tab切换
    const active = ref(0);
    // 用户数据
    const user = userStore();
    const { userName, userInfo } = storeToRefs(user);
    // 环形图数据
    const currentRate = ref(0);
    const rate = ref(0);

    // 总数,
    const questionTotal = ref(0);
    const gradientColor = {
      "0%": "#3fecff",
      "100%": "#6149f6",
    };
    // 切换tab,
    const onClickTab = () => {};
    // 跳转练习页面,
    const toTestPage = (type) => {
      // 跳转,
      router.push({
        path: "/practiceOrTest",
        query: { type, current: user.userInfo.quantity },
      });
    };
    // 获取总数,
    const getTotal = () => {
      getQuestionTotalAPI()
        .then((res) => {
          questionTotal.value = res.data ?? 0;
        })
        .catch((err) => console.log(err));
    };
    return {
      userName,
      active,
      onClickTab,
      currentRate,
      gradientColor,
      rate,
      getTotal,
      questionTotal,
      userInfo,
      toTestPage,
    };
  },
  created() {
    this.getTotal();
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
