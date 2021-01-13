<template>
  <div :class="themeMode">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["themeMode"]),
  },
  created() {
    window.onkeydown = (e) => {
      if (e.code === "Escape") {
       this.changeThemeMode()
      }
    };
  },
  methods: {
    ...mapMutations(["changeThemeMode"]),
  },
};
</script>

<style lang="scss">
</style>