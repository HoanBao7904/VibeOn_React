import axios, { AxiosError, HttpStatusCode } from 'axios'
//Đây có phải là lỗi của Axios không?
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
//Đây có phải là lỗi Axios nhưng cụ thể là lỗi 422 (sai dữ liệu form) không?" nếu phải setError
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
