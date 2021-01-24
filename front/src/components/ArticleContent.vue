<template>
  <div class="articleContent" v-html="content"></div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
.articleContent {
  word-break: break-word;
  p {
    margin: 10px 0;
  }
  img {
    max-height: 300px;
    max-width: 100%;
    object-fit: contain;
  }
  iframe {
    width: 100%;
    height: 600px;
  }
  @media (max-width: 992px) {
    iframe {
      height: 400px;
    }
  }
  @media (max-width: 768px) {
    iframe {
      height: 300px;
    }
  }
  @media (max-width: 576px) {
    iframe {
      height: 250px;
    }
  }
  table {
    width: 100%;
    @include light(#f5f5f5, inherit);
    @include dark(#434343, inherit);
    th,
    td {
      border: 1px solid #999;
      padding: 10px;
      vertical-align: middle;
    }
    thead {
      @include light(#d6e6f2, inherit);
      @include dark(#4c6983, inherit);
    }
    tbody {
      tr:nth-of-type(2n) {
        @include light(#d6e6f22a, inherit);
        @include dark(#d1e9ea27, inherit);
      }
    }
  }
}
</style>