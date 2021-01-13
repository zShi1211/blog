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
    th,
    td {
      border: 1px solid #0088cc;
      padding: 10px;
    }
    thead {
      background: #0088cc88;
    }
    tbody {
      tr:nth-of-type(2n) {
        background: rgba(221, 221, 221, 0.253);
      }
      tr:hover {
        background: #0088cc1a;
      }
    }
  }
}
</style>