<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="!isLoading">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTime }}
          </div>

          <!-- 是否关注用户的组件 -->
          <follow-user
            class="follow-btn"
            v-model="articleList.is_followed"
            :autId="articleList.aut_id"
          ></follow-user>
        </van-cell>

        <!-- 文章内容 -->
        <div
          ref="article-content"
          class="article-content markdown-body"
          v-html="articleList.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <comment-list
          :source="articleList.art_id"
          @totalQuantity="total = $event"
          :commentslist="commentslist"
          @reply-show="replyShow"
        />
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showCommentPopup = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="total" color="#777" />

      <!-- 收藏文章 -->
      <collect-article
        v-if="articleList"
        v-model="articleList.is_collected"
        :artId="articleList.art_id"
      />

      <!-- 点赞 -->
      <like-article
        v-if="articleList"
        v-model="articleList.attitude"
        :artId="articleList.art_id"
      />

      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 写评论的弹出层 -->
    <van-popup
      v-model="showCommentPopup"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <!-- 评论组件 -->
      <comment-post
        v-if="articleList"
        :list="articleList.art_id"
        @addComment="AddComment"
      />
    </van-popup>

    <!-- 评论回复的弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '90%' }"
    >
      <comment-reply
        :commentInfo="commentInfo"
        :articleList="articleList"
        v-if="isReplyShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetails } from '@/api/article'
import { ImagePreview } from 'vant'
// 加载关注用户的组件
import followUser from '@/components/follow-user'
// 加载收藏文章的组件
import collectArticle from '@/components/collect-article'
// 加载点赞的组件
import likeArticle from '@/components/like-article'
// 加载文章评论的组件
import commentList from './components/comment-list'
// 加载评论文章的组件
import commentPost from './components/comment-post'
// 加载评论回复的组件
import commentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  created () {
    this.getArticleList()
  },
  data () {
    return {
      articleList: null,
      // 加载中
      isLoading: true,
      // 加载失败的状态码
      errorStatus: 0,
      // 评论总数量
      total: 0,
      // 控制弹出层的开关
      showCommentPopup: false,
      // 评论列表
      commentslist: [],
      // 控制评论回复弹出层的开关
      isReplyShow: false,
      // 评论项的数据
      commentInfo: {}
    }
  },
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost,
    commentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  mounted () {
    this.previewImage()
  },
  methods: {
    // 获取详细文章对象
    async getArticleList () {
      try {
        const { data: res } = await getArticleDetails(this.articleId)
        // console.log(res)
        this.articleList = res.data

        // setTimeout(() => {
        //   this.previewImage()
        // }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
      }
      this.isLoading = false
    },
    // 点击图片进行预览
    previewImage () {
      // 获取元素
      const articleContent = this.$refs['article-content']
      // 查找所有子元素 img 节点
      const imgs = articleContent.querySelectorAll('img')
      const img = []
      // 遍历 img 节点
      imgs.forEach((item, index) => {
        // 获取所有 img 图片的路径
        img.push(item.currentSrc)
        // 点击图片进行预览
        item.onclick = () => {
          ImagePreview({
            images: img,
            startPosition: index
          })
        }
      })
    },
    // 发布评论
    AddComment (val) {
      // 关闭弹层
      this.showCommentPopup = false
      // 将新发布的评论显示在最上方
      this.commentslist.unshift(val)
    },
    // 评论回复
    replyShow (obj) {
      // 开启弹出层
      this.isReplyShow = true
      // console.log(obj)
      this.commentInfo = obj
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /deep/ .van-popup__close-icon--top-left {
    font-size: 30px;
    color: #3296fa;
  }
}
</style>
