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
  <van-dialog
    :show="showConfirm"
    title="温馨提示"
    showConfirmButton
    :showCancelButton="confirmContent.type"
    @confirm="addHistoryTest"
  >
    <div class="SelectQuestion_dialog">{{ confirmContent.content }}</div>
  </van-dialog>
</template>

<script>
import { useRouter } from "vue-router/dist/vue-router";
import { reactive, ref } from "vue";
import { addHistoryTestAPI } from "@/api/practiceOrTest";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia/dist/pinia";

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
    // 用户数据
    const user = userStore();
    const { userInfo } = storeToRefs(user);
    const router = useRouter();
    // 控制面板的开关
    let show = ref(false);
    let showConfirm = ref(false);
    let confirmContent = reactive({
      content: "您已经全部答题结束？确认交卷吗？",
      type: true,
    });

    // 打开选题框
    const openShow = () => {
      show.value = true;
    };

    // 交卷
    const submit = () => {
      // 弹窗二次确认
      showConfirm.value = true;
    };

    const addHistoryTest = () => {
      if (!confirmContent.type) {
        router.back();
        return;
      }
      const params = {
        userId: userInfo.value.userId,
        userName: userInfo.value.userName,
        finish: 1,
      };
      addHistoryTestAPI(params).then((res) => {
        confirmContent.type = false;
        confirmContent.content = `您本次考试成绩为：${res.data} 分`;
      });
    };

    // 选择某个题
    const clickQuestion = (item, index) => {
      emit("changeQuestion", item, index);
      // 关闭弹窗
      show.value = false;
    };

    return {
      show,
      openShow,
      submit,
      clickQuestion,
      showConfirm,
      addHistoryTest,
      confirmContent,
    };
  },
};
</script>

<style lang="less">
.SelectQuestion_dialog {
  padding: 30px;
}
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
