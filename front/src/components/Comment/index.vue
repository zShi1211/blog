<template>
  <div>
    <CommentTextarea
      :onCancel="cancelReply"
      :replyName="replyName"
      :onSend="sendComment"
      ref="commentTextarea"
    />
    <div class="commentList">
      <p class="title">
        <span>
          {{ titleText }}
        </span>
        ( {{ comment.count }} )
      </p>
      <transition-group tag="div" name="comment">
        <CommentItem
          v-for="item in comment.datas"
          :key="item._id"
          :commentInfo="item"
          :onReply="setReply"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import CommentTextarea from "./CommentTextarea";
import message from "@/components/Message";
export default {
  components: {
    CommentItem,
    CommentTextarea,
  },
  props: {
    addComment: {
      type: Function,
    },
    addChildComment: {
      type: Function,
    },
    comment: {
      type: Object,
    },
    successTip: {
      type: String,
    },
    errorTip: {
      type: String,
    },
    titleText: {
      type: String,
      default: "评论列表",
    },
  },
  data() {
    return {
      replyName: null,
      replyId: "",
      isReplyChildComment: false,
      scrollClear: null,
    };
  },
  methods: {
    // 取消回复, 给输入框的
    cancelReply() {
      this.replyName = null;
      this.replyId = "";
      this.isReplyChildComment = false;
    },
    // 设置回复，给评论列表的
    setReply(info) {
      this.replyName = info.to;
      this.replyId = info.id;
      this.isReplyChildComment = info.isReplyChildComment;
      // 让滚动条滚动到文本框，并得到一个清理函数
      this.scrollClear = this.$scroll2El(this.$refs.commentTextarea);
    },
    async sendComment(info) {
      let res;
      if (this.replyId === "") {
        // 添加 一条评论
        res = await this.addComment({
          ...this.userInfo,
          ...info,
        });
      } else {
        // 回复一条评论
        // 如果添加的子评论是来自回复一条子评论，就要加上回复的姓名
        res = await this.addChildComment(this.replyId, {
          to: this.isReplyChildComment ? this.replyName : null,
          from: {
            avatar: info.avatar,
            nickName: info.nickName,
          },
          content: info.content,
        });
      }
      // 评论成功后，清空上次评论的信息
      if (res.code === 0) {
        message("success", this.successTip);
        this.cancelReply();
      } else {
        message("error", this.errorTip);
      }
      return res;
    },
  },
  destroyed() {
    if (this.scrollClear) {
      this.scrollClear();
    }
  },
};
</script>

<style lang='scss' scoped>
.commentList {
  margin: 20px 0;
  .title {
    font-style: oblique;
    font-size: 24px;
    padding: 10px 0;
    span {
      text-decoration: underline;
    }
  }
}
.comment-enter,
.comment-leave-to {
  opacity: 0;
}

.comment-enter-active,
.comment-leave-active {
  transition: opacity 1s;
}

.comment-enter-to,
.comment-leave {
  opacity: 1;
}
</style>