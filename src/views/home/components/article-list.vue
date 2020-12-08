<template>
  <div class="article_list_container">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="tipText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelNews } from '@/api/article'
import articleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    articleItem
  },
  created () {
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      // 下拉刷新后的提示
      tipText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      // 获取频道新闻列表
      try {
        const { data: res } = await getChannelNews({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(res)
        const { results } = res.data
        // console.log(results)
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 判断数据是否加载完毕
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    // 下拉刷新列表数据
    async onRefresh () {
      // 获取频道新闻列表
      try {
        const { data: res } = await getChannelNews({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // console.log(res)
        const { results } = res.data
        this.list.unshift(...results)
        // 加载状态结束
        this.isLoading = false
        this.tipText = '刷新成功'
      } catch (err) {
        this.isLoading = false
        this.tipText = '刷新失败'
      }
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
.article_list_container {
  .van-pull-refresh {
    height: 79vh;
    overflow-y: auto;
    padding-bottom: 100px;
  }
  .van-list {
    height: auto;
  }
}
</style>
