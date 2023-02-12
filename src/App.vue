<template>
  <div>
    <div>
      <router-view />
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" replace to="/">练习</van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  components: {},
  setup() {
    const active = ref(0);

    return {
      active,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
