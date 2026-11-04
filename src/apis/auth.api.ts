import type { getMeResponse, RegisterAndLoginResponse, UpdateMe, UpdateReqBody } from '~/types/auth.type'
import { http } from '~/utils/http'

const authApi = {
  register(body: { name: string; email: string; password: string; confirm_Password: string; date_Of_Birth: string }) {
    return http.post<RegisterAndLoginResponse>('/users/register', body)
  },
  loginApi(body: { email: string; password: string }) {
    return http.post<RegisterAndLoginResponse>('/users/login', body)
  },
  getMeApi() {
    return http.get<getMeResponse>('/users/me')
  },
  patchUpdateMe(body: UpdateReqBody) {
    return http.patch<UpdateMe>('/users/me', body)
  }
}

export default authApi
