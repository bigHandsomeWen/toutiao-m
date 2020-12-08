<template>
  <div class="reply_container">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        commentInfo.reply_count <= 0
          ? '暂无回复'
          : `${commentInfo.reply_count}条回复`
      "
    />
    <div></div>
    <div class="scroll_wrap">
      <!-- 当前点击的评论 -->
      <comment-item :commentsInfo="commentInfo" />

      <!-- 全部评论 -->
      <van-cell title="全部评论" />
      <comment-list
        :source="commentInfo.com_id"
        type="c"
        @reply-show="replyComment"
        :commentslist="commentslist"
      />
    </div>

    <!-- 发布评论 -->
    <div class="post_warp">
      <van-button type="default" round @click="isShowReplyPopup = true"
        >写评论</van-button
      >
    </div>

    <!-- 发布评论的弹出层 -->
    <van-popup v-model="isShowReplyPopup" position="bottom">
      <comment-post
        :list="commentInfo.com_id"
        :art_id="articleList.art_id"
        @addComment="addComment"
      />
    </van-popup>
  </div>
</template>

<script>
// 加载文章评论项组件
import commentItem from './comment-item'
// 加载文章评论列表组件
import commentList from './comment-list'
// 加载发布评论的组件
import commentPost from './comment-post'
// 加载发布评论回复的接口方法
// import { publishComment } from '/@/api/comments'

export default {
  name: 'CommentReply',
  data () {
    return {
      isShowReplyPopup: false,
      commentslist: []
    }
  },
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    commentInfo: {
      type: Object,
      required: true
    },
    articleList: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async replyComment () {
      try {
        /* const {data: res} = await publishComment({

        }) */
      } catch (error) {
        this.$toast.fail('发布评论回复失败')
      }
    },
    addComment (val) {
      // 关闭弹出层
      this.isShowReplyPopup = false
      // 评论条数加一
      this.commentInfo.reply_count++
      // 渲染到页面最前方
      this.commentslist.unshift(val)
    }
  }
}
</script>
<style lang='less' scoped>
.reply_container {
  .van-nav-bar {
    background-color: #fff !important;
    /deep/ .van-nav-bar__title {
      color: #000000 !important;
    }
  }
  .post_warp {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    border: 1px solid #dddddd;
    background-color: #fff;
    .van-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 70px;
    }
  }
  .scroll_wrap {
    position: fixed;
    top: calc(10% + 92px);
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
}
</style>
