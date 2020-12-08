import request from '@/utils/request'

// 获取评论
export const getComments = params => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 对评论点赞
export const giveLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论的点赞
export const cancelGiveLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 发表评论
export const publishComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
