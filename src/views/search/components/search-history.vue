<template>
  <div class="history_container">
    <van-cell title="历史记录">
      <span v-if="isDelete" @click="$emit('clear-all')">全部删除 </span>
      <span v-if="isDelete" @click="isDelete = false">完成</span>
      <van-icon name="delete" v-else @click="isDelete = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchedText"
      :key="index"
      @click="onClickHistory(item, index)"
    >
      <van-icon name="cross" v-show="isDelete" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchedText: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    onClickHistory (item, i) {
      // 判断是否为删除状态
      if (this.isDelete) {
        // 删除
        this.searchedText.splice(i, 1)
      } else {
        // 搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.history_container {
  .van-icon-cross {
    margin-right: 4px;
    font-size: 18px;
  }
}
</style>
