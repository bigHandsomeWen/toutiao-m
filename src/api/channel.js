import request from '@/utils/request'

// 获取所有频道列表数据
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 增加频道
export const addChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除频道列表
export const delChannel = id => {
  return request({
    method: 'delete',
    url: '/v1_0/user/channels/' + id
  })
}
