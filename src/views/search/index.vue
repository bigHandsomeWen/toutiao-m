<template>
  <div class="search_container">
    <form class="search_form" action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 历史记录 -->
    <search-history
      v-else
      :searchedText="searchedText"
      @search="onSearch"
      @clear-all="searchedText = []"
    ></search-history>
  </div>
</template>

<script>
// 加载子组件
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
// 加载设置与获取本地存储的方法
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      // 搜索过的数据
      searchedText: getItem('SEARCH_HISTORY') || []
    }
  },
  methods: {
    // 点击键盘上的搜索或按下回车触发的事件
    onSearch (text) {
      // 展示搜索结果
      this.isResultShow = true
      // 将联想建议的值传给输入框
      this.searchText = text
      // 判断是否有重复的历史记录
      const i = this.searchedText.indexOf(text)
      if (i !== -1) {
        this.searchedText.splice(i, 1)
      }
      // 存储历史记录
      this.searchedText.unshift(text)
    },
    // 点击取消按钮触发的事件
    onCancel () {
      // 回到首页
      this.$router.back()
    }
  },
  watch: {
    searchedText (val) {
      setItem('SEARCH_HISTORY', val)
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  }
}
</script>
<style lang='less' scoped>
.search_container {
  padding-top: 108px;
  .van-search {
    padding-left: 34px;
    /deep/ .van-icon-search {
      color: #9f9f9f;
    }
    .van-search__action {
      margin: 0 17px;
      color: #fff;
      font-size: 28px;
    }
  }
  .search_form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
