export interface SuccessReponseApi<Data> {
  message: string
  result: Data
  page?: number
  limit?: number
  total?: number
  total_page?: number
  totalFollower?: number
  totalFollowing?: number
}

export interface ParamsConfig {
  page?: number | string
  limit?: number | string //limit là số hiển thị items
  q?: string
}
