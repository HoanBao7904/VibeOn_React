import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { Media } from '~/types/enum.type'
import mediasApi from '~/apis/medias.api'

type UploadFn = (fd: FormData) => Promise<{ data: { result: Media | Media[] } }>

async function uploadFiles(files: File[]) {
  const results: Media[] = []

  const send = async (kind: 'image' | 'video', upload: UploadFn) => {
    const list = files.filter((f) => f.type.startsWith(`${kind}/`))
    if (list.length === 0) return

    const formData = new FormData()
    list.forEach((f) => formData.append(kind, f))

    const res = await upload(formData)
    results.push(...[res.data.result].flat()) // object hay mảng đều ra Media[]
  }

  await send('image', (fd) => mediasApi.uploadImage(fd))
  await send('video', (fd) => mediasApi.uploadVideo(fd))

  return results
}

export function useUploadMedia() {
  const [medias, setMedias] = useState<Media[]>([])

  const mutation = useMutation({
    mutationFn: uploadFiles,
    onSuccess: (data) => {
      setMedias((prev) => [...prev, ...data])
      toast.success('Tải file lên thành công!')
    },
    onError: () => toast.error('Lỗi khi tải file!')
  })

  return {
    medias,
    upload: mutation.mutate,
    isUploading: mutation.isPending,
    removeMedia: (index: number) => setMedias((prev) => prev.filter((_, i) => i !== index)),
    resetMedias: () => setMedias([])
  }
}
