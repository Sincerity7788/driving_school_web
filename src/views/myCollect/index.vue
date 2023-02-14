<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>我的收藏</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "myCollectView",
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
