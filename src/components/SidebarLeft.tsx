import { getProfile } from '~/utils/auth'

const NAV_ITEMS = [
  { icon: 'home', label: 'Trang chủ' },
  { icon: 'tag', label: 'Khám phá' },
  { icon: 'notifications', label: 'Thông báo' },
  { icon: 'mail', label: 'Tin nhắn' },
  { icon: 'bookmark', label: 'Dấu trang' },
  { icon: 'donut_large', label: 'Vibe Circle' },
  { icon: 'person', label: 'Hồ sơ', active: true }, // Bạn có thể dùng NavLink để check active
  { icon: 'pending', label: 'Thêm' }
]

export default function SidebarLeft() {
  const profile = getProfile()
  const name = profile?.name ?? 'Người dùng'
  const username = profile?.username ?? ''
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()

  return (
    <aside className='sticky top-14 flex h-[calc(100vh-3.5rem)] w-[68px] shrink-0 select-none flex-col justify-between px-1 pb-4 xl:w-[275px] xl:px-3'>
      <div className='flex flex-col gap-2 pt-3'>
        <nav className='flex flex-col gap-1'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href='#'
              className={`flex items-center gap-3 rounded-full p-3 transition-colors ${
                item.active
                  ? 'bg-[#252a30] font-bold text-[#dee3ea]'
                  : 'text-[#bfc7d3] hover:bg-[#252a30] hover:text-[#dee3ea]'
              }`}
            >
              <span className='material-symbols-outlined text-[26px]'>{item.icon}</span>
              <span className='hidden text-[17px] font-bold xl:inline'>{item.label}</span>
            </a>
          ))}
        </nav>
        <button className='mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#1d9bf0] font-bold text-[#003050] hover:bg-[#99cbff] active:scale-95'>
          <span className='material-symbols-outlined text-[24px] xl:hidden'>edit</span>
          <span className='hidden xl:inline'>Đăng Vibe</span>
        </button>
      </div>

      <div className='flex cursor-pointer items-center justify-between rounded-full p-2 hover:bg-[#252a30]'>
        <div className='flex items-center gap-2'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99cbff] font-bold text-[#003354]'>
            {initials}
          </div>
          <div className='hidden flex-col text-left xl:flex'>
            <span className='max-w-[130px] truncate text-sm font-semibold'>{name}</span>
            <span className='max-w-[130px] truncate text-[13px] text-[#bfc7d3]'>@{username}</span>
          </div>
        </div>
        <span className='material-symbols-outlined hidden text-[#bfc7d3] xl:inline'>more_horiz</span>
      </div>
    </aside>
  )
}
