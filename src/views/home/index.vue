<template>
  <div class="home_root">
    <div class="home_root_title">欢迎使用驾考必过练习</div>
    <div>
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab :name="1" title="科目一"></van-tab>
        <van-tab :name="2" title="科目四"></van-tab>
      </van-tabs>
      <div class="home_root_btn">
        <van-circle
          v-model:current-rate="currentRate"
          layer-color="#ebedf0"
          fill="#eee"
          :rate="rate"
          :color="gradientColor"
          :text="`练习进度(${questionTotal.quantity || 0}/${
            questionTotal.total || 0
          })`"
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
    </div>
  </div>
</template>
<script>
import { userStore } from "@/store/userStore.js";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getQuestionTotalAPI } from "@/api/home";
import { getRandomAPI } from "@/api/practiceOrTest";

export default {
  name: "HomeView",
  setup() {
    // 路由
    const router = useRouter();
    // tab切换
    const active = ref(1);
    // 用户数据
    const user = userStore();
    const { userName, userInfo } = storeToRefs(user);
    // 环形图数据
    const currentRate = ref(0);
    const rate = ref(0);

    // 总数,
    const questionTotal = reactive({});
    const gradientColor = {
      "0%": "#3fecff",
      "100%": "#6149f6",
    };
    // 切换tab,
    const onClickTab = () => {
      getTotal();
    };
    // 跳转练习页面,
    const toTestPage = (operationType) => {
      let current = +questionTotal.quantity + 1;
      if (operationType === 2) {
        current = Math.floor(Math.random() * questionTotal.total);
      }
      if (operationType === 3) {
        current = 1;
      }
      if (operationType === 4) {
        getRandom();
        return;
      }
      // 跳转,
      router.push({
        path: "/practiceOrTest",
        query: { operationType, current, type: active.value },
      });
    };

    let questionPage = 493;
    let isGetQuestion = 0;
    let questionTotal2 = 493;

    // 从数据库吧数据放到redis中
    const getRandom = () => {
      const params = { userId: userInfo.value.userId };
      getRandomAPI(params).then(() => {
        // 跳转,
        router.push({
          path: "/practiceOrTest",
          query: { operationType: 4, type: active.value, current: 1 },
        });
      });
    };

    // 获取题目
    const getQuestionList = () => {
      if (questionPage > questionTotal2) {
        console.log("获取完成了");
        return;
      }
      fetch(
        `/api-cc/api/driver_exam/question/list?page=${questionPage++}&rank=1&type=2&app_id=sllpifhjeqqqmjqf&app_secret=bTJoMUZjaGE4RkN3RkttMEpKWWloQT09`,
        {
          method: "get",
        }
      )
        .then((json) => json.json())
        .then((res) => {
          isGetQuestion = 0;
          const list = res.data.list || [];
          questionTotal2 = res.data.totalPage;
          // 题目保存在数据库
          addQuestion(JSON.parse(JSON.stringify(list)));
          // 获取一下答案
          setTimeout(() => {
            getQuestionAnswer(JSON.parse(JSON.stringify(list)));
          }, 1000);
        });
    };

    // 获取答案 3152,3151,3150,3149,3148,3147,3146,3145,3144,3143
    const getQuestionAnswer = (list) => {
      console.log(list);
      const ids = list.map((item) => item.id).join();
      console.log(ids);
      const params = {
        app_id: "sllpifhjeqqqmjqf",
        app_secret: "bTJoMUZjaGE4RkN3RkttMEpKWWloQT09",
        ids,
      };
      fetch(
        `/api-cc/api/driver_exam/answer/list?ids=${ids}&app_id=sllpifhjeqqqmjqf&app_secret=bTJoMUZjaGE4RkN3RkttMEpKWWloQT09`,
        {
          method: "get",
        }
      )
        .then((json) => json.json())
        .then((res) => {
          console.log(res, params);
          if (res.data.length) {
            fn(res.data);
          }
        });
      let index = 0;
      // 获取每一条数据到信息
      const fn = (dataList) => {
        const data = dataList[index++];
        const item = {
          answerId: data.id,
          titleType: 1,
          answerExplain: data.explain,
          answer: data.answer,
        };

        // 存到数据库
        fetch("http://localhost:6789/api/v1/answer/add", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((json) => json.json())
          .then((res) => {
            // 判断是否成功了
            if (res.code === "200" && index < dataList.length) {
              fn(dataList);
            } else {
              // 是否需要调用接口获取题目
              if (++isGetQuestion === 2) {
                setTimeout(() => {
                  getQuestionList();
                }, 1000);
              }
            }
          });
      };
    };

    // 添加题到数据库
    const addQuestion = (list) => {
      let index = 0;
      const fn = () => {
        const item = list[index++];
        // 将 id 存在 questionId
        item.questionId = item.id;
        // 删除id字段
        delete item.id;
        // 保存在数据库中
        fetch("http://localhost:6789/api/v1/question/add", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((json) => json.json())
          .then((res) => {
            // 判断是否成功了
            if (res.code === "200" && index < list.length) {
              fn();
            } else {
              // 是否需要调用接口获取题目
              if (++isGetQuestion === 2) {
                setTimeout(() => {
                  getQuestionList();
                }, 1000);
              }
            }
          });
      };
      fn();
    };

    // 获取总数,
    const getTotal = () => {
      getQuestionTotalAPI({ userId: user.userInfo.userId, type: active.value })
        .then((res) => {
          Object.assign(questionTotal, res.data);
        })
        .catch((err) => console.log(err));
    };
    // 存在用户就直接查询吧
    if (user.userInfo.userId) {
      getTotal();
    }

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
