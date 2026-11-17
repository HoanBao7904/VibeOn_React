import type { FollowResponse, responseFollow } from '~/types/follow'

import { http } from '~/utils/http'

export interface FollowParams {
  page?: number
  limit?: number
}

const followApi = {
  getFollowers(params: FollowParams) {
    return http.get<FollowResponse>('/users/listFollower', { params })
  },
  getFollowings(params: FollowParams) {
    return http.get<FollowResponse>('/users/listFollowing', { params })
  },
  postFollow(body: { followed_user_id: string }) {
    return http.post<responseFollow>('users/follow', body)
  },
  postUnFollow(followed_user_id: string) {
    return http.delete<responseFollow>(`users/follow/${followed_user_id}`)
  },
  deleteFollower(body: { followed_user_id: string }) {
    return http.delete<responseFollow>('users/follower', { data: body })
  }
}

export default followApi
