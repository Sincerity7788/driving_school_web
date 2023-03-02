<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item name="1">
      <template #title>
        <div>
          <div
            :class="{
              practiceOrTest_root_answer_info: true,
              success: answerInfo.right,
              danger: !answerInfo.right,
            }"
          >
            <div>
              <van-icon :name="answerInfo.right ? 'success' : 'cross'" />
              <span>{{ answerInfo.right ? "答对啦" : "答错啦" }}</span>
            </div>
          </div>

          <div class="practiceOrTest_root_answer_info_count">
            <span v-show="!answerInfo.right">
              正确答案：
              <strong class="primary">
                {{
                  answerInfo.answer === "true"
                    ? "正确"
                    : answerInfo.answer === "false"
                    ? "错误"
                    : answerInfo.answer
                }}
              </strong>
            </span>
            <span>
              遇到过
              <strong class="success">{{ answerInfo.frequency }}</strong>
              次
            </span>
            <span>
              答错过
              <strong class="danger">{{ answerInfo.mistake }}</strong>
              次
            </span>
          </div>
        </div>
      </template>
      <div v-html="answerInfo.answerExplain"></div>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "AnswerInfo",
  props: {
    answerInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const activeNames = reactive(["1"]);
    return {
      activeNames,
    };
  },
};
</script>

<style lang="less" scoped>
.practiceOrTest_root_answer_info {
  &.success {
    color: #07c160;
  }
  &.danger {
    color: #ee0a24;
  }
}
.practiceOrTest_root_answer_info_count {
  & > span {
    padding-right: 20px;
  }
  & > span {
    & > strong.success {
      color: #07c160;
    }
    & > strong.danger {
      color: #ee0a24;
    }
    & > strong.primary {
      color: #1989fa;
    }
  }
}
</style>
