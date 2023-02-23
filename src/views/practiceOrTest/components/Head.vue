<template>
  <div class="practiceOrTest_root_question_info">
    <div class="practiceOrTest_root_question_info_title">
      <span>第 {{ pageNum }} 题、</span>
      <van-tag type="primary" v-if="question.titleType === '1'">单选题</van-tag>
      <van-tag type="success" v-if="question.titleType === '3'">多选题</van-tag>
      <van-tag type="danger" v-if="question.titleType === '2'">判断题</van-tag>
    </div>
    <div>
      <div>{{ question.title }}</div>
      <div v-if="question.titlePic">
        <van-image width="100%" height="100%" :src="question.titlePic" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadView",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    pageNum: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped></style>
