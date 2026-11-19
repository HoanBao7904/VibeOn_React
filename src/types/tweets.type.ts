import type { Media, TweetAudience, TweetType } from './enum.type'
import type { SuccessReponseApi } from './utils.type'

// Create tweet request
export interface BodyCreateTweet {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id?: string | null
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}

// Response
export type CreateTweet = SuccessReponseApi<BodyCreateTweet>

export interface Tweet {
  tweets: {
    _id: string
    user_id: string
    type: number
    audience: number
    content: string
    parent_id: null
    hashtags: {
      _id: string
      name: string
      created_at: string
    }[]
    mentions: {
      _id: string
      name: string
      username: string
      email: string
    }[]
    medias: {
      url: string
      type: number
    }[]
    guest_views: number
    user_views: number
    created_at: string
    updated_at: string
    user: {
      _id: string
      name: string
      created_at: string
      updated_at: string
      verify: number
      bio: string
      location: string
      website: string
      username: string
      avatar: string
      cover_photo: string
    }
    bookmarks: number
    likes: number
    retweetCount: number
    CommentCount: number
    QuoteCount: number
  }[]
  limit: number
  page: number
  total: number
  total_page: number
}

export interface TweetItem {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id: string | null

  hashtags: string[]
  mentions: string[]

  medias: {
    url: string
    type: number
  }[]

  guest_views: number
  user_views: number

  created_at: string
  updated_at: string

  like_count: number
  bookmark_count: number
  comment_count: number

  trending_score: number

  author: {
    _id: string
    name: string
    username: string
    avatar: string
  }
}
export interface FeedResult {
  tweets: TweetItem[]
  limit: number
  page: number
  total: number
  total_page: number
}

export type GetNewFeeds = SuccessReponseApi<FeedResult>
