export interface SuccessReponseApi<Data> {
  message: string
  result: Data
}

export interface ParamsConfig {
  page?: number | string
  limit?: number | string //limit là số hiển thị items
  q?: string
}
