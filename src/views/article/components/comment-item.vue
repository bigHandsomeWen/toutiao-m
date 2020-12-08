<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentsInfo.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentsInfo.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="commentsInfo.is_liking ? 'active' : ''"
        :icon="commentsInfo.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="give_like"
        >{{
          commentsInfo.like_count ? commentsInfo.like_count : "赞"
        }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentsInfo.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentsInfo.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-show', commentsInfo)"
          >回复 {{ commentsInfo.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { giveLike, cancelGiveLike } from '@/api/comments'

export default {
  name: 'CommentItemIndex',
  data () {
    return {
      commentLoading: false
    }
  },
  props: {
    commentsInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    async give_like () {
      this.commentLoading = true
      try {
        if (this.commentsInfo.is_liking) {
          // 已点赞 点击取消点赞
          await cancelGiveLike(this.commentsInfo.com_id)
          this.commentsInfo.like_count--
        } else {
          // 未点赞 点击点赞
          await giveLike(this.commentsInfo.com_id)
          this.commentsInfo.like_count++
        }
        this.commentsInfo.is_liking = !this.commentsInfo.is_liking
      } catch (error) {

      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .active {
    color: #ffa500;
  }
}
</style>
