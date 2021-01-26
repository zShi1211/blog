<template>
  <div class="nav">
    <div class="logo">
      <Logo />
      <Button :onClick="changeShowMenu" class="menuBtn">
        <i class="iconfont icon-caidan" v-if="!showMenu"></i>
        <i class="iconfont icon-guanbi" v-else></i>
      </Button>
    </div>
    <div class="content" :class="{ show: showMenu }">
      <ul>
        <router-link
          v-for="item in navList"
          :key="item.path"
          tag="li"
          :to="item.path"
        >
          <span>{{ item.name }}</span>
        </router-link>
        <Button :onClick="changeThemeMode">
          <i
            class="iconfont icon-moonbyueliang"
            v-show="themeMode === 'light'"
          ></i>
          <i
            class="iconfont icon-tianqitaiyangqichuang"
            v-show="themeMode === 'dark'"
          ></i>
        </Button>
      </ul>
      <p class="icp">{{ icp }}</p>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    icp: {
      type: String,
    },
  },
  components: {
    Button,
    Logo,
  },
  computed: {
    ...mapState(["themeMode"]),
  },
  data() {
    return {
      navList: [
        { name: "文章", path: "/article" },
        { name: "留言", path: "/leaveWord" },
        { name: "碎语", path: "/debrisWord" },
        { name: "是我", path: "/self" },
      ],
      showMenu: false,
    };
  },
  methods: {
    ...mapMutations(["changeThemeMode"]),
    changeShowMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
.nav {
  width: 115px;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    .menuBtn {
      display: none;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icp {
      display: none;
    }
    ul {
      font-weight: bold;
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
      li {
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s;
        padding: 10px;
        border-radius: 4px;
        @include click();
      }
    }
  }
}
@media (max-width: 576px) {
  .nav {
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 0;
    display: block;
    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin-top: 20px;
      .menuBtn {
        display: block;
      }
    }
    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: 60px;
      box-sizing: border-box;
      z-index: -1;
      top: 0;
      right: 0;
      transform: translateX(100%);
      @include light(#fff, #2c2d34, "transform 0.3s");
      @include dark(#2c2d34, #fff, "transform 0.3s");
      &.show {
        transform: translateX(0);
      }
      .icp {
        display: block;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>