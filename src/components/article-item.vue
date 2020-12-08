<template>
  <van-cell class="article_cell" :to="`article/${article.art_id}`">
    <div slot="title" class="article_title">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="th_image">
        <div
          v-for="(item, index) in article.cover.images"
          :key="index"
          class="label_image"
        >
          <van-image :src="item" />
        </div>
      </div>
      <span>{{ article.aut_name }}</span>
      <span class="comment">{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>
    <van-image
      slot="default"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
      class="fir_image"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
.article_cell {
  .article_title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  span {
    font-size: 24px;
    color: #b4b4b4;
  }
  .comment {
    margin: 0 25px;
  }
  .th_image {
    display: flex;
    padding: 30px 0;
    .label_image {
      flex: 1;
      height: 147px;
      &:not(last-child) {
        padding-right: 4px;
      }
      .van-image {
        height: 100%;
      }
    }
  }
  .fir_image {
    width: 234px;
    height: 148px;
  }
}
</style>
