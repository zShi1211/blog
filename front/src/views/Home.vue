<template>
  <div>
    <Loading :show="loading" />
    <div class="wrapper" @mousemove="bgMoveHandle" v-if="!loading">
      <div class="bg">
        <img
          :src="this.homeInfo.bgImg"
          alt=""
          ref="bgImg"
          :style="{ transform: `translate(${translateX}px, ${translateY}px)` }"
        />
      </div>
      <div class="dask">
        <Nav :icp="homeInfo.icp" />
        <div class="content">
          <div class="date">
            <div class="hours" :class="{ active: hours == 12 }">
              {{ hours }}
            </div>
            <div class="date-right">
              <div class="year">
                {{ date | year }}
              </div>
              <div class="minute" :class="{ active: minute == 12 }">
                {{ minute }}
              </div>
            </div>
          </div>
          <div class="description">
            {{ homeInfo.description }}
          </div>
        </div>
      </div>
      <div class="icp">
        <div class="icon">
          <i class="iconfont icon-beian"></i>
        </div>
        <p>
          {{ homeInfo.icp }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import { mapActions, mapState } from "vuex";
import dateFormat from "@/utils/dateFormat";

export default {
  components: {
    Loading,
    Nav,
  },
  data() {
    return {
      loading: true,
      disWidth: 0,
      disHeight: 0,
      clientWidth: 0,
      clientHeight: 0,
      ratioX: 0,
      ratioY: 0,
      date: new Date(),
      timer: null,
    };
  },
  computed: {
    ...mapState(["homeInfo"]),
    translateX() {
      return (this.disWidth / 2) * this.ratioX;
    },
    translateY() {
      return (this.disHeight / 2) * this.ratioY;
    },
    hours() {
      return this.date.getHours().toString().padStart(2, 0);
    },
    minute() {
      return this.date.getMinutes().toString().padStart(2, 0);
    },
  },
  async created() {
    // 设置事件时间定时器
    this.timer = setInterval(() => {
      const newDate = new Date();
      if (newDate.getSeconds() === 0) {
        this.date = newDate;
      }
    }, 1000);
    if (!this.homeInfo.bgImg) {
      await this.fetchGetHomeInfo();
    }
    const bgImg = new Image();
    bgImg.src = this.homeInfo.bgImg;
    bgImg.onload = () => {
      this.loading = false;
      //loading结束后展示内容,因为要获取dom元素,页面渲染后立刻执行$nextTick
      this.$nextTick(() => {
        this.getDisSize();
        // 防抖
        window.onresize = this.$debounce(() => {
          this.getDisSize();
        });
      });
    };
  },
  methods: {
    ...mapActions(["fetchGetHomeInfo"]),
    bgMoveHandle(e) {
      this.ratioX = (e.pageX / this.clientWidth) * 2 - 1;
      this.ratioY = (e.pageY / this.clientHeight) * 2 - 1;
    },
    //获取图片与屏幕大小的差
    getDisSize() {
      this.clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const bgImgWidth = this.$refs.bgImg.clientWidth;
      const bgImgHeight = this.$refs.bgImg.clientHeight;
      this.disWidth = bgImgWidth - this.clientWidth;
      this.disHeight = bgImgHeight - this.clientHeight;
    },
  },
  filters: {
    year(date) {
      return dateFormat(date);
    },
  },
  destroyed() {
    window.onresize = null;
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      flex: none;
      transition: transform 0.1s linear;
      width: 105vw;
      height: 105vh;
      object-fit: cover;
    }
  }

  .dask {
    position: relative;
    width: 100%;
    height: 100%;
    @include light(rgba(238, 238, 238, 0.42), #222933);
    @include dark(rgba(57, 62, 70, 0.5), rgb(235, 229, 229));
    clip-path: polygon(0 0, 20% 0, 55% 100%, 0 100%);
    display: flex;
    .content {
      width: 30%;
      max-width: 350px;
      height: 50%;
      align-self: flex-end;
      .description {
        line-height: 1.5;
        font-size: 14px;
      }
      .date {
        display: flex;
        .hours,
        .minute {
          font-size: 110px;
          &.active {
            color: #f50514;
            text-shadow: 0px 0px 5px #594255;
          }
        }
        .date-right {
          margin-left: 10px;
          margin-top: 1em;
          text-align: center;
        }
      }
    }
  }

  .icp {
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    .icon {
      position: absolute;
      width: 100%;
      height: 100%;
      @include light(#ebe5e5, #222933);
      @include dark(#393e46, #ebe5e5);
      left: 0;
      border-radius: 50%;
      top: 0;
      z-index: 1;
      .iconfont {
        font-size: 30px;
      }
    }
    p {
      position: absolute;
      @include light(#ebe5e5, #222933, " width 0.8s");
      @include dark(#393e46, #ebe5e5, " width 0.8s");
      width: 0px;
      white-space: nowrap;
      overflow: hidden;
      top: 0%;
      right: 0%;
      padding-right: 100%;
      border-radius: 20px;
    }
    &:hover {
      p {
        width: 150px;
        padding: 0 100% 0 10px;
      }
    }
  }
}

@media (max-width: 992px) {
  .wrapper {
    .dask {
      clip-path: polygon(0 0, 25% 0, 70% 100%, 0 100%);
    }
  }
}

@media (max-width: 768px) {
  .wrapper {
    .dask {
      clip-path: polygon(0 0, 40% 0, 85% 100%, 0 100%);
    }
  }
}

@media (max-width: 576px) {
  .wrapper {
    .dask {
      clip-path: none;
      .content {
        width: 80%;
        height: auto;
        margin: 0 0 20px 20px;
        .date {
          .hours,
          .minute {
            font-size: 100px;
          }
        }
      }
    }
  }
  .icp {
    display: none;
  }
}
</style>