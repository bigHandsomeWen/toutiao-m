<template>
  <div class="UpdataNameContainer">
    <!-- 导航栏 -->
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancelpopup')"
      @click-right="saveChanges"
    />

    <!-- 文本框 -->
    <van-field
      ref="nickNameRef"
      v-model="nameText"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
      placeholder="请输入昵称"
    />
  </div>
</template>

<script>
// 加载修改名称的接口方法
import { updataInfo } from '@/api/user'

export default {
  name: 'UpdataName',
  created () {
    this.nameText = this.userProfile.name
  },
  mounted () {
    this.$refs.nickNameRef.focus()
  },
  data () {
    return {
      // 输入的昵称
      nameText: ''
    }
  },
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  },
  methods: {
    async saveChanges () {
      try {
        // 判断昵称是否为空
        if (this.nameText.trim().length <= 0) {
          return this.$toast('昵称不能为空')
        } else {
          await updataInfo({
            name: this.nameText
          })
          this.$toast.success('修改成功')
        }
      } catch (error) {
        this.$toast.fail('修改失败')
      }
      this.$emit('cancelpopup')
    }
  }
}
</script>
<style lang='less' scoped>
.UpdataNameContainer {
  height: 100%;
  background-color: #f5f7f9;
  .van-field {
    width: unset;
    margin: 20px;
  }
}
</style>
