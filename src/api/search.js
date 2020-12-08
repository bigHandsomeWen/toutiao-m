import request from '@/utils/request'

// 获取联想建议
export const getSuggestion = q => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export const getSearchResult = params => {
  return request({
    url: '/v1_0/search',
    params
  })
}
