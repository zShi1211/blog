<template>
  <div>
    <Header />
    <Section>
      <div class="container">
        <div class="picture">
          <img :src="articleInfo.picture" alt="" />
        </div>
        <div>
          <div class="title">
            {{ articleInfo.title }}
          </div>
          <div class="info">
            <div class="date">
              {{ date }}
            </div>
            <div class="word">
              <span>文字</span>
              <span>
                {{ articleInfo.words }}
              </span>
            </div>
            <div class="read">
              <span>阅读</span>
              <span>
                {{ articleInfo.read }}
              </span>
            </div>
            <div class="like">
              <span>喜欢</span>
              <span>
                {{ articleInfo.like }}
              </span>
            </div>
          </div>
        </div>
        <div class="content">
          <ArticleContent :content="articleInfo.contentHtml" />
        </div>
        <div v-if="comment">
          <Comment
            :comment="comment"
            :addComment="addCommentHandle"
            :addChildComment="addChildCommentHandle"
            titleText="评论列表"
            successTip="评论成功"
            errorTip="评论失败"
          />
          <LoadMore :loadMore="loadMore" :isMore="isMore" />
        </div>
      </div>
    </Section>
    <GoTop />
  </div>
</template>

<script>
import Header from "@/components/Header";
import {
  getOneArticle,
  getComment,
  addComment,
  addChildComment,
} from "@/service/api/article";
import Section from "@/components/Section";
import LoadMore from "@/components/LoadMore";
import ArticleContent from "@/components/ArticleContent";
import dateFormat from "@/utils/dateFormat";
import Comment from "@/components/Comment/index";
import GoTop from "@/components/GoTop";

export default {
  components: {
    Header,
    Section,
    ArticleContent,
    Comment,
    LoadMore,
    GoTop,
  },
  data() {
    return {
      articleInfo: {},
      comment: null,
      commentPage: 1,
      commentLimit: 5,
    };
  },
  async created() {
    // 获取文章
    const res = await getOneArticle(this.$route.params.id);
    if (res.code === 0) {
      this.articleInfo = res.data;
    }
    this.getCommentHanle();
  },
  computed: {
    date() {
      return dateFormat(new Date(this.articleInfo.time));
    },
    isMore() {
      return this.comment.count > this.comment.datas.length;
    },
  },
  methods: {
    async addCommentHandle(info) {
      const res = await addComment(this.$route.params.id, info);
      if (res.code === 0) {
        // 评论成功后切换到第一页，并重新获取评论
        this.commentPage = 1;
        this.getCommentHanle(true);
      }
      // 将结果返回，后续需要
      return res;
    },
    async addChildCommentHandle(id, info) {
      const res = await addChildComment(id, info);
      if (res.code === 0) {
        // 评论成功后切换到第一页，并重新获取评论
        this.commentPage = 1;
        this.getCommentHanle(true);
      }
      return res;
    },
    // 加载更多
    async loadMore() {
      this.commentPage++;
      this.getCommentHanle();
    },
    // 获取文章评论
    async getCommentHanle(isRefresh = false) {
      const commentRes = await getComment(this.$route.params.id, {
        page: this.commentPage,
        limit: this.commentLimit,
      });
      if (commentRes.code === 0) {
        // 首次加载和评论后刷新重新赋值
        if (isRefresh || !this.comment) {
          this.comment = commentRes.data;
        } else {
          // 加载更多，就后续追加
          this.comment.datas.push(...commentRes.data.datas);
        }
      }
    },
  },
};
</script>

<style scoped  lang='scss'>
.container {
  margin: 60px auto 0;
  .picture {
    img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }
  }
  .title {
    font-size: 26px;
    padding: 20px 0;
  }
  .info {
    display: flex;
    font-size: 14px;
    color: #999;
    div {
      margin-right: 10px;
    }
  }

  .content {
    padding: 20px 0;
    color: #555;
    font-size: 17px;
    line-height: 1.5;
  }
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