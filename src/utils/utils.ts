import axios, { AxiosError, HttpStatusCode } from 'axios'
//Đây có phải là lỗi của Axios không?
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
//Đây có phải là lỗi Axios nhưng cụ thể là lỗi 422 (sai dữ liệu form) không?" nếu phải setError
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

const HASHTAG_REGEX = /#([\p{L}\p{N}_]+)/gu

export const extractHashtags = (text: string) => [
  ...new Set(Array.from(text.matchAll(HASHTAG_REGEX), (m) => m[1].toLowerCase()))
]

// @ hoặc # phải đứng đầu từ, hỗ trợ tiếng Việt (dùng chung cho composer và feed)
export const TOKEN_REGEX = /((?<![\p{L}\p{N}_])[#@][\p{L}\p{N}_]+)/gu
