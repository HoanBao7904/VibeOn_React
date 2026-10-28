import type { SuccessReponseApi } from './utils.type'

export type RegisterAndLoginResponse = SuccessReponseApi<{
  acess_token: string
  refresh_token: string
  user_id: string
}>

interface FieldError {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export interface errorResponse {
  message: string
  error: {
    [keyof in string]: FieldError
  }
}

export type getMeResponse = SuccessReponseApi<{
  _id: string
  name: string
  email: string
  date_of_birth: string
  username: string
}>
