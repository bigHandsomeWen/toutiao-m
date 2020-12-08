<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item, index) in commentslist"
      :key="index"
      :commentsInfo="item"
      @reply-show="$emit('reply-show', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comments'
// 加载文章评论项组件
import commentItem from './comment-item'

export default {
  name: 'CommentList',
  data () {
    return {
      // commentslist: [],
      loading: false,
      error: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    commentItem
  },
  props: {
    commentslist: {
      type: Array,
      default: () => []
    },
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 获取评论列表数据
      try {
        const { data: res } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(res)
        const { results, last_id: lastId, total_count: totalCount } = res.data
        this.$emit('totalQuantity', totalCount)
        this.commentslist.push(...results)
        // 判断是否加载全部数据
        if (this.commentslist.length < totalCount) {
          this.offset = lastId
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
