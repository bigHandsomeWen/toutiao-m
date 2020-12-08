<template>
  <div class="search_result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="item in searchResultList"
        :key="item.ch_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// 加载获取搜索结果的接口
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 获取搜索结果的数据列表
      searchResultList: [],
      page: 1,
      per_page: 15,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 调接口获取搜索结果列表
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(res)
        const { results } = res.data
        this.searchResultList.push(...results)
        // 判断数据是否加载完毕
        if (results.length <= 0) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (err) {
        // 激活加载失败的状态
        this.error = true
        // 停止 loading
        // 提示信息
        this.$toast('获取数据失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
