import type { BodyCreateTweet, CreateTweet, GetNewFeeds } from '~/types/tweets.type'
import type { ParamsConfig } from '~/types/utils.type'
import { http } from '~/utils/http'

const tweetsApi = {
  createTweet(body: BodyCreateTweet) {
    return http.post<CreateTweet>('/tweets', body)
  },
  getNewFeeds(params: ParamsConfig) {
    return http.get<GetNewFeeds>('/tweets/newsfeed', { params })
  }
}

export default tweetsApi
