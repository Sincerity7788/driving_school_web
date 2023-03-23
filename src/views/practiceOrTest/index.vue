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
    <!--   题目内容   -->
    <div class="practiceOrTest_root_question">
      <QuestionHead
        :question="questionInfo"
        :page-num="pagingInfo.current"
        :query-info="queryInfo"
      />
      <div class="practiceOrTest_root_question_select">
        <Select ref="selectRef" :selectInfo="selectInfo" />
      </div>
    </div>
    <div class="practiceOrTest_root_btn">
      <!--   操作按钮   -->
      <van-button
        type="primary"
        @click="addHistoryQuestion"
        :disabled="showAnswer"
      >
        确定
      </van-button>
      <van-button
        type="success"
        @click="nextQuestion"
        :disabled="!showAnswer && queryInfo.operationType !== '4'"
      >
        下一题
      </van-button>
    </div>
    <div v-if="queryInfo.operationType !== '4'">
      <van-cell title="收藏该题">
        <template #right-icon>
          <van-switch v-model="collect" @change="addCollect" />
        </template>
      </van-cell>
    </div>
    <div v-show="showAnswer">
      <AnswerInfo :answer-info="answerInfo" />
    </div>
    <div v-if="queryInfo.operationType === '4'">
      <SelectQuestion
        :question-list="questionList"
        @changeQuestion="changeQuestion"
      />
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router/dist/vue-router";
import { reactive, ref, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import {
  addCollectAPI,
  addHistoryQuestionAPI,
  deleteUserCollectAPI,
  deleteRedisQuestionAPI,
  getQuestionAPI,
  getQuestionIndexDataAPI,
  userHasQuestionAPI,
  getRandomAPI,
} from "@/api/practiceOrTest";
import { userStore } from "@/store/userStore";
import QuestionHead from "./components/Head";
import Select from "./components/Select";
import AnswerInfo from "./components/AnswerInfo";
import SelectQuestion from "./components/SelectQuestion";
import { showLoadingToast, closeToast, showSuccessToast } from "vant";

export default {
  name: "practiceOrTest",
  components: {
    QuestionHead,
    Select,
    AnswerInfo,
    SelectQuestion,
  },
  setup() {
    // 当前标题信息
    const titleKeys = {
      1: "顺序练习",
      2: "随机练习",
      3: "错题练习",
      4: "模拟考试",
    };

    // 用户信息
    const user = userStore();
    // 结构需要的数据
    const { userInfo } = storeToRefs(user);
    // 路由实例
    const router = useRouter();
    // 当前路由信息
    const route = useRoute();

    // 当前路由参数信息
    const queryInfo = reactive({ ...route.query });

    // 当前题的信息
    const questionInfo = reactive({
      title: "",
      titleType: "1",
      titlePic: "",
      current: 0,
      total: 0,
    });
    // 分页信息
    const pagingInfo = reactive({
      current: +queryInfo.current,
      total: 0,
    });
    // 选择项信息
    const selectInfo = reactive({
      question: questionInfo, // 题的信息
      isDisable: false, // 是否禁止选择
      answer: "", // 已经选择过的答案
    });
    // 答案信息
    const answerInfo = reactive({});
    // 模拟考试题的列表信息
    const questionList = reactive(new Array(100))
      .fill(1)
      .map(() => ({
        question: null,
        answer: null,
      }));

    // 获取select组件的实例
    const selectRef = ref(null);
    // 页面标题
    const title = ref(titleKeys[queryInfo.operationType]);
    // 是否显示答案
    const showAnswer = ref(false);
    // 收藏该题
    const collect = ref(false);

    // 获取题的信息
    const getQuestionInfo = () => {
      const params = {
        userId: userInfo.value.userId,
        type: queryInfo.type, // 科目1还是科目2
        orderType: queryInfo.operationType, // 当前的模式 1顺序练习 2随机练习 3错题练习
        pageNum: pagingInfo.current, // 当前页数
        pageSize: 1,
      };
      // 判断当前是不是模拟考试
      if (queryInfo.operationType === "4") {
        getQuestionIndexDataAPI({
          userId: params.userId,
          index: params.pageNum - 1,
        }).then((res) => {
          updateQuestionInfo({
            current: pagingInfo.current,
            total: 100,
            question: res.data || {},
          });
          // 保存一份在做题列表中
          questionList[pagingInfo.current - 1].question = res.data;
        });
      } else {
        getQuestionAPI(params).then((res) => {
          updateQuestionInfo({
            total: res.data.total,
            current: res.data.current,
            question: res.data?.records?.[0] || {},
          });
        });
      }
    };

    // 给题目信息赋值
    const updateQuestionInfo = (data) => {
      // 获取收藏
      // 判断如果是模拟考试就不提示
      if (queryInfo.operationType !== "4") {
        getHasCollect(data);
      }

      // 保存分页信息
      pagingInfo.total = data.total || 0;
      // 保存当前题信息
      Object.assign(questionInfo, data.question);
      questionInfo.total = pagingInfo.total;
      questionInfo.current = pagingInfo.current;
      // 获取到题的信息取消禁止
      selectInfo.isDisable = false;
      // 清除加载中提示
      closeToast();
    };

    // 返回方法
    const onClickLeft = () => {
      router.back();
    };

    // 下一题
    const nextQuestion = () => {
      pagingInfo.current++;
      // 获取信息
      getQuestionInfo();
      // 重置选择信息
      resetSelectAndAnswer();
    };
    // 重置选择信息
    const resetSelectAndAnswer = () => {
      // 关闭答案区域的dom
      showAnswer.value = false;
      // 清除选择项
      selectRef.value.resetSelectData();
    };

    // 确定提交
    const addHistoryQuestion = () => {
      // 提交信息
      const data = {
        userId: userInfo.value.userId,
        id: questionInfo.id,
        questionId: questionInfo.questionId,
        questionTitle: questionInfo.title,
        answer: selectRef.value.getAnswer().value,
        type: queryInfo.type,
      };

      // 开启加载提示
      showLoadingToast({
        message: "提交中...",
        forbidClick: true,
      });
      addHistoryQuestionAPI(data).then((res) => {
        // 保存答案
        Object.assign(answerInfo, res.data);
        // 显示答案区域的dom
        showAnswer.value = true;
        // 获取到了答案就应该让选择框禁止
        selectInfo.isDisable = true;
        // 保存一份答案到历史信息中
        questionList[pagingInfo.current - 1].answer = res.data;
        questionList[pagingInfo.current - 1].historyAnswer = data.answer;
        // 清除加载中提示
        closeToast();
      });
    };

    // 全部题中选择某个题
    const changeQuestion = (item, index) => {
      // 判断当前index和当前页是不是相等
      if (index === pagingInfo.current - 1) {
        return;
      }
      // 重置选择信息
      resetSelectAndAnswer();
      // 改变分页，请求数据
      pagingInfo.current = index + 1;
      // 判断当前是否选择过
      if (item.question) {
        // 直接赋值
        updateQuestionInfo({
          current: pagingInfo.current,
          total: 100,
          question: item.question || {},
        });
        // 判断是否已经选择过
        if (item.answer) {
          // 将答案保存
          selectInfo.answer = item.historyAnswer;
          // 显示答案的信息
          Object.assign(answerInfo, item.answer);
          // 显示答案区域的dom
          showAnswer.value = true;
          // 获取到了答案就应该让选择框禁止
          selectInfo.isDisable = true;
        }
      } else {
        getQuestionInfo();
      }
    };

    // 查询是否收藏过
    const getHasCollect = (data) => {
      const params = {
        userId: userInfo.value.userId,
        questionId: data.question.questionId,
      };
      userHasQuestionAPI(params).then((res) => {
        collect.value = res.data;
      });
    };

    // 收藏
    const addCollect = () => {
      if (collect.value) {
        const data = {
          questionId: questionInfo.questionId,
          questionTitle: questionInfo.title,
          userId: userInfo.value.userId,
        };
        addCollectAPI(data).then(() => {
          showSuccessToast("收藏成功");
        });
      } else {
        const params = {
          userId: userInfo.value.userId,
          questionId: questionInfo.questionId,
        };
        deleteUserCollectAPI(params).then(() => {
          showSuccessToast("取消收藏成功");
        });
      }
    };

    // 从数据库吧数据放到redis中
    const getRandom = () => {
      // 开启加载提示
      showLoadingToast({
        message: "加载中...",
        forbidClick: true,
      });
      const params = { userId: userInfo.value.userId };
      getRandomAPI(params)
        .then(() => {
          getQuestionInfo();
        })
        .catch(() => {
          // 清除加载中提示
          closeToast();
        });
    };

    // 监听组件销毁就删除redis中的数据
    onUnmounted(() => {
      deleteRedisQuestionAPI({ userId: userInfo.value.userId }).then(() => {});
    });

    return {
      onClickLeft,
      title,
      questionInfo,
      queryInfo,
      getQuestionInfo,
      selectInfo,
      nextQuestion,
      addHistoryQuestion,
      selectRef,
      answerInfo,
      showAnswer,
      collect,
      questionList,
      changeQuestion,
      pagingInfo,
      addCollect,
      getRandom,
    };
  },
  created() {
    this.getRandom();
  },
};
</script>

<style lang="less">
.practiceOrTest_root {
  .practiceOrTest_root_question {
    padding: 20px;
    .practiceOrTest_root_question_select {
      margin: 20px 0;
    }
  }
  .practiceOrTest_root_btn {
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
  }
}
</style>
