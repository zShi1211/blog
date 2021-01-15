<template>
  <div>
    <Header />
    <Section>
      <div class="debrisWord" v-if="debrisWord">
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
      </div>
      <GoTop />
    </Section>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Section from "@/components/Section";
import LoadMore from "@/components/LoadMore";
import GoTop from "@/components/GoTop";
import { getManyDebrisWord } from "@/service/api/debrisWord";
import dateFormat from "@/utils/dateFormat";
export default {
  components: {
    Header,
    LoadMore,
    Section,
    GoTop,
  },
  data() {
    return {
      debrisWord: null,
      page: 1,
      limit: 5,
    };
  },
  computed: {
    isMore() {
      return this.debrisWord.count > this.debrisWord.datas.length;
    },
  },
  async created() {
    this.getManyDebrisWordHandle();
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
.debrisWord {
  margin-top: 70px;
  line-height: 1.5;
}
.debrisWordItem {
  background: rgba(235, 171, 171, 0.322);
  padding: 15px 25px;
  margin-bottom: 20px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 3px 0 rgba(0, 136, 204, 0.561);
  }
}

.content {
  padding: 10px 0;
  color: #444;
  word-break: break-word;
  white-space: pre-line;
}
.time {
  color: #999;
  font-size: 12px;
  text-align: right;
}
</style>