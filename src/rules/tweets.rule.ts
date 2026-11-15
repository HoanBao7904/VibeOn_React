import * as yup from 'yup'
import { TweetAudience, TweetType, MediaType } from '~/types/enum.type'

export const createTweetRules = yup.object({
  type: yup
    .number()
    .oneOf([TweetType.Tweet, TweetType.Retweet, TweetType.QuoteTweet, TweetType.Comment], 'Loại Tweet không hợp lệ')
    .required('Loại Tweet không được để trống'),
  audience: yup
    .number()
    .oneOf([TweetAudience.Everyone, TweetAudience.TwitterCircle], 'Đối tượng người xem không hợp lệ')
    .required('Đối tượng người xem không được để trống'),
  content: yup
    .string()
    .required('Nội dung bài viết không được để trống')
    .max(1000, 'Nội dung không được vượt quá 280 ký tự'),
  parent_id: yup
    .string()
    .nullable() // Cho phép null (nếu là tweet gốc)
    .test('is-object-id', 'parent_id không đúng định dạng', (value) => {
      if (!value) return true // Nếu null thì bỏ qua
      return /^[0-9a-fA-F]{24}$/.test(value) // Check định dạng ObjectId của MongoDB
    }),
  hashtags: yup.array().of(yup.string().required('Hashtag không hợp lệ')).default([]),

  mentions: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^[0-9a-fA-F]{24}$/, 'Mention phải là ObjectId hợp lệ')
        .required()
    )
    .default([]),

  medias: yup
    .array()
    .of(
      yup.object({
        url: yup.string().required('URL media không để trống'),
        type: yup
          .number()
          .oneOf([MediaType.Image, MediaType.Video], 'Loại Media không hợp lệ')
          .required('Loại media Không bỏ trống')
      })
    )
    .default([])
})

export type CreateTweetType = yup.InferType<typeof createTweetRules>
