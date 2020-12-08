<template>
  <div class="home_container">
    <!-- 搜索框 -->
    <van-nav-bar>
      <van-button
        class="searchBtn"
        slot="title"
        size="small"
        type="info"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable swipe-threshold="4">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 频道列表数据 -->
        <article-list :channel="item" />
      </van-tab>

      <div slot="nav-right" class="baffle"></div>
      <div slot="nav-right" class="hamburger_btn" @click="isShowPopup = true">
        <i slot="icon" class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑的弹层 -->
    <van-popup
      class="channelPopup"
      v-model="isShowPopup"
      position="bottom"
      closeable
      round
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :channels="channels"
        :active="active"
        @toggle-channel="toggleChannel"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import articleList from './components/article-list'

// 导入 channel-edit组件
import channelEdit from '@/components/channel-edit'

import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'homeIndex',
  components: {
    articleList,
    channelEdit
  },
  created () {
    this.getUserChannelList()
  },
  data () {
    return {
      active: 0,
      channels: [],
      // 控制频道编辑弹层的开关
      isShowPopup: false
    }
  },
  methods: {
    // 获取用户频道列表
    async getUserChannelList () {
      try {
        // 判断用户是否登录
        if (this.tokenKey) {
          // 已登录
          const { data: res } = await getUserChannel()
          // console.log(res)
          this.channels = res.data.channels
        } else {
          // 未登录 判断是否有本地的频道列表数据
          const localChannels = getItem('channels')
          if (localChannels) {
            this.channels = localChannels
          } else {
            const { data: res } = await getUserChannel()
            // console.log(res)
            this.channels = res.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取用户频道列表失败')
      }
    },
    // 改变 active 值
    toggleChannel (i) {
      this.active = i
    }
  },
  computed: {
    ...mapState(['tokenKey'])
  }
}
</script>
<style lang='less' scoped>
.home_container {
  padding-top: 174px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .searchBtn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    background-color: #55a7ff;
    border: 0;
  }
  .van-icon {
    color: #fff;
    font-size: 32px;
  }
  /deep/ .van-tabs {
    .van-tabs__wrap {
      position: fixed;
      margin-top: 92px;
      z-index: 1;
      left: 0;
      top: 0;
      right: 0;
      height: 82px;
      .van-tabs__nav {
        overflow-x: auto;
        overflow-y: hidden;
      }
    }
    .van-tab {
      min-width: 194px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tabs__line {
      width: 31px;
      height: 7px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
    .van-tab--active {
      color: #333333;
    }
    .hamburger_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 67px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        font-size: 33px;
      }
      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 1px;
        height: 82px;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
    .baffle {
      flex-shrink: 0;
      width: 67px;
      height: 82px;
    }
  }
  .channelPopup {
    box-sizing: border-box;
    padding: 0 24px;
  }
}
</style>
