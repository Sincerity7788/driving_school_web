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
      <div class="practiceOrTest_root_question_info">
        <div class="practiceOrTest_root_question_info_title">
          <span>第1题</span>
          <van-tag type="primary">单选题</van-tag>
          <van-tag type="success">多选题</van-tag>
          <van-tag type="danger">判断题</van-tag>
        </div>
        <div>
          <div>故意遮挡号牌应该扣多少分？</div>
          <div>
            <van-image
              width="100%"
              height="100%"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </div>
        </div>
      </div>
      <div class="practiceOrTest_root_question_select">
        <van-radio-group v-model="checked">
          <van-cell title="单选框 1" clickable @click="checked = '1'">
            <template #right-icon>
              <van-radio shape="square" name="1" />
            </template>
          </van-cell>
          <van-cell title="单选框 2" clickable @click="checked = '2'">
            <template #right-icon>
              <van-radio shape="square" name="2" />
            </template>
          </van-cell>
        </van-radio-group>
      </div>
    </div>
    <!--    <div class="practiceOrTest_root_operate" v-if="type === '4'">-->
    <!--      <van-button plain hairline type="primary">上一题</van-button>-->
    <!--      <van-button plain hairline type="primary">提交考卷</van-button>-->
    <!--      <van-button plain hairline type="success">下一题</van-button>-->
    <!--    </div>-->
    <van-action-bar>
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
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
import { ref } from "vue";

export default {
  name: "practiceOrTest",

  setup() {
    // 路由实例
    const router = useRouter();
    // 当前路由信息
    const route = useRoute();

    // 当前选中的题
    const checked = ref(-1);

    // 当前题的类型
    const type = route.query.type;

    // 显示选择题
    const showSelectQuestion = ref(false);

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

    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      router,
      title,
      types,
      checked,
      type,
      showSelectQuestion,
    };
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
    padding-top: 100px;
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
