<template>
  <div class="QuestionListItem_root">
    <div>
      <div class="QuestionListItem_root_title">
        {{ itemData.questionTitle }}
      </div>
      <div class="QuestionListItem_root_type">
        <div class="QuestionListItem_root_type_num">
          <span>做错:</span>
          <span>{{ itemData.mistake }}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import QuestionTag from "@/components/QuestionTag";
export default {
  name: "QuestionListItem",
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    // QuestionTag,
  },
};
</script>

<style lang="less" scoped>
.QuestionListItem_root {
  padding: 10px 20px;

  & > div {
    box-shadow: 0px 0px 10px 0px #eee;
    padding: 10px 20px;
  }
  .QuestionListItem_root_title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
    color: #555;
  }
  .QuestionListItem_root_type {
    display: flex;
    justify-content: space-between;
    .QuestionListItem_root_type_num {
      & > span:nth-child(1) {
        color: #999;
        padding-right: 10px;
        font-size: 26px;
      }
      & > span:nth-child(2) {
        color: #f56c6c;
      }
    }
  }
}
</style>
