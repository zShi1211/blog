<template>
  <div>
    <Loading :show="loading"/>
    <div class="leaveWord"  v-if="!loading">
      <Header />
      <Section>
        <div v-if="leaveWord">
          <Comment
            :comment="leaveWord"
            :addComment="addLeaveWord"
            :addChildComment="addChildLeaveWord"
            titleText="留言列表"
            successTip="留言成功"
            errorTip="留言失败"
          />
          <LoadMore :loadMore="loadMore" :isMore="isMore" />
        </div>
      </Section>
      <GoTop />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment/index";
import LoadMore from "@/components/LoadMore";
import Section from "@/components/Section";
import Header from "@/components/Header";
import {
  getLeavaWord,
  addLeavaWord,
  addChildLeavaWord,
} from "@/service/api/leaveWord";
import GoTop from "@/components/GoTop";
import Loading from "@/components/Loading";

export default {
  components: {
    Header,
    Section,
    Comment,
    LoadMore,
    GoTop,
    Loading
  },
  data() {
    return {
      loading: true,
      leaveWord: null,
      leaveWordPage: 1,
      leaveWordLimit: 5,
    };
  },
  computed: {
    isMore() {
      return this.leaveWord.count > this.leaveWord.datas.length;
    },
  },
async  created() {
await    this.getLeaveWordHandle();
this.loading = false;
  },
  methods: {
    async addLeaveWord(info) {
      const res = await addLeavaWord(info);
      if (res.code === 0) {
        this.leaveWordPage = 1;
        this.getLeaveWordHandle(true);
      }
      return res;
    },
    async addChildLeaveWord(id, info) {
      const res = await addChildLeavaWord(id, info);
      if (res.code === 0) {
        this.leaveWordPage = 1;
        this.getLeaveWordHandle(true);
      }
      return res;
    },
    loadMore() {
      this.leaveWordPage++;
      this.getLeaveWordHandle();
    },
    async getLeaveWordHandle(isRefresh = false) {
      const res = await getLeavaWord(this.leaveWordPage, this.leaveWordLimit);
      if (res.code === 0) {
        // 首次加载和评论后刷新重新赋值
        if (isRefresh || !this.leaveWord) {
          this.leaveWord = res.data;
        } else {
          // 加载更多，就后续追加
          this.leaveWord.datas.push(...res.data.datas);
        }
      }
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/common.scss";
.leaveWord {
  padding-top: 80px;
  min-height: 100vh;
  box-sizing: border-box;
  @include light(#fff, #171d20);
  @include dark(#363434, #fff);
}
</style>