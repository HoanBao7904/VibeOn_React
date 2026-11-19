import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import authApi from '~/apis/auth.api'
import { useUploadMedia } from '~/hooks/useUploadMedia'

interface Props {
  cover?: string
}

export default function ProfileCoverUpload({ cover }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()

  const { upload } = useUploadMedia()

  const updateCoverMutation = useMutation({
    mutationFn: authApi.patchUpdateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users/me']
      })

      toast.success('Cập nhật ảnh bìa thành công')
    }
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    upload([file], {
      onSuccess: async (medias) => {
        try {
          const imageUrl = medias[0].url

          await updateCoverMutation.mutateAsync({
            cover_photo: imageUrl
          })
        } catch {
          toast.error('Không thể cập nhật ảnh bìa')
        }
      }
    })
  }

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        className='group relative h-44 w-full cursor-pointer overflow-hidden bg-[#1b2025] sm:h-52'
      >
        {cover ? (
          <img src={cover} alt='cover' className='h-full w-full object-cover' />
        ) : (
          <div className='h-full w-full bg-gradient-to-r from-[#0a0f14] via-[#1b2025] to-[#171c21]' />
        )}

        <div className='absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100' />

        <div className='absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur'>
          <span className='material-symbols-outlined text-[16px]'>add_a_photo</span>
          Đổi ảnh bìa
        </div>
      </div>

      <input ref={inputRef} hidden type='file' accept='image/*' onChange={handleChange} />
    </>
  )
}
