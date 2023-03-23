<template>
  <div>
    <div>
      <van-nav-bar
        title="错题记录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <QuestionListItem
              v-for="(item, index) in list"
              :key="index"
              :itemData="item"
            />
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router/dist/vue-router";
import { reactive, ref } from "vue";
import QuestionListItem from "@/components/QuestionListItem";
import { getListAPI } from "@/api/wrongRecord";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: "wrongRecordView",
  components: { QuestionListItem },
  setup() {
    const router = useRouter();

    // 用户信息
    const user = userStore();
    // 结构需要的数据
    const { userInfo } = storeToRefs(user);

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const paging = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    const onLoad = () => {
      if (!loading.value) {
        return;
      }
      loading.value = true;
      // 加载数据
      const params = {
        userId: userInfo.value.userId,
        current: paging.current,
        pageSize: paging.pageSize,
      };
      getListAPI(params).then((res) => {
        list.value.push(...(res.data.records || []));
        loading.value = false;
        refreshing.value = false;

        paging.total = res.data.total || 0;

        if (
          list.value.length === paging.total ||
          paging.current++ === res.data.pages
        ) {
          finished.value = true;
        }
      });
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;
      paging.current = 1;
      list.value.length = 0;

      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
    };
  },
};
</script>

<style scoped></style>
