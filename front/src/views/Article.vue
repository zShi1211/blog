<template>
  <div>
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
  </div>
</template>

<script>
import Section from "@/components/Section";
import { getManyArticle } from "@/service/api/article";
import Header from "@/components/Header";
import ArticleItem from "@/components/ArticleItem";
import LoadMore from "@/components/LoadMore";
export default {
  data() {
    return {
      articleList: null,
      condition: {
        page: 1,
        limit: 5,
      },
    };
  },
  async created() {
    const res = await getManyArticle(this.condition.page, this.condition.limit);
    if (res.code === 0) {
      this.articleList = res.data;
    }
  },
  components: {
    Section,
    Header,
    ArticleItem,
    LoadMore,
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

<style>
.articleList {
  padding-top: 60px;
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