import type { SuccessReponseApi } from './utils.type'

export interface FollowUser {
  _id: string
  name: string
  username: string
  bio: string
  avatar: string
  is_following: boolean
}

// 1 phần tử trong mảng result của API
export interface Follow {
  following: FollowUser
}

export interface responseFollow {
  message: string
}

export type FollowResponse = SuccessReponseApi<Follow[]>
