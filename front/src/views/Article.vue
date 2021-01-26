<template>
  <div >
    <Loading :show="loading"/>
    <div class="article" v-if="!loading">
    <Header></Header>
    <div class="articleList" v-if="articleList">
      <Section>
        <transition-group name="article" tag="div" appear>
          <ArticleItem
            v-for="item in articleList.datas"
            :key="item._id"
            :articleInfo="item"
          />
        </transition-group>
        <LoadMore :loadMore="loadMore" :isMore="isMore" />
      </Section>
    </div>
    <GoTop />
    </div>
  </div>
</template>

<script>
import Section from "@/components/Section";
import { getManyArticle } from "@/service/api/article";
import Header from "@/components/Header";
import ArticleItem from "@/components/ArticleItem";
import LoadMore from "@/components/LoadMore";
import GoTop from "@/components/GoTop";
import Loading from "@/components/Loading";
import defaultImg from "@/assets/img/default.png";
export default {
  data() {
    return {
      loading: true,
      articleList: null,
      condition: {
        page: 1,
        limit: 3,
      },
    };
  },
  async created() {
    const res = await getManyArticle(this.condition.page, this.condition.limit);
    if (res.code === 0) {
      this.articleList = res.data;
    }
    //当获取到文章并且默认图片加载完成，就取消loading
    const img = new Image();
    img.src = defaultImg;
    img.onload = () => {
      this.loading = false;
    };
  },
  components: {
    Section,
    Header,
    ArticleItem,
    LoadMore,
    GoTop,
    Loading
  },
  computed: {
    isMore() {
      return this.articleList.count > this.articleList.datas.length;
    },
  },
  methods: {
    async loadMore() {
      this.condition.page++;
      const res = await getManyArticle(
        this.condition.page,
        this.condition.limit
      );
      if (res.code === 0) {
        this.articleList.datas.push(...res.data.datas);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/assets/css/common.scss";

.article {
  @include light(#fff, #171d20);
  @include dark(#363434, #fff);
}

.articleList {
  padding-top: 60px;
  min-height: 100vh;
  box-sizing: border-box;
}
.article-enter {
  opacity: 0;
}
.article-enter-active {
  transition: 0.6s;
}
.article-enter-to {
  opacity: 1;
}
</style>