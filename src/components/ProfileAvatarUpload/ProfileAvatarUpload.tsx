import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import authApi from '~/apis/auth.api'
import { useUploadMedia } from '~/hooks/useUploadMedia'

interface Props {
  avatar?: string
}

export default function ProfileAvatarUpload({ avatar }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()

  const { upload } = useUploadMedia()

  const updateAvatarMutation = useMutation({
    mutationFn: authApi.patchUpdateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users/me']
      })

      toast.success('Cập nhật avatar thành công')
    }
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    upload([file], {
      onSuccess: async (medias) => {
        try {
          const imageUrl = medias[0].url

          await updateAvatarMutation.mutateAsync({
            avatar: imageUrl
          })
        } catch {
          toast.error('Không thể cập nhật avatar')
        }
      }
    })
  }

  return (
    <>
      <div onClick={() => inputRef.current?.click()} className='group relative cursor-pointer'>
        {avatar ? (
          <img src={avatar} alt='avatar' className='h-32 w-32 rounded-full object-cover' />
        ) : (
          <div className='flex h-32 w-32 items-center justify-center rounded-full bg-[#252a30]'>Avatar</div>
        )}

        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100'>
          <span className='material-symbols-outlined text-white'>photo_camera</span>
        </div>
      </div>

      <input ref={inputRef} hidden type='file' accept='image/*' onChange={handleChange} />
    </>
  )
}
