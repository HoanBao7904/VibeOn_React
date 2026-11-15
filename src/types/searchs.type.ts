import type { SuccessReponseApi } from './utils.type'

export type searchHashtagsResponse = SuccessReponseApi<{ name: string }[]>
export type searchMetionsResponse = SuccessReponseApi<
  { _id: string; name: string; username: string; avatar: string; is_followed: boolean }[]
>
