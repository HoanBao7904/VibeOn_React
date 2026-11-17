import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import followApi from '~/apis/follow.api'
import FollowButton from '../FollowButton/FollowButton'
import RemoveFollowerButton from '../RemoveFollowerButton/RemoveFollowerButton'

interface FollowModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'follower' | 'following'
  ownerName?: string
}

const LIMIT = 10

export default function FollowModal({ isOpen, onClose, type, ownerName }: FollowModalProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useInfiniteQuery({
    queryKey: ['follow', type],
    queryFn: ({ pageParam }) =>
      type === 'follower'
        ? followApi.getFollowers({ page: pageParam, limit: LIMIT })
        : followApi.getFollowings({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page = 1, total_page = 1 } = lastPage.data
      return page < total_page ? page + 1 : undefined // undefined = hết trang
    },
    // Gộp các trang thành 1 mảng user phẳng
    select: (data) => ({
      users: data.pages.flatMap((p) => p.data.result.map((item) => item.following)),
      total: data.pages[0]?.data.total ?? 0
    }),
    enabled: isOpen // đóng modal thì không gọi API
  })

  const users = data?.users ?? []
  const total = data?.total ?? 0

  // Hook phải gọi hết ở trên, return sớm phải đặt SAU hook
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f14]/80 p-4 backdrop-blur-md'>
      <div className='relative flex max-h-[85vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-[#30353b] bg-[#171c21] shadow-[0_0_25px_rgba(29,155,240,0.25)]'>
        {/* HEADER */}
        <div className='flex items-center justify-between border-b border-[#30353b] bg-[#0a0f14]/90 px-4 py-3'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#353a3f] to-[#1d9bf0] text-white ring-1 ring-[#1d9bf0]/40'>
              <span className='material-symbols-outlined text-[22px]'>group</span>
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='text-[17px] font-bold text-white'>
                  {type === 'follower' ? 'Người theo dõi' : 'Đang theo dõi'}
                </h3>
                <span className='rounded-full bg-[#1d9bf0]/20 px-2 py-0.5 text-[12px] font-semibold text-[#1d9bf0]'>
                  {total} người
                </span>
              </div>
              <span className='text-[13px] text-[#bfc7d3]'>Danh sách của {ownerName}</span>
            </div>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='flex h-9 w-9 items-center justify-center rounded-full text-[#bfc7d3] transition-colors hover:bg-[#30353b] hover:text-white'
          >
            <span className='material-symbols-outlined text-[20px]'>close</span>
          </button>
        </div>

        {/* SEARCH (giao diện) */}
        <div className='flex flex-col gap-3 border-b border-[#30353b]/50 bg-[#0a0f14]/60 px-4 py-3'>
          <div className='relative flex w-full items-center'>
            <span className='material-symbols-outlined absolute left-3 text-[18px] text-[#bfc7d3]'>search</span>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='w-full rounded-full bg-[#1b2025] py-2 pl-10 pr-10 text-[14px] text-white placeholder:text-[#bfc7d3] focus:outline-none focus:ring-1 focus:ring-[#1d9bf0]'
            />
          </div>
        </div>

        {/* LIST */}
        <div id='follow-modal-scroll' className='flex max-h-[50vh] flex-col overflow-y-auto p-3'>
          {/* Skeleton lần tải đầu */}
          {isLoading && (
            <div className='flex flex-col gap-3 p-2'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex animate-pulse gap-3'>
                  <div className='h-10 w-10 rounded-full bg-[#252a30]' />
                  <div className='flex flex-1 flex-col gap-2'>
                    <div className='h-3 w-1/3 rounded bg-[#252a30]' />
                    <div className='h-3 w-1/4 rounded bg-[#252a30]' />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className='flex flex-col items-center gap-3 p-6 text-[14px] text-[#bfc7d3]'>
              <span>Không tải được danh sách.</span>
              <button
                type='button'
                onClick={() => refetch()}
                className='rounded-full bg-[#1d9bf0] px-4 py-1.5 font-semibold text-white hover:bg-[#1a8cd8]'
              >
                Thử lại
              </button>
            </div>
          )}

          {!isLoading && !isError && users.length === 0 && (
            <p className='py-8 text-center text-[14px] text-[#bfc7d3]'>Chưa có ai trong danh sách này.</p>
          )}

          {users.length > 0 && (
            <InfiniteScroll
              dataLength={users.length}
              next={() => !isFetchingNextPage && fetchNextPage()}
              hasMore={hasNextPage}
              loader={<div className='py-4 text-center text-[14px] text-[#1d9bf0]'>Đang tải thêm...</div>}
              scrollableTarget='follow-modal-scroll'
              endMessage={<p className='py-4 text-center text-[13px] text-[#bfc7d3]'>Đã hiển thị toàn bộ danh sách.</p>}
            >
              {users.map((user) => (
                <div
                  key={user._id}
                  className='flex items-start justify-between gap-3 rounded-xl p-2 transition-colors hover:bg-[#252a30]/60'
                >
                  <div className='flex min-w-0 items-start gap-3'>
                    <div className='relative shrink-0'>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className='h-10 w-10 rounded-full object-cover ring-1 ring-[#30353b]'
                        />
                      ) : (
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#01ba7c] to-[#1d9bf0] font-bold uppercase text-[#003823] ring-1 ring-[#4adf9d]/50'>
                          {user.name.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>

                    <div className='flex min-w-0 flex-col'>
                      <span className='cursor-pointer truncate text-[14px] font-bold text-white hover:underline'>
                        {user.name}
                      </span>
                      <span className='truncate text-[13px] text-[#bfc7d3]'>@{user.username}</span>
                    </div>
                  </div>

                  <div className='flex shrink-0 items-center gap-2'>
                    {type === 'follower' ? (
                      <RemoveFollowerButton userId={user._id} />
                    ) : (
                      <FollowButton userId={user._id} isFollowing={user.is_following} />
                    )}
                    {/* <FollowButton userId={user._id} isFollowing={user.is_following} /> */}
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>

        {/* FOOTER */}
        <div className='flex items-center justify-between border-t border-[#30353b] bg-[#0a0f14]/90 px-4 py-3 text-[12px] text-[#bfc7d3]'>
          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-[#4adf9d]'></span>
            <span>Đồng bộ trực tiếp</span>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='rounded-full bg-[#1b2025] px-4 py-1.5 text-white transition-colors hover:bg-[#252a30]'
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
