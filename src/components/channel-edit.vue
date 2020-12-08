<template>
  <div>
    <!-- 我的频道区域 -->
    <div class="myChannel">
      <span>我的频道</span>
      <van-button
        class="edit"
        round
        plain
        type="primary"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </div>
    <van-grid :gutter="10" clickable :border="false">
      <van-grid-item
        v-for="(item, index) in channels"
        :key="index"
        clearable
        @click="operateChannel(item, index)"
      >
        <span slot="text" :class="active === index ? 'active_current' : ''">{{
          item.name
        }}</span>
        <van-icon
          slot="icon"
          name="close"
          class="closeChannel"
          v-show="isEdit && !fixedChannels.includes(item.id)"
        ></van-icon>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐区域 -->
    <div class="myChannel">
      <span>频道推荐</span>
    </div>
    <van-grid :gutter="10" clickable :border="false">
      <van-grid-item
        :text="item.name"
        v-for="item in recommendChannele"
        :key="item.id"
        @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
// 加载所有频道列表数据
import { getAllChannels, addChannel, delChannel } from '@/api/channel'
// 导入全局 token 值
import { mapState } from 'vuex'
// 导入存入本地存储的方法
import { setItem } from '@/utils/storage'

export default {
  name: 'channel_edit',
  data () {
    return {
      allChannels: [],
      // 控制是否编辑的开关
      isEdit: false,
      // 指定频道不能被删除
      fixedChannels: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有的频道信息
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取频道信息失败，请稍后再试')
      }
    },
    // 添加频道
    async addChannel (item) {
      this.channels.push(item)
      // 判断是否登录
      if (this.tokenKey) {
        // 已登录
        try {
          const { data: res } = await addChannel({
            id: item.id, // 频道 ID
            seq: this.channels.length // 频道序号
          })
          console.log(res)
        } catch (error) {
          this.$toast('添加频道失败')
        }
      } else {
        // 未登录
        setItem('channels', this.channels)
      }
    },
    // 操作频道
    async operateChannel (v, i) {
      try {
        // 编辑删除频道
        if (this.isEdit) {
          // 如果是固定频道，则不允许删除
          if (this.fixedChannels.includes(v.id)) {
            return
          }
          // 删除
          this.channels.splice(i, 1)
          // 如过删除的频道是高亮频道之前的 则高亮频道也需要往前一位
          if (i <= this.active) {
            this.$emit('toggle-channel', this.active - 1)
          }
          // 判断是否登录
          if (this.tokenKey) {
            // 登录
            await delChannel(v.id)
          } else {
            // 未登录
            setItem('channels', this.channels)
          }
        } else {
          // 切换频道
          this.$emit('toggle-channel', i)
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  },
  computed: {
    recommendChannele () {
      const recommendation = this.allChannels.filter(item => {
        const res = this.channels.find(value => {
          return item.id === value.id
        })
        if (!res) {
          return item
        }
      })
      return recommendation
    },
    ...mapState(['tokenKey'])
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
.myChannel {
  display: flex;
  margin: 109px 0 50px;
  justify-content: space-between;
  font-size: 34px;
  color: #333333;
  .edit {
    width: 116px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
/deep/.van-grid-item {
  width: 160px;
  height: 86px;
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    font-size: 28px;
    color: #222222;
  }
}
.van-grid {
  padding-left: 0 !important;
}
.active_current {
  color: #f85959;
  font-size: 28px;
}
/deep/ .van-grid-item__icon-wrapper {
  position: unset;
}
.closeChannel {
  position: absolute;
  top: -10px;
  right: 8px;
}
</style>
