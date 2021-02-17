<template>
  <div>
    <section class="page1">
      <div class="bg">
        <div class="border">
          <div class="frames">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="corners">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <div class="line">
            <h1>你好，陌生人</h1>
            <ul>
              <li>我是一位即将进入职场的00后</li>
              <li>接触前端也有很长一段时间了</li>
              <li>遇到好看的网页总会止步研究</li>
              <li>休闲时候游戏为辅音乐为主</li>
              <li>也会在B站微博等反复横跳</li>
              <li>当然定期运动也是很有必要</li>
            </ul>
          </div>
          <div class="line">
            <div class="top">
              <p>也不知道说点什么🤔</p>
              <p>就copy一段文字吧🤭</p>
            </div>
            <div class="middle">
              <p>
                你无法决定明天是晴是雨，无法决定此刻的坚持能换来什么。但你能决定今天有没有准备好雨伞，以及是否足够努力。
              </p>
              <p>
                不管昨日怎样，那已是过去，明天还没到来，不知道它是否更美好。把握当下，现在就是最好的礼物。Present！
              </p>
            </div>
            <div class="bottom">
              <p>感谢你的逗留，非常荣幸这里能留下你的脚印🎉</p>
              <p>最后就献上我最俗的祝福吧！祝你健康、快乐、发财哈哈哈👍</p>
            </div>
          </div>
          <div class="line">
            <div class="link">
              <router-link to="/" class="item">
                <Tooltip>
                  <template #tooltipText>
                    <div>
                      <i class="iconfont icon-tubiao15"></i>
                    </div>
                  </template>
                  <template #tooltipMessage>
                    <span class="message">回到首页</span>
                  </template>
                </Tooltip>
              </router-link>
              <div class="item">
                <Tooltip>
                  <template #tooltipText>
                    <div>
                      <i class="iconfont icon-youxiang"></i>
                    </div>
                  </template>
                  <template #tooltipMessage>
                    <span class="message">zshi1211@qq.com</span>
                  </template>
                </Tooltip>
              </div>
              <a  target="_blank" class="item">
                <Tooltip>
                  <template #tooltipText>
                    <div>
                      <i class="iconfont icon-github"></i>
                    </div>
                  </template>
                  <template #tooltipMessage>
                    <span class="message">去Github</span>
                  </template>
                </Tooltip>
              </a>
            </div>
            <i class="iconfont icon-xia guidance"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="page2">
      <div class="sticky">
        <div class="content">
          <div class="wran" v-if="!showDoodle">
            <p>这是一个万花筒</p>
            <p>当然也不是我写的</p>
            <p>部分浏览器可能会掉帧</p>
            <p>亲测火狐、夸克掉帧</p>
            <div @click="changShowDoodleState" class="btn">运行</div>
          </div>
          <transition name="doodle">
            <css-doodle v-if="showDoodle">
              --color: @p(#51eaea, #fffde1, #ff9d76, #FB3569); :doodle { @grid:
              30x1 / 18vmin; --deg: @p(-180deg, 180deg); } :container {
              perspective: 30vmin; } :before { content: ''; @place-cell:
              @r(100%) @r(100%); @size: @r(6px); @shape: heart; } @place-cell:
              center; @size: 100%; box-shadow: @m(2, (0 0 50px var(--color)));
              background: @m(100, ( radial-gradient(var(--color) 50%,
              transparent 0) @r(-20%, 120%) @r(-20%, 100%) / 1px 1px no-repeat
              )); will-change: transform, opacity; animation: scale-up 12s
              linear infinite; animation-delay: calc(-12s / @size() * @i());
              @keyframes scale-up { 0%, 95.01%, 100% { transform: translateZ(0)
              rotate(0); opacity: 0; } 10% { opacity: 1; } 95% { transform:
              translateZ(35vmin) rotateZ(@var(--deg)); } } }
            </css-doodle>
          </transition>
        </div>
      </div>
      <div class="fill"></div>
    </section>
  </div>
</template>

<script>
import Section from "@/components/Section";
import "css-doodle";
import Tooltip from "@/components/Tooltip";
import Button from "@/components/Button";
export default {
  components: {
    Section,
    Tooltip,
    Button,
  },
  data() {
    return {
      showDoodle: false,
    };
  },
  methods: {
    changShowDoodleState() {
      this.showDoodle = true;
    },
  },
  created() {},
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/common.scss";

.page1 {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  line-height: 1.5;

  @include light(#acdbdf, #333);
  @include dark(#28475c, #c5ced6);
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    .border {
      .frames {
        width: 100%;
        height: 100%;
        div {
          position: absolute;
        }
        div:nth-of-type(1) {
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: url(../assets/svg/border-light-x.svg) center center
            repeat-x;
        }
        div:nth-of-type(2) {
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: url(../assets/svg/border-light-y.svg) center center
            repeat-y;
          transform: rotate(180deg);
        }
        div:nth-of-type(3) {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: url(../assets/svg/border-light-x.svg) center center
            repeat-x;
          transform: rotate(180deg);
        }
        div:nth-of-type(4) {
          top: 0;
          left: 0;
          width: 20px;
          height: 100%;
          background: url(../assets/svg/border-light-y.svg) center center
            repeat-y;
        }
      }
      .corners {
        div {
          position: absolute;
          width: 100%;
          left: 0;
          height: 50px;
        }
        div:nth-of-type(1) {
          top: 0;
          &::before {
            content: "";
            position: absolute;
            width: 50px;
            height: 50px;
            background: url(../assets/svg/corners-light.svg) center center
              no-repeat;
            left: 10px;
            top: 10px;
          }
          &::after {
            content: "";
            position: absolute;
            width: 50px;
            height: 50px;
            background: url(../assets/svg/corners-light.svg);
            top: 10px;
            right: 10px;
            transform: rotateY(180deg);
          }
        }
        div:nth-of-type(2) {
          bottom: 0;
          transform: rotateX(-180deg);
          &::before {
            content: "";
            position: absolute;
            width: 50px;
            height: 50px;
            background: url(../assets/svg/corners-light.svg) center center
              no-repeat;
            left: 10px;
            top: 10px;
          }
          &::after {
            content: "";
            position: absolute;
            width: 50px;
            height: 50px;
            background: url(../assets/svg/corners-light.svg);
            top: 10px;
            right: 10px;
            transform: rotateY(180deg);
          }
        }
      }
    }
  }
  .container {
    position: absolute;
    top: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    .content {
      display: flex;
      flex-direction: column;
      max-width: 600px;
      height: 100%;
      margin: 0 auto;
      line-height: 1.5;
      .line {
        margin-bottom: 30px;
      }
      .line:nth-of-type(1) {
        margin-top: 30px;
        animation: fadeIn 0.56s cubic-bezier(0.62, 0.02, 0.34, 1) 0.5s both;
        h1 {
          font-size: 32px;
          font-weight: bold;

          @include light(transparent, #001f52);
          @include dark(transparent, #f5f5f5);
        }
        ul {
          font-size: 16px;
          padding-left: 24px;
          li {
            padding: 3px 0;
            position: relative;
            &::before {
              content: "❀";
              position: absolute;
              left: -20px;
            }
          }
        }
      }
      .line:nth-of-type(2) {
        animation: fadeIn 1.36s cubic-bezier(0.62, 0.02, 0.34, 1) 0.6s both;
        overflow: auto;
        div {
          margin-bottom: 15px;
          p {
            margin-bottom: 5px;
          }
        }
      }
      .line:nth-of-type(3) {
        animation: fadeIn 2.16s cubic-bezier(0.62, 0.02, 0.34, 1) 0.7s both;
        display: flex;
        .guidance.iconfont {
          font-size: 25px;
          margin: 0 auto;
          animation: jump 10s 2s both;
          @keyframes jump {
            0% {
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            10% {
              transform: translateY(-10px);
            }
            20% {
              transform: translateY(0px);
            }
            30% {
              transform: translateY(-10px);
            }
            40% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(0px);
            }
            70% {
              transform: translateY(-10px);
            }
            80% {
              transform: translateY(0px);
            }
            90% {
              transform: translateY(-10px);
              opacity: 1;
            }
            100% {
              transform: translateY(0px);
              opacity: 0;
            }
          }
        }
        .link {
          display: flex;
          .item {
            background: #d7eaea;
            margin-right: 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            outline: none;
            transition: 0.5s;
            &:nth-child(1):hover {
              background: #0060ca;
            }
            &:nth-child(2):hover {
              background: #f9c535;
            }
            &:nth-child(3):hover {
              background: #333;
            }
          }
        }

        .message {
          white-space: nowrap;
        }
        .iconfont {
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.page2 {
  margin-top: -100vh;
  .fill {
    height: 100vh;
  }
  .sticky {
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 100vh;
  }
  .content {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    background: #270f34;
    justify-content: center;
    align-items: center;
    .wran {
      @include light(#e8e8e8, #05004e);
      @include dark(#38486f, #e1f6f4);
      padding: 20px 30px;
      border-radius: 5px;
      p {
        margin-bottom: 15px;
      }
      .btn {
        padding: 7px 12px;
        display: inline-block;
        background: rgba(233, 0, 128, 0.6);
        border-radius: 3px;
        transition: background-color 1s;
        cursor: pointer;
        color: #fcf9ec;
        &:hover {
          background: rgba(233, 0, 128, 1);
        }
      }
    }
  }
}

.doodle-enter {
  opacity: 0;
}
.doodle-enter-active {
  transition: opacity 1s;
}

.doodle-enter-to {
  opacity: 1;
}
</style>