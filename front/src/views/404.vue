<template>
  <div>
    <div class="notFound">
      <Section>
        <div class="container">
          <img :src="notFoundImg" alt="" />
          <div class="centent">
            <p>你好像迷路了</p>
            <p>跟我<router-link to="/" replace>回家</router-link>吧</p>
          </div>
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
import Section from "@/components/Section";
import notFoundImg from "@/assets/img/404.png";
export default {
  components: {
    Section,
  },
  data() {
    return {
      notFoundImg,
    };
  },
};
</script>

<style lang='scss' scoped>
.container {
  max-width: 600px;
  margin: 50px auto 0;
  img{
      width: 100%;
  }
}
.centent {
  margin-top: 20px;
  color: #999;
  font-style: oblique;
  line-height: 1.5;
  a {
    color: #0088cc;
    text-decoration: underline;
  }
}
</style>