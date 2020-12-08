<template>
  <van-icon
    :color="isCollected ? '#ffa500' : '#777'"
    :name="isCollected ? 'star' : 'star-o'"
    @click="collectArticle"
  />
</template>

<script>
// 加载收藏与取消收藏的接口方法
import { collectArticles, cancelCollectArticles } from '@/api/article'

export default {
  name: 'collectArticleIndex',
  data () {
    return {

    }
  },
  model: {
    prop: 'isCollected',
    event: 'update-is_collected'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    // 是否收藏文章
    async collectArticle () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.isCollected) {
          // 已收藏 点击取消收藏
          await cancelCollectArticles(this.artId)
        } else {
          // 未收藏 点击收藏
          await collectArticles(this.artId)
        }
        this.$toast.success(this.isCollected ? '取消收藏成功' : '收藏成功')
        this.$emit('update-is_collected', !this.isCollected)
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
