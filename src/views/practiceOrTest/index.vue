<template>
  <div class="practiceOrTest_root">
    <div>
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="practiceOrTest_root_question">
      <QuestionHead :question="question" :page-num="pageNum" />
      <Select ref="SelectRef" :question="question" />
    </div>
    <div class="practiceOrTest_root_operate">
      <van-button
        plain
        hairline
        type="primary"
        :disabled="pageNum === 0"
        @click="changeQuestion(-1)"
      >
        上一题
      </van-button>
      <van-button
        plain
        hairline
        type="primary"
        :disabled="answerInfo.show"
        @click="addHistoryQuestion"
      >
        确 定
      </van-button>
      <van-button
        plain
        hairline
        type="success"
        @click="changeQuestion(1)"
        :disabled="!answerInfo.show || questionInfo.total <= pageNum"
      >
        下一题
      </van-button>
    </div>
    <div v-show="answerInfo.show">
      <AnswerInfo :answerInfo="answerInfo" />
    </div>

    <van-action-bar v-if="type === '4'">
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-icon text="1/100" color="#ff5000" />
      <van-action-bar-button
        color="#be99ff"
        type="warning"
        text="选择题目"
        @click="showSelectQuestion = true"
      />
      <van-action-bar-button color="#7232dd" type="danger" text="提交考卷" />
    </van-action-bar>
    <van-action-sheet
      :show="showSelectQuestion"
      title="所有题(0/100)"
      @cancel="showSelectQuestion = false"
    >
      <div class="practiceOrTest_root_question_list">
        <div v-for="item in 100" :key="item">
          <van-tag plain type="primary" size="large">
            {{ item }}
          </van-tag>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router/dist/vue-router";
import { reactive, ref } from "vue";
import { addHistoryQuestionAPI, getQuestionAPI } from "@/api/practiceOrTest";
import { userStore } from "@/store/userStore";
import QuestionHead from "./components/Head";
import Select from "./components/Select";
import AnswerInfo from "./components/AnswerInfo";
import { showToast, showLoadingToast, closeToast, showFailToast } from "vant";

export default {
  name: "practiceOrTest",
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  components: {
    QuestionHead,
    Select,
    AnswerInfo,
  },
  setup() {
    // 用户信息
    const user = userStore();
    // 路由实例
    const router = useRouter();
    // 当前路由信息
    const route = useRoute();

    // 当前题的类型
    const type = route.query.type;

    // 显示选择题
    const showSelectQuestion = ref(false);

    // 显示题的解答信息
    const answerInfo = reactive({
      show: false,
    });

    // 定义状态类型
    const types = {
      1: {
        title: "顺序练习",
      },
      2: {
        title: "随机练习",
      },
      3: {
        title: "错题练习",
      },
      4: {
        title: "模拟考试",
      },
    };
    // 处理标题
    const title = ref(types[type].title);

    // 当前题
    let question = reactive({});
    let questionInfo = reactive({});

    // 分页
    const pageNum = ref(+route.query.current || 0);

    // 获取当前选择项
    const SelectRef = ref(null);

    // 获取当前题
    const getQuestion = () => {
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: "加载中~",
      });
      const params = {
        type: 1,
        orderType: type,
        pageNum: pageNum.value,
        pageSize: 1,
        userId: user.userInfo.userId,
      };
      getQuestionAPI(params)
        .then((res) => {
          answerInfo.show = false;
          Object.assign(question, res.data?.records[0] || {});
          Object.assign(questionInfo, res.data || {});
          closeToast();
        })
        .catch(() => {
          closeToast();
        });
    };

    // 提交当前题的答案
    const addHistoryQuestion = () => {
      // 获取子组件数据
      const { checked, checkedList } = SelectRef.value;
      const answer =
        question.titleType === "3"
          ? checkedList.sort((a, b) => a - b).join("")
          : checked;
      if (!answer) {
        showToast("请先选择答案 !");
        return;
      }
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: "提交中~",
      });
      const data = {
        userId: user.userInfo.userId,
        questionId: question.questionId,
        id: question.id,
        answer,
      };
      addHistoryQuestionAPI(data)
        .then(({ data }) => {
          closeToast();
          Object.assign(answerInfo, data);
          answerInfo.show = true;
          answerInfo.isRight = data.right;
          answerInfo.info = data.answerExplain;
        })
        .catch(() => {
          closeToast();
        });
    };

    // 下一题 或者 上一题
    const changeQuestion = (pageNumValue) => {
      if (type === "3" && questionInfo.total <= pageNum.value) {
        showFailToast("最后一题了");
        return;
      }
      // 分页数量+1
      pageNum.value += pageNumValue;
      // 重置选择信息
      SelectRef.value.checked = "";
      SelectRef.value.checkedList.length = 0;
      getQuestion();
    };

    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      router,
      title,
      types,
      type,
      showSelectQuestion,
      question,
      getQuestion,
      pageNum,
      addHistoryQuestion,
      answerInfo,
      changeQuestion,
      SelectRef,
      questionInfo,
    };
  },
  created() {
    this.getQuestion();
  },
};
</script>

<style lang="less">
.practiceOrTest_root {
  .practiceOrTest_root_question {
    padding: 20px;
    .practiceOrTest_root_question_info {
      box-shadow: 0 0 10px 0 #eee;

      .practiceOrTest_root_question_info_title {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #eee;
        & > span:nth-child(1) {
          font-size: 30px;
          font-weight: bold;
        }
      }
      & > div {
        padding: 20px;
        & > div:nth-child(2) {
          height: 300px;
          margin-top: 10px;
        }
      }
    }

    .practiceOrTest_root_question_select {
      margin-top: 20px;
    }
  }
  .practiceOrTest_root_operate {
    display: flex;
    justify-content: space-around;
    padding-top: 60px;
    padding-bottom: 40px;
  }
  .practiceOrTest_root_question_list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 20px;
    & > div {
      margin: 0 20px 20px 0;
    }
  }
}
</style>
