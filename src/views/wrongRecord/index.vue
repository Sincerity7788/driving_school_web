<template>
  <div>
    <div>
      <van-nav-bar
        title="错题记录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>错题记录</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router/dist/vue-router";

export default {
  name: "wrongRecordView",
  setup() {
    const router = useRouter();

    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
    };
  },
};
</script>

<style scoped></style>
