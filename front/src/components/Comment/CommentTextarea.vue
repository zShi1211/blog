<template>
  <div class="commentWrapper">
    <div class="comment">
      <div class="top">
        <p class="nickName">
          <input type="text" v-model.trim.lazy="nickName" placeholder="昵称" />
        </p>
        <p class="cancelReply" v-if="replyName">
          <Button :onClick="onCancel">取消回复</Button>
        </p>
      </div>
      <div class="middle">
        <textarea
          rows="10"
          v-model.trim="commentContent"
          :placeholder="replyPlaceholder"
        ></textarea>
        <img src="@/assets/img/greeting.png" alt="" class="greeting" />
      </div>
      <div class="bottom">
        <button class="send" @click="sendHandle">发送</button>
        <p class="errorMessage" v-if="errorMessage">
          <i class="iconfont icon-quxiao"></i>
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import { mapState, mapActions } from "vuex";
import randomAvatar from "@/utils/randomAvatar";

export default {
  components: {
    Button,
  },
  props: {
    replyName: {
      type: String,
      default: "",
    },
    onCancel: {
      type: Function,
    },
    onSend: {
      type: Function,
    },
  },
  data() {
    return {
      errorMessage: "",
      commentContent: "",
    };
  },
  created() {
    // 获取当前用户的信息，存在localStorage
    this.getUserInfoAction();
    if (!this.userInfo.avatar) {
      // 初始化头像
      const avatar = randomAvatar();
      this.$store.dispatch("setUserInfoAction", {
        avatar,
      });
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    nickName: {
      get() {
        return this.$store.state.userInfo.nickName;
      },
      set(val) {
        // 更改昵称会映射存储到本地
        this.$store.dispatch("setUserInfoAction", {
          nickName: val,
        });
      },
    },
    replyPlaceholder() {
      if (!this.replyName) {
        return "说点什么呗...";
      } else {
        return `回复: ${this.replyName}`;
      }
    },
  },
  methods: {
    ...mapActions(["setUserInfoAction", "getUserInfoAction"]),
    async sendHandle() {
      if (this.nickName === "") {
        this.errorMessage = "你的名字是第一印象哦~";
        return;
      } else if (this.commentContent === "") {
        this.errorMessage = "悄咪咪告诉我你作文是不是0分~";
        return;
      }
      this.errorMessage = "";
      // 得到评论的结果
      const res = await this.onSend({
        ...this.userInfo,
        content: this.commentContent,
      });
      // 评论成功后清空文本框内容
      if (res.code === 0) {
        this.commentContent = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";

.commentWrapper {
  border: 1px solid #393e46;
  border-radius: 10px;
  padding: 20px;
  margin: 40px 0;
  .top {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .nickName {
      input {
        border: none;
        padding: 10px 0;
        outline: none;
        border-bottom: 1px dotted rgba(204, 204, 204, 0.3);
        padding: 3px 2px;
        width: 100%;
        background: transparent;
        box-sizing: border-box;
        @include light(null, #171d20);
        @include dark(null, #fff);
        &::placeholder {
          color: #ccc;
          font-size: 14px;
        }
        &:focus {
          border-color: #ccc;
        }
      }
      max-width: 500px;
      flex-grow: 1;
    }
    .cancelReply {
      background: #df1d57;
      border-radius: 3px;
      flex-shrink: 0;
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
    }
  }
  .middle {
    position: relative;
    margin-bottom: 10px;
    textarea {
      border: none;
      border: 1px dotted rgba(204, 204, 204, 0.3);
      border-radius: 4px;
      background: transparent;
      padding: 3px 2px;
      outline: none;
      width: 100%;
      @include light(transparent, #171d20);
      @include dark(transparent, #fff);
      font-family: "Constom", "Hiragino Sans GB", "Hiragino Sans GB W3",
        "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
      resize: vertical;
      &::placeholder {
        color: #ccc;
        font-size: 14px;
      }
      &:focus {
        border-color: #ccc;
      }
    }
    .greeting {
      position: absolute;
      width: 140px;
      right: 10px;
      bottom: 0px;
      transform: translateY(28px);
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    button {
      background: #0084ffdc;
      cursor: pointer;
      padding: 7px 25px;
      border-radius: 3px;
      transition: 0.7s;
      color: #eee;
      outline: none;
      border: none;
      user-select: none;
      &:hover {
        background: #0084ff;
        color: #fff;
      }
    }
    .errorMessage {
      color: #df1d57;
      margin-left: 10px;
      font-size: 12px;
      .iconfont {
        vertical-align: -2px;
      }
    }
  }
}
</style>