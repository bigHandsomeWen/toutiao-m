<template>
  <div>
    <!-- 未登录 -->
    <div class="headers" v-if="!tokenKey">
      <!-- 登录按钮 -->
      <div class="loginBtn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>

    <!-- 已登录 -->
    <div class="headers" v-else>
      <div class="userInfo">
        <div class="left">
          <van-image round class="avatar" fit="cover" :src="userList.photo" />
          <span class="avatar_text">{{ userList.name }}</span>
        </div>
        <div class="right">
          <van-button round class="edit" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="dataList">
        <div class="data_item">
          <span class="count">{{ userList.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userList.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userList.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userList.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <section class="collect_history">
      <!-- 收藏历史模块 -->
      <van-grid clickable :column-num="2">
        <van-grid-item text="收 藏" to="/">
          <i slot="icon" class="iconfont icon-shoucang"></i>
        </van-grid-item>
        <van-grid-item text="历 史" to="/">
          <i slot="icon" class="iconfont icon-lishi"></i>
        </van-grid-item>
      </van-grid>
    </section>

    <div class="cells">
      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title="小智同学" is-link />
      <van-cell
        class="logout-cell"
        @click="logOut"
        clickable
        title="退出登录"
        v-if="tokenKey"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 加载 api 接口
import { userInfo } from '@/api/user.js'

export default {
  name: 'myIndex',
  data () {
    return {
      userList: {}
    }
  },
  created () {
    if (this.tokenKey) {
      this.getUserInfo()
    }
  },
  methods: {
    // 退出登录
    logOut () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '是否确认退出'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '退出成功！',
            duration: 1500
          })
          this.$store.commit('removeTokenKey')
        })
        .catch(() => {
          this.$notify({
            type: 'danger',
            message: '取消退出',
            duration: 1500
          }
          )
        })
    },
    // 获取用户信息
    async getUserInfo () {
      try {
        const { data: res } = await userInfo()
        this.userList = res.data
        // console.log(this.userList)
      } catch (err) {
        this.$toast('获取用户信息失败， 请稍后重试!')
      }
    }
  },
  computed: {
    ...mapState(['tokenKey'])
  }
}
</script>
<style lang='less' scoped>
.headers {
  position: relative;
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
  .loginBtn {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      margin-bottom: 15px;
    }
    span {
      font-size: 28px;
      color: #fff;
    }
  }
  .userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 134px;
        height: 134px;
        margin-right: 20px;
      }
      .avatar_text {
        font-size: 30px;
        color: #fff;
      }
    }
    .right {
      .edit {
        width: 160px;
        height: 50px;
        font-size: 20px;
      }
    }
  }
  .dataList {
    display: flex;
    height: 130px;
    .data_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 38px;
      }
      .text {
        font-size: 24px;
      }
    }
  }
}
.collect_history {
  margin-bottom: 10px;
  .van-grid {
    height: 140px;
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #ee6a6b;
    }
    .icon-lishi {
      color: #ffa025;
    }
  }
}
.cells {
  margin-top: 30px;
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
