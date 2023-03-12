<template>
  <div class="practiceOrTest_root_question_select">
    <van-checkbox-group
      v-if="selectInfo.question.titleType === '3'"
      v-model="checkedList"
    >
      <van-cell
        v-for="(item, index) in selectList"
        :key="index"
        :title="selectInfo.question[item.prop]"
        clickable
        @click="toggle(index)"
      >
        <template #right-icon>
          <van-checkbox
            :name="item.name"
            :ref="(el) => (checkboxRefs[index] = el)"
            @click.stop
            :disabled="selectInfo.isDisable"
          />
        </template>
      </van-cell>
    </van-checkbox-group>
    <van-radio-group v-else v-model="checked">
      <van-cell
        v-for="(item, index) in selectList"
        :key="index"
        :title="selectInfo.question[item.prop]"
        @click="cellClick(item)"
      >
        <template #right-icon>
          <van-radio :name="item.name" :disabled="selectInfo.isDisable" />
        </template>
      </van-cell>
    </van-radio-group>
  </div>
</template>

<script>
import { reactive, ref, effect } from "vue";

export default {
  name: "SelectView",
  props: {
    selectInfo: {
      type: Object,
      default: () => ({
        question: {}, // 题的信息
        isDisable: false, // 是否禁止选择
        answer: "", // 已经选择过的答案
      }),
    },
  },
  setup(props) {
    // 绑定多选时值
    const checkedList = ref([]);
    // 获取多选时item的实例
    const checkboxRefs = reactive([]);
    // 切换多选
    const toggle = (index) => {
      if (!props.selectInfo.isDisable) {
        checkboxRefs[index].toggle();
      }
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

    effect(() => {
      // 修改当前选择项信息
      selectItem(props.selectInfo.question);
    });

    effect(() => {
      // 获取到当前题的信息
      const { answer, question } = props.selectInfo;
      // 判断当前是否存在已经选择过的答案
      if (answer) {
        // 判断当前题的类型，给答案不同的赋值的方式
        if (question.titleType === "3") {
          checkedList.value = answer.split(",");
        } else {
          checked.value = answer;
        }
      }
    });

    // 点击cell选中
    const cellClick = (item) => {
      if (!props.selectInfo.isDisable) {
        checked.value = item.name;
      }
    };

    // 获取当前的答案
    const getAnswer = () => {
      let answer = checked;

      if (props.selectInfo.question.titleType === "3") {
        // 获取到结果，进行一个升序排列，然后转成字符串，并且将字符转成小写
        answer = checkedList.value.sort((a, b) => a - b).join(",");
      }
      return answer;
    };

    // 清空当前数据
    const resetSelectData = () => {
      checkedList.value.length = 0;
      checked.value = null;
    };

    return {
      checkedList,
      checkboxRefs,
      toggle,
      checked,
      selectItem,
      selectList,
      cellClick,
      getAnswer,
      resetSelectData,
    };
  },
};
</script>

<style scoped></style>
