<template>
  <div class="Loading_root">
    <van-loading type="spinner" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "LoadingView",
  setup() {
    // 定义开关状态
    const show = ref(true);

    // 修改状态
    const changeShow = (type) => {
      show.value = type;
    };

    return {
      show,
      changeShow,
    };
  },
};
</script>

<style lang="less">
.Loading_root {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
