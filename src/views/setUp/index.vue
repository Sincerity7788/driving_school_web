<template>
  <div>
    <div>
      <van-nav-bar
        title="设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>设置</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router/dist/vue-router";

export default {
  name: "setUpView",
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
