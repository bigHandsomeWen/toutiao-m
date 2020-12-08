import request from '@/utils/request.js'

// 发起登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码请求
export const sendSms = mobile => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}

// 获取用户自己的基本信息
export const userInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 获取用户频道列表
export const getUserChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const focusUser = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const cancelFocusUser = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 修改个人资料
export const updataInfo = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料
export const updataUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
