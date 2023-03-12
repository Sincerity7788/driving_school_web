<template>
  <div class="head_root">
    <div class="head_root_title">
      <span>{{ `${pageNum} / ${question.total || 0}` }}</span>
      <span>中间信息</span>
      <div>
        <van-tag type="primary" v-show="question.titleType === '1'">
          单选题
        </van-tag>
        <van-tag type="success" v-show="question.titleType === '3'">
          多选题
        </van-tag>
        <van-tag type="danger" v-show="question.titleType === '2'">
          判断题
        </van-tag>
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
