<template>
  <transition>
    <div :class="type" class="tooltip" v-if="isShow">
      <i class="iconfont icon-dui1" v-if="type === 'success'"></i>
      <i class="iconfont icon-quxiao" v-else></i>
      {{ msg }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success",
    },
    msg: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    this.isShow = true;
  },
};
</script>

<style lang='scss' scoped>
.tooltip {
  padding: 10px 15px;
  border-radius: 2px;
  margin: 5px auto;
  font-size: 16px;
}
.iconfont {
  margin-right: 5px;
  vertical-align: middle;
  font-size: 18px;
}
.success {
  background: #fff;
  color: rgb(130, 204, 146);
}
.error {
  background: #fff;
  color: rgb(204, 130, 142);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>