import request from '@/utils/request'

export const getChannelNews = params => {
  return request({
    url: '/v1_1/articles',
    params
  })
}

// 获取新闻文章详情
export const getArticleDetails = articleId => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const collectArticles = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const cancelCollectArticles = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 给文章点赞
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const cancelLikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
