<template>
  <div class="wrapper" v-if="show">
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: true,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show: {
      handler() {
        if (this.show) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "scroll";
        }
      },
      immediate: true
    },
  },
};
</script>

<style scoped  lang="scss">
@import "@/assets/css/common.scss";
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  @include light(#fff);
  @include dark(#000);
  .dot {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: #000;
    @include light(#000);
    @include dark(#fff);
    border-radius: 50%;
    animation: scale 0.8s infinite linear alternate;
  }
}
@keyframes scale {
  0% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>