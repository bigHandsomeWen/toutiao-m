<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="commentText"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!commentText.length"
      @click="issueComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { publishComment } from '@/api/comments'

export default {
  name: 'CommentPost',
  data () {
    return {
      // 评论的内容
      commentText: ''
    }
  },
  props: {
    list: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      default: null
    }
  },
  methods: {
    // 发布评论
    async issueComment () {
      this.$toast.loading({
        message: '发布中...',
        // 禁止背景点击
        forbidClick: true,
        duration: 0
      })
      try {
        // 调接口
        const { data: res } = await publishComment({
          target: this.list.toString(),
          content: this.commentText,
          art_id: this.art_id ? this.art_id.toString() : this.art_id
        })
        // console.log(res)
        this.$emit('addComment', res.data.new_obj)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败')
      }
      // 清空文本框
      this.commentText = ''
    }
  }
}
</script>
<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
