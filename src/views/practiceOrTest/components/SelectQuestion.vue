<template>
  <van-action-bar>
    <van-action-bar-button
      type="danger"
      text="选择题目"
      color="#07c160"
      @click="openShow"
    />
    <van-action-bar-button
      type="danger"
      text="提交考卷"
      color="#1989fa"
      @click="submit"
    />
  </van-action-bar>
  <van-action-sheet
    :show="show"
    title="全部题"
    close-on-click-overlay
    @click-overlay="show = false"
    @cancel="show = false"
  >
    <div class="selectQuestion_root_select">
      <span
        v-for="(item, index) in questionList"
        :class="{ action: item.answer }"
        :key="index"
        @click="clickQuestion(item, index)"
      >
        {{ index + 1 }}
      </span>
    </div>
  </van-action-sheet>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SelectQuestion",
  props: {
    questionList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["changeQuestion"],
  setup(props, { emit }) {
    // 控制面板的开关
    let show = ref(false);

    // 打开选题框
    const openShow = () => {
      show.value = true;
    };

    // 交卷
    const submit = () => {};

    // 选择某个题
    const clickQuestion = (item, index) => {
      console.log("关闭弹窗");
      emit("changeQuestion", item, index);
      // 关闭弹窗
      show.value = false;
    };

    return {
      show,
      openShow,
      submit,
      clickQuestion,
    };
  },
};
</script>

<style lang="less" scoped>
.selectQuestion_root_select {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-sizing: border-box;
  padding: 20px;
  & > span {
    border: 1px solid #1989fa;
    min-width: 67px;
    text-align: center;
    color: #666;
    &.action {
      background-color: #1989fa;
      color: #fff;
    }
  }
}
</style>
