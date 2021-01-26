<template>
  <div>
    <Loading :show="loading" />
    <div class="articleDetail"  v-if="!loading">
      <Header :showLike="true" :isLike="isLike" :changeLike="addLike" />
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
  </div>
</template>

<script>
import Header from "@/components/Header";
import {
  getOneArticle,
  getComment,
  addComment,
  addChildComment,
  updateArticleInfo,
} from "@/service/api/article";
import Section from "@/components/Section";
import LoadMore from "@/components/LoadMore";
import ArticleContent from "@/components/ArticleContent";
import dateFormat from "@/utils/dateFormat";
import Comment from "@/components/Comment/index";
import GoTop from "@/components/GoTop";
import Loading from "@/components/Loading";

export default {
  components: {
    Header,
    Section,
    ArticleContent,
    Comment,
    LoadMore,
    GoTop,
    Loading,
  },
  data() {
    return {
      loading: true,
      articleInfo: {},
      comment: null,
      commentPage: 1,
      commentLimit: 5,
      likes: [],
    };
  },
  async created() {
    // 获取文章
    const res = await getOneArticle(this.$route.params.id);
    if (res.code === 0) {
      this.articleInfo = res.data;
    }
    // 设置网页title
    document.title = this.articleInfo.title;
    // 取消loading
    this.loading = false;
    // 阅读+1
    await updateArticleInfo(this.$route.params.id, "read");
    // 获取likes
    const likes = JSON.parse(window.localStorage.getItem("likes"));
    // 如果不存在初始化空数组
    if (!likes) {
      window.localStorage.setItem("likes", JSON.stringify([]));
      this.likes = [];
    } else {
      this.likes = likes;
    }
    // 获取评论
    this.getCommentHanle();
  },
  computed: {
    date() {
      return dateFormat(new Date(this.articleInfo.time));
    },
    isMore() {
      return this.comment.count > this.comment.datas.length;
    },
    isLike() {
      return this.likes.includes(this.$route.params.id);
    },
  },
  methods: {
    async addLike() {
      if (this.isLike) return;
      const likes = JSON.parse(window.localStorage.getItem("likes"));
      likes.push(this.$route.params.id);
      window.localStorage.setItem("likes", JSON.stringify(likes));
      this.likes = likes;
      await updateArticleInfo(this.$route.params.id, "like");
    },
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
@import "@/assets/css/common.scss";

.articleDetail {
  padding-top: 60px;

  min-height: 100vh;
  box-sizing: border-box;
  @include light(#fff, #171d20);
  @include dark(#363434, #fff);
}
.container {
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
    @include light(transparent, #555);
    @include dark(transparent, #c5ced6);
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