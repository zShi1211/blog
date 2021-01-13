<template>
  <div class="loadMore" ref="progress">
    <div class="progress" v-if="isMore"></div>
    <div v-else>没有更多了~</div>
  </div>
</template>

<script>
export default {
  props: {
    loadMore: {
      type: Function,
      default: () => {},
    },
    isMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      watchScroll: null,
    };
  },
  mounted() {
    this.load();
    this.watchScroll = this.$throttle(this.load, 50);
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    load() {
      if (!this.isMore) {
        window.removeEventListener("scroll", this.watchScroll);
        this.watchScroll = null;
        return;
      }
      const { top } = this.$refs.progress.getBoundingClientRect();
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
        // 当该元素还有50px出现viewport时加载数据
      if (top - clientHeight < 50) {
        this.loadMore();
      }
    },
  },
  destroyed() {
    // 如果加载全部数据this.watchScroll就为null，如果没有加载完数据组件销毁就会清除监听
    if (this.watchScroll) {
      window.removeEventListener("scroll", this.watchScroll);
    }
  },
};
</script>

<style scoped lang="scss">
.loadMore {
  display: flex;
  justify-content: center;
  margin: 20px;
  font-size: 12px;
  color: #777;
}
.progress {
  height: 10px;
  width: 200px;
  background: #dc3545
    linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
  background-size: 10px;
  border-radius: 10px;
  animation: progress 1s linear infinite;
}
@keyframes progress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10px 0;
  }
}
</style>