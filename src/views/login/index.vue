<template>
  <div>
    <!-- 登录导航栏 -->
    <van-nav-bar
      title="登录"
      left-arrow
      left-text="返回"
      @click-left="$router.go(-1)"
    />

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <!-- 手机号输入框 -->
      <van-field
        v-model="loginData.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="loginFormRules.mobile"
        clearable
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

      <!-- 验证码输入框 -->
      <van-field
        v-model="loginData.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="loginFormRules.code"
        clearable
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 获取验证码按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            format="sss"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />

          <!-- 获取验证码按钮 -->
          <van-button
            size="mini"
            round
            type="default"
            class="sendCode"
            native-type="button"
            @click="onSendSms"
            v-else
            >获取验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="loginBtn">
          登录
        </van-button>
      </div>
    </van-form>

    <!-- 隐私条款 -->
    <a class="PrivacyPolicy" href="javascript:;">隐私条款</a>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'loginPage',
  data () {
    return {
      // 登录表单的数据对象
      loginData: {
        mobile: '',
        code: ''
      },
      // 登录表单的规则对象
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      // 倒计时
      time: 1000 * 5,
      // 控制倒计时开关
      isCountDownShow: false
    }
  },
  methods: {
    // 登录
    async onSubmit (values) {
      // 表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      // console.log('submit', values)
      // 提交表单登录
      try {
        const { data: res } = await login(values)
        // 将 token 值存入vuex中
        this.$store.commit('setTokenKey', res.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 400) {
          return this.$toast.fail('手机号或验证码错误')
        }
        this.$toast.fail('未知错误， 请稍后再试')
      }
    },
    // 发送验证码
    async onSendSms () {
      // 验证手机号是否正确
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return
      }

      // 显示倒计时
      this.isCountDownShow = true

      // 发起请求
      try {
        await sendSms(this.loginData.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        // 关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('发送过于频繁，请稍后再试')
        } else {
          this.$toast.fail('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.van-nav-bar__title {
  color: #fff;
}
.iconfont {
  margin-right: 25px;
  font-size: 37px;
  color: #686868;
}
.sendCode {
  padding: 0 20px;
  background-color: #ededed;
  color: #767676;
}
.loginBtn {
  background-color: #6db4fb;
  border: 0;
  border-radius: 10px;
}
.PrivacyPolicy {
  position: absolute;
  left: 50%;
  top: 92%;
  transform: translateX(-50%);
  font-size: 24px;
  color: #767676;
}
.van-count-down {
  width: 90px;
}
</style>
