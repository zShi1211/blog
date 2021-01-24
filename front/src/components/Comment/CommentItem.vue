<template>
  <div class="commentWrapper">
    <div class="comment">
      <div class="top">
        <div class="avatar">
          <img :src="commentInfo.avatar" alt="" />
        </div>
        <div class="info">
          <div class="left">
            <div>
              <span class="nickName">
                {{ commentInfo.nickName }}
              </span>
              <span class="admin" v-if="commentInfo.isAdmin">我</span>
            </div>
            <div class="time">
              {{ date(commentInfo.time) }}
            </div>
          </div>
          <div class="right">
            <span
              class="reply"
              @click="replyHandle(commentInfo, false, commentInfo)"
              >回复</span
            >
            <span class="time">
              {{ date(commentInfo.time) }}
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        {{ commentInfo.content }}
      </div>
    </div>
    <div
      class="childComment"
      v-for="item in commentInfo.childComment"
      :key="item.id"
    >
      <div class="top">
        <div class="avatar">
          <img :src="item.from.avatar" alt="" />
        </div>
        <div class="info">
          <div class="left">
            <div>
              <span class="nickName">
                {{ item.from.nickName }}
              </span>
              <span class="admin" v-if="item.from.isAdmin">我</span>
              <template v-if="item.to">
                <span class="replyText">回复</span>
                <span class="nickName"> {{ item.to }} </span>
              </template>
            </div>
            <div class="time">
              {{ date(item.time) }}
            </div>
          </div>
          <div class="right">
            <span class="reply" @click="replyHandle(commentInfo, true, item)"
              >回复</span
            >
            <span class="time">
              {{ date(item.time) }}
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "@/utils/dateFormat";
export default {
  props: {
    commentInfo: {
      type: Object,
    },
    onReply: {
      type: Function,
    },
  },
  methods: {
    date(time) {
      const date = new Date(time);
      return `${date.getHours()}:${date.getMinutes()}  ${dateFormat(date)}`;
    },
    replyHandle(info, isReplyChildComment, childInfo) {
      this.onReply &&
        this.onReply({
          id: info._id,
          to: isReplyChildComment ? childInfo.from.nickName : info.nickName,
          isReplyChildComment,
        });
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/common.scss";
.commentWrapper {
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  padding: 15px 0px;
  color: #999;
  .comment {
    &:hover {
      .info {
        .right {
          .reply {
            opacity: 1;
          }
        }
      }
    }
  }
  .childComment {
    margin: 10px 0 0 50px;
    .info {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        border-top: 1px solid rgba(204, 204, 204, 0.3);
        top: -13px;
        left: 0;
      }
      .replyText {
        font-size: 12px;
        padding: 0 2px;
        color: #aaa;
      }
    }
    &:hover {
      .info {
        .right {
          .reply {
            opacity: 1;
          }
        }
      }
    }
  }
  .top {
    display: flex;
    align-items: center;
    .info {
      display: flex;
      flex: 1 0 auto;
      .left {
        margin-right: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .time {
          display: none;
        }
        .nickName {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .admin {
          background: #0088cc;
          padding: 2px 9px;
          border-radius: 0 16px 0;
          font-size: 10px;
          color: #fff;
        }
      }
      .right {
        font-size: 13px;
        .reply {
          opacity: 0;
          transition: opacity 0.4s;
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            @include light(transparent, #777);
            @include dark(transparent, #ccc);
          }
        }
      }
    }
  }
  .content {
    margin-left: 50px;
    font-size: 14px;
    @include light(transparent, #555);
    @include dark(transparent, #bbb);
    padding-top: 5px;
    word-break: break-word;
    white-space: pre-line;
    line-height: 1.5;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
@media (max-width: 768px) {
  .commentWrapper {
    .top {
      .info {
        .right {
          .reply {
            opacity: 1;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .commentWrapper {
    .top {
      align-items: stretch;
      .info {
        &::before {
          top: -6px;
        }
        .nickName {
          font-size: 14px;
        }
        .left {
          .time {
            display: block;
            font-size: 11px;
          }
        }
        .right {
          .reply {
            opacity: 1;
          }
          .time {
            display: none;
          }
        }
      }
    }
  }
}
</style>