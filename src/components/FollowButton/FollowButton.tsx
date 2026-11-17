import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import followApi from '~/apis/follow.api'

interface Props {
  userId: string
  isFollowing: boolean
}

export default function FollowButton({ userId, isFollowing }: Props) {
  const queryClient = useQueryClient()

  const [following, setFollowing] = useState(isFollowing)

  const mutation = useMutation({
    mutationFn: () => {
      return following
        ? followApi.postUnFollow(userId)
        : followApi.postFollow({
            followed_user_id: userId
          })
    },

    onSuccess: () => {
      setFollowing((prev) => !prev)

      queryClient.invalidateQueries({
        queryKey: ['users/me']
      })

      toast.success(following ? 'Đã bỏ theo dõi' : 'Đã theo dõi')
    },

    onError: () => {
      toast.error(following ? 'Bỏ theo dõi thất bại' : 'Theo dõi thất bại')
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }

  if (following) {
    return (
      <button
        type='button'
        onClick={handleClick}
        disabled={mutation.isPending}
        className='group min-w-[112px] rounded-full bg-[#252a30] px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-[#3f4851] transition-all hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] hover:ring-[#ffb4ab]/50 disabled:opacity-60'
      >
        <span className='group-hover:hidden'>Đang theo dõi</span>

        <span className='hidden group-hover:inline'>Bỏ theo dõi</span>
      </button>
    )
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={mutation.isPending}
      className='min-w-[112px] rounded-full bg-[#1d9bf0] px-3 py-1 text-[12px] font-semibold text-white transition-all hover:bg-[#1a8cd8] disabled:opacity-60'
    >
      Theo dõi
    </button>
  )
}
