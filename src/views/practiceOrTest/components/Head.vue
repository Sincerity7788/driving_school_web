<template>
  <div class="head_root">
    <div class="head_root_title">
      <span>{{ `${pageNum} / ${question.total || 0}` }}</span>
      <span v-if="queryInfo.operationType === '4'">{{ time }}</span>
      <div>
        <QuestionTag :titleType="question.titleType" />
      </div>
    </div>
    <div class="head_root_question_info">
      <div>{{ question.title }}</div>
      <div v-if="question.titlePic">
        <van-image width="100%" height="100%" :src="question.titlePic" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";
import QuestionTag from "@/components/QuestionTag";

export default {
  name: "HeadView",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    queryInfo: {
      type: Object,
      default: () => ({}),
    },
    pageNum: {
      type: Number,
      default: 1,
    },
  },
  components: {
    QuestionTag,
  },
  setup(props) {
    const time = ref("45:00");
    let _T = null;

    // 开启定时器
    const startTime = () => {
      // 获取当前时间
      const newTime = new Date();
      // 设置分钟为四十五分钟后
      newTime.setMinutes(newTime.getMinutes() + 45);
      // 获取毫秒数
      const nextTimeCount = newTime.getTime();

      // 开启定时器
      _T = setInterval(() => {
        // 获取毫秒数
        const newTimeCount = new Date().getTime();
        const t = new Date(nextTimeCount - newTimeCount);
        time.value = t.getMinutes() + ":" + t.getSeconds();
      }, 1000);
    };

    if (props.queryInfo.operationType === "4") {
      console.log("开启定时器");
      startTime();
    }

    onUnmounted(() => {
      // 关闭定时器
      console.log("关闭定时器");
      clearInterval(_T);
    });
    return {
      time,
    };
  },
};
</script>

<style lang="less" scoped>
.head_root {
  box-shadow: 0 0 10px 0 #eee;
  & > div {
    padding: 20px;
  }
  .head_root_title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    & > span:nth-of-type(1) {
      font-weight: bold;
    }
  }
  .head_root_question_info {
    & > div:nth-child(2) {
      height: 300px;
      margin-top: 10px;
    }
  }
}
</style>
