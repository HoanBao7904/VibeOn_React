import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import { clearStorage, getAccessToken, setAccessToken } from './auth'
import type { RegisterResponse } from '~/types/auth.type'
import { toast } from 'react-toastify'
import config from '~/contexts/config.contexts'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessToken() || ''
    this.instance = axios.create({
      baseURL: config.BASEURL,
      timeout: 10000, //nghia là nếu request không được phản hồi trong vòng 10 giây thì sẽ bị hủy
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      //chạy trước khi gửi request
      (config) => {
        if (this.accessToken && config.headers) {
          //kiểm tra xem accessToken có tồn tại và config.headers có tồn tại hay không
          config.headers.Authorization = this.accessToken //nếu có thì thêm accessToken vào header của request
          return config
        }
        return config //nếu không có accessToken thì trả về config mà không thêm gì vào header
      },
      (error: AxiosError) => {
        Promise.reject(error) //nếu có lỗi xảy ra trong quá trình gửi request thì trả về lỗi đó
      }
    )

    this.instance.interceptors.response.use(
      async (response) => {
        const url = response.config.url
        if (url?.endsWith('/login') || url?.endsWith('/register')) {
          this.accessToken = (response.data as RegisterResponse).result.acess_token
          setAccessToken(this.accessToken)
          // const profileResponse = await this.instance.get('/users/me')
          // setProfile(profileResponse.data.result)
        } else if (url?.endsWith('/logout')) {
          this.accessToken = ''
          clearStorage()
        }
        return response
      },

      function (error: AxiosError) {
        if (error.response?.status !== 422) {
          //lỗi ktr xem dữ liệu gửi lên có thiếu trường hoặc ko đúng định dạng
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === 401) {
          //lỗi này token hết hạn hoặc chưa đăng nhập
          clearStorage()
        }

        return Promise.reject(error) //dòng này trả về lỗi để có thể xử lý ở nơi gọi hàm http
      }
    )
  }
}

export const http = new Http().instance //tạo một instance của class Http và gán vào biến http
