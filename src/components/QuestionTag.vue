<template>
  <van-tag type="primary" v-show="titleType === '1'">单选题</van-tag>
  <van-tag type="success" v-show="titleType === '3'">多选题</van-tag>
  <van-tag type="danger" v-show="titleType === '2'">判断题</van-tag>
</template>

<script>
export default {
  name: "QuestionTag",
  props: {
    titleType: String,
  },
};
</script>

<style scoped></style>
