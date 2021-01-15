<template>
  <div class="articleItem">
    <router-link
      :to="{ name: 'articleDetail', params: { id: articleInfo._id } }"
      class="picture"
      tag="div"
    >
      <img v-lazy:100="articleInfo.picture" src="@/assets/img/1.png" alt="" />
    </router-link>
    <div class="content">
      <router-link
        class="title"
        :to="{ name: 'articleDetail', params: { id: articleInfo._id } }"
      >
        {{ articleInfo.title }}
      </router-link>
      <div class="info">
        <div class="time">
          <span>
            {{ date }}
          </span>
        </div>
        <div class="word">
          <i class="iconfont icon-ziti"></i>
          <span>
            {{ articleInfo.words }}
          </span>
        </div>
        <div class="read">
          <i class="iconfont icon-yanjing1"></i>
          <span>
            {{ articleInfo.read }}
          </span>
        </div>
        <div class="like">
          <i class="iconfont icon-aixin"></i>
          <span>
            {{ articleInfo.like }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "@/utils/dateFormat";
export default {
  props: {
    articleInfo: {
      type: Object,
    },
  },
  computed: {
    date() {
      return dateFormat(new Date(this.articleInfo.time));
    },
  },
};
</script>

<style scoped lang="scss">
.articleItem {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  .picture {
    position: relative;
    width: 600px;
    height: 370px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    position: relative;
    flex: 1 0 auto;
    height: 300px;
    border: 2px dotted #bbb;
    border-radius: 5px;
    padding: 0 10px 0 40px;
    left: -30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 24px;
      cursor: pointer;
      margin: auto;
      &:hover {
        text-decoration: underline;
      }
    }

    .info {
      display: flex;
      justify-content: baseline;
      color: #bbb;
      div {
        padding: 4px;
      }
      .time {
        margin-right: auto;
        vertical-align: -4px;
      }
      font-size: 12px;
    }
  }
}
.articleItem:nth-of-type(2n) {
  .picture {
    order: 1;
  }
  .content {
    padding: 0 40px 0 10px;
    left: 30px;
  }
}

@media (max-width: 992px) {
  .articleItem {
    .picture {
      width: 420px;
      height: 280px;
    }
    .content {
      height: 200px;
    }
  }
}
@media (max-width: 768px) {
  .articleItem {
    display: block;
    .picture {
      width: 100%;
      height: 300px;
      border-radius: 5px 5px 0 0;
    }
    .content {
      height: 100px;
      margin: 0;
      position: relative;
      padding: 0 10px;
      left: 0;
      top: -10px;
    }
  }
  .articleItem:nth-of-type(2n) {
    .picture {
      order: 1;
    }
    .content {
      left: 0;
      padding: 0 10px;
    }
  }
}

@media (max-width: 576px) {
  .articleItem {
    .picture {
      width: 100%;
      height: 230px;
    }
  }
}
</style>