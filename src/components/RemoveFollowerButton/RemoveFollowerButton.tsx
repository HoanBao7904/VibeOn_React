import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import followApi from '~/apis/follow.api'

interface Props {
  userId: string
}

export default function RemoveFollowerButton({ userId }: Props) {
  const queryClient = useQueryClient()

  const removeFollowerMutation = useMutation({
    mutationFn: () => followApi.deleteFollower({ followed_user_id: userId }),
    onSuccess: () => {
      toast.success('Đã xóa follower')
      queryClient.invalidateQueries({
        queryKey: ['users/me']
      })
    },
    onError: () => {
      toast.error('Xóa follower thất bại')
    }
  })

  return (
    <button
      type='button'
      onClick={() => removeFollowerMutation.mutate()}
      disabled={removeFollowerMutation.isPending}
      className='group min-w-[112px] rounded-full bg-[#252a30] px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-[#3f4851] transition-all hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] hover:ring-[#ffb4ab]/50 disabled:opacity-60'
    >
      <span className='group-hover:hidden'>Người theo dõi</span>

      <span className='hidden group-hover:inline'>Xóa</span>
    </button>
  )
}
