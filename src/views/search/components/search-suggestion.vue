<template>
  <div class="suggestion_container">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestionList"
      :key="index"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="highLight(item)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
// 加载防抖debounce
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionList: []
    }
  },
  created () {
  },
  methods: {
    async getSearchSuggestion (value) {
      // 调接口获取联想建议
      const { data: res } = await getSuggestion(value)
      this.suggestionList = res.data.options
    },
    // 搜索关键字高亮
    highLight (text) {
      const str = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSearchSuggestion(value)
      }, 500),
      immediate: true
    }
  }
}
</script>
<style lang='less' scoped>
.suggestion_container {
  .van-cell__left-icon {
    font-size: 30px;
    color: #c9c9c9;
  }
}
/deep/ .active {
  color: #7db6fb;
}
</style>
