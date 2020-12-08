<template>
  <div>
    <!-- 占位符 -->
    <router-view></router-view>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="home">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="qa">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="video">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="my" v-if="$store.state.tokenKey">我的</span>
        <span class="my" v-else>未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang='less' scoped>
.iconfont {
  font-size: 37.5px;
}
</style>
