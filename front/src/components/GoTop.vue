<template>
  <transition name="goTop">
    <div @click="goTop" class="goTop" v-if="isShow">
      <i class="iconfont icon-dingbu"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      clearFn: null,
      isShow: false,
      watchScroll: null,
    };
  },
  created() {
    const height =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.watchScroll = this.$throttle(() => {
      if (window.scrollY > height) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    goTop() {
      this.clearFn = this.$scroll2El(0, 600, 0);
    },
  },
  destroyed() {
    if (this.clearFn) {
      this.clearFn();
    }
    window.removeEventListener("scroll", this.watchScroll);
  },
};
</script>

<style scoped lang='scss'>
.goTop {
  position: fixed;
  bottom: 10px;
  right: 5px;
  z-index: 800;
  cursor: pointer;
  .iconfont {
    font-size: 35px;
  }
}
.goTop-enter,
.goTop-leave-to{
    transform: translateX(100%);
}

.goTop-enter-active,
.goTop-leave-active{
    transition: transform 0.5s;
}

.goTop-enter-to,
.goTop-leave{
    transform: translateX(0);
}
</style>