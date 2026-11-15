// Audience
export const TweetAudience = {
  Everyone: 0,
  TwitterCircle: 1
} as const

export type TweetAudience = (typeof TweetAudience)[keyof typeof TweetAudience]

// Tweet type
export const TweetType = {
  Tweet: 0,
  Retweet: 1,
  Comment: 2,
  QuoteTweet: 3
} as const

export type TweetType = (typeof TweetType)[keyof typeof TweetType]

// Media type
export const MediaType = {
  Image: 0,
  Video: 1
} as const

export type MediaType = (typeof MediaType)[keyof typeof MediaType]

// Media
export interface Media {
  url: string
  type: MediaType
}
