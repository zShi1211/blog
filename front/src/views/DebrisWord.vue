<template>
  <div>
    <Loading :show="loading"/>
    <div class="debrisWord"  v-if="!loading">
      <Header />
      <Section>
        <div v-if="debrisWord">
          <div
            class="debrisWordItem"
            v-for="item in debrisWord.datas"
            :key="item._id"
          >
            <div class="content">
              {{ item.content }}
            </div>
            <p class="time">
              {{ dateFormat(item.time) }}
            </p>
          </div>
          <LoadMore :loadMore="loadMore" :isMore="isMore" />
          <GoTop />
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Section from "@/components/Section";
import LoadMore from "@/components/LoadMore";
import GoTop from "@/components/GoTop";
import { getManyDebrisWord } from "@/service/api/debrisWord";
import dateFormat from "@/utils/dateFormat";
import Loading from "@/components/Loading";
export default {
  components: {
    Header,
    LoadMore,
    Section,
    Loading,
    GoTop,
  },
  data() {
    return {
      debrisWord: null,
      page: 1,
      limit: 8,
      loading: true
    };
  },
  computed: {
    isMore() {
      return this.debrisWord.count > this.debrisWord.datas.length;
    },
  },
  async created() {
 await   this.getManyDebrisWordHandle();
 this.loading = false;
  },
  methods: {
    loadMore() {
      this.page++;
      this.getManyDebrisWordHandle();
    },
    async getManyDebrisWordHandle() {
      const res = await getManyDebrisWord(this.page, this.limit);
      // 首次加载
      if (!this.debrisWord) {
        this.debrisWord = res.data;
      } else {
        this.debrisWord.datas.push(...res.data.datas);
      }
    },
    dateFormat(date) {
      return dateFormat(new Date(date));
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/assets/css/common.scss";
.debrisWord {
  padding-top: 70px;
  min-height: 100vh;
  box-sizing: border-box;
  line-height: 1.5;
  @include light(#c9eff9, #00334e);
  @include dark(#145374, #ccc);
}
.debrisWordItem {
  @include light(#f1fafb, inherit);
  @include dark(#5588a3, inherit);
  padding: 15px 25px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.content {
  padding: 10px 0;
  word-break: break-word;
  white-space: pre-line;
}
.time {
  color: #b1bed5;
  font-size: 12px;
  text-align: right;
}
</style>