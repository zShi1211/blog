<template>
  <div>
    <Header />
    <Section>
      <div class="leaveWord" v-if="leaveWord">
        <Comment
          :comment="leaveWord"
          :addComment="addLeaveWord"
          :addChildComment="addChildLeaveWord"
          titleText="留言列表"
        />
        <LoadMore :loadMore="loadMore" :isMore="isMore" />
      </div>
    </Section>
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
export default {
  components: {
    Header,
    Section,
    Comment,
    LoadMore,
  },
  data() {
    return {
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
  created() {
    this.getLeaveWordHandle();
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
        console.log(!this.leaveWord);
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
.leaveWord {
  margin-top: 80px;
}
@media (max-width: 768px) {
  .leaveWord {
    padding: 0 10px;
  }
}
</style>