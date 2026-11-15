import type { MediaResponce } from '~/types/media.types'
import { http } from '~/utils/http'

const MediaApis = {
  uploadVideo(body: FormData) {
    return http.post<MediaResponce>('/medias/upload-video', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadImage(body: FormData) {
    return http.post<MediaResponce>('/medias/upload-image', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default MediaApis
