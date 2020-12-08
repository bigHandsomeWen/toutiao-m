<template>
  <van-icon
    :color="attitude === -1 ? '#777' : '#e5645f'"
    :name="attitude === -1 ? 'good-job-o' : 'good-job'"
    @click="like_article"
  />
</template>

<script>
// 加载点赞与取消点赞的接口方法
import { likeArticle, cancelLikeArticle } from '@/api/article'

export default {
  name: 'LikeArticleIndex',
  model: {
    prop: 'attitude',
    event: 'update-attitude'
  },
  props: {
    attitude: {
      type: Number,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async like_article () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.attitude === -1) {
          // 未点赞 点击点赞
          await likeArticle(this.artId)
        } else {
          // 已点赞 点击取消点赞
          await cancelLikeArticle(this.artId)
        }
        this.$emit('update-attitude', this.attitude === -1 ? 1 : -1)
        this.$toast.success(this.attitude === -1 ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
