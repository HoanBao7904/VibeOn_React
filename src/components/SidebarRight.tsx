const TRENDS = [
  { meta: 'Công nghệ · Xu hướng', tag: '#TechTrends', count: '24.8K Vibers' },
  { meta: 'Trí tuệ nhân tạo · Thịnh hành', tag: '#AI', count: '112.4K Vibers' },
  { meta: 'Mạng xã hội · VibeOn', tag: '#VibeOn', count: '68.1K Vibers' }
]

export default function SidebarRight() {
  return (
    <aside className='sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[350px] shrink-0 overflow-y-auto pb-4 pl-4 lg:block [&::-webkit-scrollbar]:hidden'>
      <div className='flex flex-col gap-3 pt-3'>
        {/* Search */}
        <div className='relative'>
          <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89919d]'>
            search
          </span>
          <input
            type='text'
            placeholder='Tìm kiếm VibeOn'
            className='w-full rounded-full bg-[#252a30] py-2 pl-12 pr-3 text-[15px] outline-none placeholder:text-[#89919d] focus:ring-1 focus:ring-[#1d9bf0]'
          />
        </div>

        {/* Premium */}
        <div className='flex flex-col gap-1 rounded-2xl bg-[#1b2025] p-4'>
          <span className='text-[17px] font-bold'>Đăng ký Vibe Premium</span>
          <p className='text-[13px] text-[#bfc7d3]'>
            Mở khóa huy hiệu xác minh neon, viết bài dài hơn và chia sẻ doanh thu quảng cáo.
          </p>
          <button className='mt-1 w-fit rounded-full bg-[#1d9bf0] px-4 py-1 text-sm font-semibold text-[#003050] hover:bg-[#99cbff]'>
            Xác minh ngay
          </button>
        </div>

        {/* Trends */}
        <div className='flex flex-col gap-3 rounded-2xl bg-[#1b2025] p-4'>
          <span className='text-[17px] font-bold'>Xu hướng cho bạn</span>
          {TRENDS.map((t) => (
            <div
              key={t.tag}
              className='-mx-1 flex cursor-pointer items-center justify-between rounded-xl p-1 hover:bg-[#252a30]'
            >
              <div className='flex flex-col'>
                <span className='text-xs text-[#89919d]'>{t.meta}</span>
                <span className='text-sm font-semibold'>{t.tag}</span>
                <span className='text-[13px] text-[#89919d]'>{t.count}</span>
              </div>
              <span className='material-symbols-outlined text-[#89919d]'>more_horiz</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
