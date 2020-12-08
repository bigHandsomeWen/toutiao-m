import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 全局加载中文配置
dayjs.locale('zh-cn')

// 配置相对时间的过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
