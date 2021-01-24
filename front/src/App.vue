<template>
  <div :class="themeMode">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      transitionName: "",
    };
  },
  computed: {
    ...mapState(["themeMode"]),
  },
  created() {
    window.onkeydown = (e) => {
      if (e.code === "Escape") {
        this.changeThemeMode();
      }
    };
  },
  methods: {
    ...mapMutations(["changeThemeMode"]),
  },
  watch: {
    $route(to, from) {
      const toPath = to.path === "/" ? "" : to.path;
      const fromPath = from.path === "/" ? "" : from.path;
      const toDepth = toPath.split("/").length;
      const fromDepth = fromPath.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      console.log(this.transitionName)
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-left-enter,
.slide-right-leave-to {
  position: absolute;
  top: 0;
  left: 20px;
  opacity: 0;
}
.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  position: absolute;
  top: 0;
  left: -20px;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
  width: 100%;
}
.slide-left-enter-to,
.slide-left-leave,
.slide-right-enter-to,
.slide-right-leave {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
}
</style>