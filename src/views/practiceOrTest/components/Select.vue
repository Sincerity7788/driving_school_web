<template>
  <div class="practiceOrTest_root_question_select">
    <van-checkbox-group v-if="question.titleType === '3'" v-model="checkedList">
      <van-cell
        v-for="(item, index) in selectList"
        :key="index"
        :title="question[item.prop]"
        clickable
        @click="toggle(index)"
      >
        <template #right-icon>
          <van-checkbox
            :name="item.name"
            :ref="(el) => (checkboxRefs[index] = el)"
            @click.stop
          />
        </template>
      </van-cell>
    </van-checkbox-group>
    <van-radio-group v-else v-model="checked">
      <van-cell
        v-for="(item, index) in selectList"
        :key="index"
        :title="question[item.prop]"
        clickable
        @click="checked = item.name"
      >
        <template #right-icon>
          <van-radio shape="square" :name="item.name" />
        </template>
      </van-cell>
    </van-radio-group>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "SelectView",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // 绑定多选时值
    const checkedList = ref([]);
    // 获取多选时item的实例
    const checkboxRefs = reactive([]);
    // 切换多选
    const toggle = (index) => {
      console.log(checkboxRefs);
      checkboxRefs[index].toggle();
    };

    // 单选
    const checked = ref(null);

    // 选择项
    const selectList = reactive([]);
    // 选择项
    const selectItem = (data) => {
      selectList.length = 0;
      let list = [
        {
          prop: "op1",
          name: "A",
        },
        {
          prop: "op2",
          name: "B",
        },
        {
          prop: "op3",
          name: "C",
        },
        {
          prop: "op4",
          name: "D",
        },
      ];
      if (data.titleType === "2") {
        list = [
          {
            prop: "op1",
            name: "true",
          },
          {
            prop: "op2",
            name: "false",
          },
        ];
      }
      selectList.push(...list);
    };

    selectItem(props.question);

    return {
      checkedList,
      checkboxRefs,
      toggle,
      checked,
      selectItem,
      selectList,
    };
  },
};
</script>

<style scoped></style>
