import type { User } from '~/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', token)
  //setItem lưu trữ giá trị token vào localStorage với key là 'access_token'
}

export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
  //JSON.stringify chuyển object thành chuỗi JSON để lưu trữ trong localStorage
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const getProfile = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
  //chuyển chuỗi JSON thành object để sử dụng trong ứng dụng
}

export const clearStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const event = new Event('ClearStorage') //tạo một sự kiện mới có tên là 'ClearStorage'
  localStorageEventTarget.dispatchEvent(event)
  //gửi sự kiện 'ClearStorage' thông qua localStorageEventTarget để thông báo rằng dữ liệu đã bị xóa khỏi localStorage
}
