<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</template>

<script>
import { updataInfo } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdataBirthday',
  model: {
    prop: 'birthday',
    event: 'changeBirthday'
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 最小日期
      minDate: new Date(1970, 0, 1),
      // 最大日期
      maxDate: new Date(),
      // 当前的生日
      currentDate: new Date(this.birthday)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: false,
        duration: 0
      })

      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')

      try {
        await updataInfo({
          birthday: currentDate
        })
        this.$toast.success('修改成功')
        this.$emit('changeBirthday', currentDate)
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
