import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import authApi from '~/apis/auth.api'

const TABS = ['Vibes', 'Câu trả lời', 'Nổi bật', 'Vibe Circle', 'Phương tiện', 'Lượt thích']

export default function Me() {
  const { data } = useQuery({
    queryKey: ['users/me'],
    queryFn: authApi.getMeApi
  })

  console.log('data:', data)

  const dataMe = data?.data.result
  console.log(dataMe)

  const name = dataMe?.name ?? 'Người dùng'
  const username = dataMe?.username ?? ''

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()

  const birthday = dataMe?.date_of_birth
    ? new Date(dataMe.date_of_birth).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })
    : ''

  const [openEdit, setOpenEdit] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`@${username}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <>
      {/* Thanh điều hướng trên của trang */}
      <div className='sticky top-0 z-30 flex items-center gap-4 bg-background/85 px-3 py-1 backdrop-blur-xl'>
        <button className='flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#252a30]'>
          <span className='material-symbols-outlined text-[20px]'>arrow_back</span>
        </button>
        <div className='flex min-w-0 flex-col'>
          <span className='truncate text-[17px] font-bold'>{name}</span>
          <span className='text-[13px] text-[#bfc7d3]'>0 Vibes</span>
        </div>
      </div>

      {/* Ảnh bìa */}
      <div className='relative z-0 h-44 w-full overflow-hidden bg-gradient-to-r from-[#0a0f14] via-[#1b2025] to-[#171c21] sm:h-52'>
        <button className='absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-md transition-colors hover:bg-background'>
          <span className='material-symbols-outlined text-[16px] text-[#99cbff]'>add_a_photo</span>
          <span>Thêm ảnh bìa</span>
        </button>
      </div>

      {/* Thông tin cá nhân */}
      <div className='relative z-10 px-3 pb-4'>
        <div className='-mt-16 mb-3 flex items-end justify-between sm:-mt-20'>
          <div className='relative z-20 h-32 w-32 rounded-full bg-background p-1 shadow-xl sm:h-36 sm:w-36'>
            <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-[#252a30] via-[#1b2025] to-[#30353b]'>
              <span className='select-none text-[32px] font-black tracking-tight text-[#99cbff]'>{initials}</span>
            </div>
          </div>
          <div className='relative z-20 flex items-center gap-1 pb-1'>
            <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2025] transition-colors hover:bg-[#252a30]'>
              <span className='material-symbols-outlined text-[20px]'>more_horiz</span>
            </button>
            <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2025] transition-colors hover:bg-[#252a30]'>
              <span className='material-symbols-outlined text-[18px]'>share</span>
            </button>
            <button
              onClick={() => setOpenEdit(true)}
              className='h-10 rounded-full bg-[#30353b] px-4 text-sm font-semibold transition-all hover:bg-[#353a3f] active:scale-95'
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-0.5'>
          <div className='flex flex-wrap items-center gap-1'>
            <h1 className='text-2xl font-bold tracking-tight'>{name}</h1>
            <div className='inline-flex items-center gap-1 rounded-full bg-[#252a30] px-1 py-0.5 text-xs text-[#89919d]'>
              <span className='material-symbols-outlined text-[14px]'>verified_user</span>
              <span>Chưa xác minh</span>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-1'>
            <span className='font-mono text-[15px] text-[#bfc7d3]'>@{username}</span>
            <button
              onClick={handleCopy}
              title='Sao chép tên người dùng'
              className='flex items-center rounded p-1 text-[#89919d] transition-colors hover:text-[#99cbff]'
            >
              <span className={`material-symbols-outlined text-[15px] ${copied ? 'text-[#4adf9d]' : ''}`}>
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>
            {/* <span className='rounded bg-[#171c21] px-1 py-0.5 font-mono text-[11px] text-[#89919d]'>
              ID: {userId.slice(0, 8)}...
            </span> */}
          </div>
        </div>

        <div className='mt-3'>
          <button
            onClick={() => setOpenEdit(true)}
            className='group flex w-full items-center justify-between rounded-2xl bg-[#171c21]/70 p-2 text-left transition-colors hover:bg-[#171c21]'
          >
            <span className='text-[15px] italic text-[#89919d] group-hover:text-[#bfc7d3]'>
              + Thêm tiểu sử giới thiệu bản thân đến cộng đồng VibeOn...
            </span>
            <span className='material-symbols-outlined text-[18px] text-[#89919d] group-hover:text-[#99cbff]'>
              edit_note
            </span>
          </button>
        </div>

        <div className='mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-[13px] text-[#bfc7d3] sm:grid-cols-2'>
          {birthday && (
            <div className='flex items-center gap-1'>
              <span className='material-symbols-outlined text-[18px] text-[#ffb1c5]'>cake</span>
              <span>Sinh ngày {birthday}</span>
            </div>
          )}
          <div className='flex items-center gap-1'>
            <span className='material-symbols-outlined text-[18px] text-[#89919d]'>location_on</span>
            <button className='text-left text-[#99cbff] hover:underline'>Thêm vị trí</button>
          </div>
          <div className='flex items-center gap-1'>
            <span className='material-symbols-outlined text-[18px] text-[#89919d]'>link</span>
            <button className='text-left text-[#99cbff] hover:underline'>Thêm liên kết trang web</button>
          </div>
        </div>

        {/* Vibe Circle */}
        <div className='mt-3 flex items-center justify-between rounded-2xl bg-[#252a30]/60 p-3'>
          <div className='flex items-center gap-2'>
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#01ba7c]/20 text-[#4adf9d]'>
              <span className='material-symbols-outlined text-[20px]'>donut_large</span>
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-semibold'>Vibe Circle</span>
                <span className='rounded-full bg-[#30353b] px-1 text-[10px] text-[#89919d]'>0 thành viên</span>
              </div>
              <span className='text-[13px] text-[#bfc7d3]'>
                Chỉ những người trong Circle mới xem được các vibe độc quyền.
              </span>
            </div>
          </div>
          <button className='shrink-0 rounded-full bg-[#30353b] px-3 py-1 text-xs font-medium transition-colors hover:bg-[#353a3f]'>
            Tạo Circle
          </button>
        </div>

        <div className='mt-3 flex items-center gap-6'>
          <a href='#' className='flex items-center gap-1 hover:underline'>
            <span className='font-bold'>0</span>
            <span className='text-[#bfc7d3]'>Đang theo dõi</span>
          </a>
          <a href='#' className='flex items-center gap-1 hover:underline'>
            <span className='font-bold'>0</span>
            <span className='text-[#bfc7d3]'>Người theo dõi</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex w-full items-center overflow-x-auto bg-background [&::-webkit-scrollbar]:hidden'>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`relative min-w-[90px] flex-1 whitespace-nowrap py-3 text-center text-sm font-semibold transition-colors ${
              i === 0 ? 'text-[#dee3ea]' : 'text-[#bfc7d3] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            {tab}
            {i === 0 && (
              <span className='absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1d9bf0]' />
            )}
          </button>
        ))}
      </div>

      {/* Trạng thái trống */}
      <div className='flex flex-col items-center px-6 py-14 text-center'>
        <div className='relative mb-4 flex h-28 w-28 items-center justify-center'>
          <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-[#1d9bf0]/20 to-[#4adf9d]/10 blur-xl' />
          <div className='relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1b2025] shadow-lg'>
            <span className='material-symbols-outlined text-[56px] text-[#99cbff]'>rocket_launch</span>
          </div>
        </div>
        <h2 className='mb-1 text-xl font-bold'>Chào mừng bạn đến với VibeOn, {name}!</h2>
        <p className='mb-6 max-w-[420px] text-[15px] text-[#bfc7d3]'>
          Hồ sơ của bạn đã sẵn sàng. Hãy chia sẻ suy nghĩ, giai điệu hoặc xu hướng đầu tiên đến cộng đồng.
        </p>
        <button className='flex h-12 items-center gap-1 rounded-full bg-[#1d9bf0] px-8 font-bold text-[#003050] shadow-md transition-transform hover:bg-[#99cbff] active:scale-95'>
          <span className='material-symbols-outlined text-[20px]'>edit</span>
          <span>Đăng Vibe đầu tiên</span>
        </button>
      </div>

      {/* Modal chỉnh sửa hồ sơ */}
      {openEdit && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm'
          onClick={() => setOpenEdit(false)}
        >
          <div
            className='flex max-h-[90vh] w-full max-w-[550px] flex-col overflow-hidden rounded-3xl bg-[#171c21] shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between bg-[#1b2025] px-4 py-3'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => setOpenEdit(false)}
                  className='flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#30353b]'
                >
                  <span className='material-symbols-outlined text-[20px]'>close</span>
                </button>
                <span className='text-[17px] font-bold'>Chỉnh sửa hồ sơ</span>
              </div>
              <button
                onClick={() => setOpenEdit(false)}
                className='rounded-full bg-[#dee3ea] px-4 py-1 text-sm font-semibold text-background transition-all hover:bg-[#bfc7d3]'
              >
                Lưu
              </button>
            </div>

            <div className='flex flex-col gap-4 overflow-y-auto p-4'>
              <div className='flex h-32 w-full items-center justify-center rounded-2xl bg-[#252a30]'>
                <button className='flex h-10 w-10 items-center justify-center rounded-full bg-black/60 transition-colors hover:bg-black/80'>
                  <span className='material-symbols-outlined text-[20px]'>add_a_photo</span>
                </button>
              </div>

              <div className='flex flex-col gap-1 rounded-xl bg-[#1b2025] p-2'>
                <label className='text-xs font-medium text-[#89919d]'>Tên</label>
                <input type='text' defaultValue={name} className='bg-transparent text-[15px] outline-none' />
              </div>
              <div className='flex flex-col gap-1 rounded-xl bg-[#1b2025] p-2'>
                <label className='text-xs font-medium text-[#89919d]'>Tên người dùng</label>
                <input type='text' defaultValue={username} className='bg-transparent text-[15px] outline-none' />
              </div>
              <div className='flex flex-col gap-1 rounded-xl bg-[#1b2025] p-2'>
                <label className='text-xs font-medium text-[#89919d]'>Tiểu sử</label>
                <textarea
                  rows={3}
                  placeholder='Giới thiệu đôi nét về bản thân...'
                  className='resize-none bg-transparent text-[15px] outline-none placeholder:text-[#89919d]'
                />
              </div>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='flex flex-col gap-1 rounded-xl bg-[#1b2025] p-2'>
                  <label className='text-xs font-medium text-[#89919d]'>Vị trí</label>
                  <input
                    type='text'
                    placeholder='Đà Nẵng, Việt Nam'
                    className='bg-transparent text-[15px] outline-none placeholder:text-[#89919d]'
                  />
                </div>
                <div className='flex flex-col gap-1 rounded-xl bg-[#1b2025] p-2'>
                  <label className='text-xs font-medium text-[#89919d]'>Trang web</label>
                  <input
                    type='text'
                    placeholder='https://'
                    className='bg-transparent text-[15px] outline-none placeholder:text-[#89919d]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
