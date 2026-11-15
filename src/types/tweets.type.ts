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

export type GetNewFeeds = SuccessReponseApi<Tweet>
// const a = {
//   _id: '6ad1fa53c814502441f6b270',
//   user_id: '6a8dd0601a0054a06e31a560',
//   type: 0,
//   audience: 0,
//   content: "Hello everyone! I'm learning Node.js, Express and MongoDB 🚀",
//   parent_id: null,
//   hashtags: [
//     {
//       _id: '6aa3f69365fb3fcdffc9988a',
//       name: 'nodejs',
//       created_at: '2026-09-11T12:39:47.818Z'
//     },
//     {
//       _id: '6aa3f69365fb3fcdffc9988b',
//       name: 'express',
//       created_at: '2026-09-11T12:39:47.818Z'
//     },
//     {
//       _id: '6aa3f69365fb3fcdffc9988c',
//       name: 'mongodb',
//       created_at: '2026-09-11T12:39:47.818Z'
//     },
//     {
//       _id: '6ad1fa53c814502441f6b26f',
//       name: 'CRUD',
//       created_at: '2026-10-16T10:20:03.911Z'
//     }
//   ],
//   mentions: [
//     {
//       _id: '6a8d7baab84fc9ffa0bd9a89',
//       name: 'baonguyendev',
//       username: 'user6a8d7baab84fc9ffa0bd9a89',
//       email: 'nguyenhoanbao4+2@gmail.com'
//     }
//   ],
//   medias: [
//     {
//       url: 'https://twitter-clone-2026-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/videos/rq9guiwe2f3r98x6f8z2uzlci.mp4',
//       type: 1
//     }
//   ],
//   guest_views: 0,
//   user_views: 27,
//   created_at: '2026-10-16T10:20:03.967Z',
//   updated_at: '2026-11-13T10:20:04.270Z',
//   user: {
//     _id: '6a8dd0601a0054a06e31a560',
//     name: 'hoanbao_Dev',
//     created_at: '2026-08-25T17:26:56.907Z',
//     updated_at: '2026-11-04T10:03:21.095Z',
//     verify: 1,
//     bio: 'i am developer 7-9-2004',
//     location: 'Thành phố Đà Nẵng, Việt Nam',
//     website: 'http://localhost:3000/me/1',
//     username: 'user6a8dd0601a0054a06e31a560',
//     avatar: '',
//     cover_photo: ''
//   },
//   bookmarks: 1,
//   likes: 2,
//   retweetCount: 0,
//   CommentCount: 0,
//   QuoteCount: 0
// }
