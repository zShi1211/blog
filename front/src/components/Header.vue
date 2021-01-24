<template>
  <div class="header-container" :class="{ hide: scrollHide }">
    <div class="header">
      <div class="control">
        <div>
          <Button :onClick="toggleAudio">
            <i class="iconfont icon-icon_play" v-if="paused"></i>
            <i class="iconfont icon-zanting" v-else></i>
          </Button>
        </div>
        <div>
          <Logo></Logo>
        </div>
        <div>
          <Button :onClick="changeLike" v-if="showLike">
            <i class="iconfont icon-aixin" :class="{ like: isLike }"></i>
          </Button>
          <Button :onClick="changeShowMenu">
            <i class="iconfont icon-caidan"></i>
          </Button>
        </div>
      </div>
      <div class="progress" :style="{ width: progressRatio + '%' }"></div>
    </div>
    <div class="mask" v-show="showMenu" @click.self="changeShowMenu"></div>
    <div class="menu" :class="{ show: showMenu }">
      <div class="changeTheme">
        <Button :onClick="darkMode">
          <i class="iconfont icon-moonbyueliang"></i>
        </Button>
        <Button :onClick="lightMode">
          <i class="iconfont icon-tianqitaiyangqichuang"></i>
        </Button>
      </div>
      <div class="theme2Picture">
        <transition-group :duration="500" name="theme">
          <svg
            v-if="themeMode === 'light'"
            key="dark"
            t="1609753618605"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10926"
            width="48"
            height="48"
          >
            <path
              d="M861 656.7l144.6-144.6L861 367.6V163.1H656.6L512 18.6 367.4 163.1H163v204.5L18.4 512.1 163 656.7v204.4h204.4L512 1005.7l144.6-144.6H861z"
              fill="#FCD170"
              p-id="10927"
            ></path>
            <path
              d="M512 1015.7c-2.6 0-5.1-1-7.1-2.9L363.3 871.1H163c-5.5 0-10-4.5-10-10V660.8L11.4 519.2c-1.9-1.9-2.9-4.4-2.9-7.1 0-2.7 1.1-5.2 2.9-7.1L153 363.4V163.1c0-5.5 4.5-10 10-10h200.3L504.9 11.5c1.9-1.9 4.4-2.9 7.1-2.9s5.2 1.1 7.1 2.9l141.6 141.6H861c5.5 0 10 4.5 10 10v200.3L1012.6 505c1.9 1.9 2.9 4.4 2.9 7.1 0 2.7-1.1 5.2-2.9 7.1L871 660.8v200.3c0 5.5-4.5 10-10 10H660.7l-141.6 141.6c-2 2-4.5 3-7.1 3zM173 851.1h194.4c2.7 0 5.2 1.1 7.1 2.9L512 991.6l137.5-137.5c1.9-1.9 4.4-2.9 7.1-2.9H851V656.7c0-2.7 1.1-5.2 2.9-7.1l137.5-137.5-137.5-137.5c-1.9-1.9-2.9-4.4-2.9-7.1V173.1H656.6c-2.7 0-5.2-1.1-7.1-2.9L512 32.7 374.5 170.2c-1.9 1.9-4.4 2.9-7.1 2.9H173v194.4c0 2.7-1.1 5.2-2.9 7.1L32.6 512.1l137.5 137.5c1.9 1.9 2.9 4.4 2.9 7.1v194.4z"
              fill=""
              p-id="10928"
            ></path>
            <path
              d="M512 512.1m-257.8 0a257.8 257.8 0 1 0 515.6 0 257.8 257.8 0 1 0-515.6 0Z"
              fill="#F7DDAD"
              p-id="10929"
            ></path>
            <path
              d="M512 779.9c-71.5 0-138.8-27.9-189.4-78.4-50.6-50.6-78.4-117.8-78.4-189.4s27.9-138.8 78.4-189.4c50.6-50.6 117.8-78.4 189.4-78.4 71.5 0 138.8 27.9 189.4 78.4 50.6 50.6 78.4 117.8 78.4 189.4S752 650.9 701.4 701.5 583.5 779.9 512 779.9z m0-515.6c-66.2 0-128.4 25.8-175.2 72.6-46.8 46.8-72.6 109-72.6 175.2s25.8 128.4 72.6 175.2c46.8 46.8 109 72.6 175.2 72.6 66.2 0 128.4-25.8 175.2-72.6 46.8-46.8 72.6-109 72.6-175.2S734 383.7 687.2 336.9c-46.8-46.8-109-72.6-175.2-72.6z"
              fill=""
              p-id="10930"
            ></path>
          </svg>
          <svg
            v-else
            key="light"
            t="1609753570701"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10773"
            width="48"
            height="48"
          >
            <path
              d="M554.84811 298.412549h-85.226521a21.366313 21.366313 0 0 1 0-42.732626h85.226521a21.366313 21.366313 0 0 1 0 42.732626z"
              fill="#F6BB42"
              p-id="10774"
            ></path>
            <path
              d="M810.527675 724.664522A511.59786 511.59786 0 0 1 331.993886 33.064429 511.35913 511.35913 0 1 0 990.768638 692.316641a509.449292 509.449292 0 0 1-180.240963 32.347881z"
              fill="#FFCE54"
              p-id="10775"
            ></path>
            <path
              d="M554.84811 980.344087a511.35913 511.35913 0 0 1-381.967604-850.832838 511.239765 511.239765 0 1 0 721.441312 721.799407A509.329927 509.329927 0 0 1 554.84811 980.344087z"
              fill="#F6BB42"
              p-id="10776"
            ></path>
            <path
              d="M767.914414 277.284966a21.366313 21.366313 0 1 1-21.366313-21.366313 21.366313 21.366313 0 0 1 21.366313 21.366313z"
              fill="#4A89DC"
              p-id="10777"
            ></path>
            <path
              d="M661.440945 490.35127a21.366313 21.366313 0 1 1-21.366313-21.366313 21.366313 21.366313 0 0 1 21.366313 21.366313z"
              fill="#48CFAD"
              p-id="10778"
            ></path>
            <path
              d="M1023.593979 234.31361a21.366313 21.366313 0 1 1-21.366313-21.246948 21.366313 21.366313 0 0 1 21.366313 21.246948z"
              fill="#ED5564"
              p-id="10779"
            ></path>
            <path
              d="M640.074632 21.247306A21.366313 21.366313 0 1 1 618.827684 0.000358a21.366313 21.366313 0 0 1 21.246948 21.246948z"
              fill="#AC92EB"
              p-id="10780"
            ></path>
            <path
              d="M512.234849 192.058444a21.366313 21.366313 0 0 0-21.246948 21.366313v127.720418a21.366313 21.366313 0 1 0 42.613261 0v-127.720418a21.366313 21.366313 0 0 0-21.366313-21.366313z"
              fill="#FFCE54"
              p-id="10781"
            ></path>
            <path
              d="M874.387884 426.371696a21.366313 21.366313 0 0 0-21.246948 21.366313v127.839783a21.366313 21.366313 0 0 0 42.613261 0V447.738009a21.366313 21.366313 0 0 0-21.366313-21.366313z"
              fill="#F6BB42"
              p-id="10782"
            ></path>
            <path
              d="M917.001145 532.964531H831.774623a21.366313 21.366313 0 0 1 0-42.613261h85.226522a21.366313 21.366313 0 1 1 0 42.613261z"
              fill="#FFCE54"
              p-id="10783"
            ></path>
          </svg>
        </transition-group>
      </div>
      <ul>
        <router-link
          v-for="item in navList"
          :key="item.path"
          tag="li"
          :to="item.path"
        >
          {{ item.name }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  props: {
    showLike: {
      type: Boolean,
      default: false,
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    changeLike: {
      type: Function,
      default: () => {},
    },
    isScrollHide: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Button,
    Logo,
  },
  computed: {
    ...mapState(["themeMode", "homeInfo"]),
    progressRatio() {
      return (this.audioCurDuration / this.audioTotalDuration) * 100;
    },
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
      audio: new Audio(),
      paused: true,
      audioTotalDuration: 0,
      audioCurDuration: 0,
      timer: null,
      prevScrollPostion: 0,
      scrollHide: false,
    };
  },
  async created() {
    if (!this.homeInfo.bgm) {
      await this.fetchGetHomeInfo();
    }
    this.audio.src = this.homeInfo.bgm;
    this.audio.loop = true;
    this.audio.addEventListener("loadedmetadata", (e) => {
      this.audioTotalDuration = this.audio.duration;
    });
    // 滚动条滑动隐藏显示
    if (this.isScrollHide) {
      window.addEventListener(
        "scroll",
        this.$throttle((e) => {
          if (window.scrollY > 50) {
            if (window.scrollY - this.prevScrollPostion > 0) {
              this.scrollHide = true;
            }
            if (window.scrollY - this.prevScrollPostion < 0) {
              this.scrollHide = false;
            }
            this.prevScrollPostion = window.scrollY;
          }
        }, 20)
      );
    }
  },

  methods: {
    ...mapActions(["fetchGetHomeInfo"]),
    changeShowMenu() {
      this.showMenu = !this.showMenu;
      // 显示时阻止屏幕滚动
      if (this.showMenu) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
    ...mapMutations(["changeThemeMode"]),
    darkMode() {
      this.changeThemeMode("dark");
    },
    lightMode() {
      this.changeThemeMode("light");
    },
    toggleAudio() {
      if (this.paused) {
        this.audio.play();
        this.paused = false;
        this.timer = setInterval(() => {
          this.audioCurDuration = this.audio.currentTime;
        }, 1000);
      } else {
        this.audio.pause();
        this.paused = true;
        clearInterval(this.timer);
      }
    },
  },
  destroyed() {
    this.audio.pause();
    this.paused = true;
    clearInterval(this.timer);
    document.documentElement.style.overflow = "scroll";
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
.header-container {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  @include light(#f2f4f7, #6e828a, "transform 0.6s");
  @include dark(#393939, rgb(235, 229, 229), "transform 0.6s");
  transform: translateY(0);
  &.hide {
    transform: translateY(-110%);
  }
  .header {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;

    .progress {
      position: absolute;
      height: 100%;
      @include light(#cde3eb);
      @include dark(#393e46);
      background: rgba(255, 255, 255, 0.3);
      top: 0;
      left: 0;
      z-index: -1;
    }
    .control {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .like {
        color: #d81e06;
      }
    }
  }

  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .menu {
    width: 250px;
    position: fixed;
    &.show {
      transform: translateX(0);
    }
    transform: translateX(100%);
    top: 0;
    right: 0;
    height: 100vh;
    flex-direction: column;
    display: flex;
    @include light(#ebf0f6, #364e68, "transform 0.3s");
    @include dark(#364e68, rgb(235, 229, 229), "transform 0.3s");
    .changeTheme {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      .iconfont {
        font-size: 20px;
      }
    }

    .theme2Picture {
      height: 200px;
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(2);
      }
    }

    ul {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      border-radius: 20px 20px 0 0;
      justify-content: space-around;
      font-weight: bold;
      user-select: none;
      @include light(#f4f4f4, inherit);
      @include dark(#4d6783, inherit);
      align-items: center;
      li {
        padding: 15px 50px;
        border-radius: 10px;
        opacity: 0.4;
        transition: opacity 0.3s;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
        &.router-link-active {
          opacity: 1;
        }
      }
    }
  }
}
.theme-enter,
.theme-leave-to {
  opacity: 0;
}

.theme-enter-active,
.theme-leave-active {
  transition: opacity 1s;
}
.theme-enter-to,
.theme-leave {
  opacity: 1;
}
</style>