import type { searchHashtagsResponse, searchMetionsResponse } from '~/types/searchs.type'

import { http } from '~/utils/http'

type SearchParams = {
  q: string
}
const searchsApi = {
  searchHashtags(params: SearchParams) {
    return http.get<searchHashtagsResponse>('/search/hashtags', { params })
  },
  searchMentions(params: SearchParams) {
    return http.get<searchMetionsResponse>('/users/search', { params })
  }
}

export default searchsApi
