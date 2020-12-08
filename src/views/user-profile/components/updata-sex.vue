<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
    :default-index="gender"
  />
</template>

<script>
import { updataInfo } from '@/api/user'
export default {
  name: 'UpdataSex',
  data () {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  model: {
    prop: 'gender',
    event: 'changeSex'
  },
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 选项改变时触发
    onChange (picker, value, index) {
      // console.log(picker, value, index)
      this.localGender = index
    },
    // 点击确认按钮触发的事件
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: false,
        duration: 0
      })
      // 调接口
      try {
        await updataInfo({
          gender: this.gender
        })
        this.$emit('changeSex', this.localGender)
        this.$toast.success('更改成功')
      } catch (error) {
        this.$toast.fail('更改失败，请稍后重试')
      }
      this.$emit('close')
    }
  }
}
</script>
<style lang='less' scoped>
</style>
