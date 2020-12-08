<template>
  <van-button
    type="info"
    color="#3296fa"
    round
    :loading="isFollowedLoading"
    size="small"
    icon="plus"
    v-if="!isFollowed"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    :loading="isFollowedLoading"
    size="small"
    v-else
    @click="onFollow"
    >已关注</van-button
  >
</template>

<script>
// 加载关注与取消关注的接口方法
import { focusUser, cancelFocusUser } from '@/api/user'

export default {
  name: 'FollowUserIndex',
  data () {
    return {
      // 关注按钮加载中
      isFollowedLoading: false
    }
  },
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    // 是否关注用户
    async onFollow () {
      this.isFollowedLoading = true
      try {
        if (this.isFollowed) {
          // 已关注 点击取消关注
          await cancelFocusUser(this.autId)
        } else {
          // 未关注 点击关注
          await focusUser(this.autId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请稍后重试'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.isFollowedLoading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
