import { useState } from 'react'

export default function EditProfile() {
  // State quản lý dữ liệu form để render Live JSON
  const [editingField, setEditingField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: 'Hoàn Bão 79',
    username: 'hoanbao79',
    bio: 'I will be worth it 🚀 Building next-gen social vibes on VibeOn',
    location: 'Khánh Hòa, Việt Nam',
    website: 'https://vibeon.io/hoanbao79',
    date_of_birth: '2013-01-01',
    avatar: 'avatar_hoanbao_v2.png',
    cover_photo: 'banner_cyber_neon.webp'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (field: string) => {
    // Gọi API PATCH ở đây (ví dụ: api.patch('/users/me', { [field]: formData[field] }))
    console.log(`Đã lưu ${field}:`, formData[field as keyof typeof formData])
    setEditingField(null) // Đóng form sau khi lưu
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  return (
    <div className='flex h-full w-full overflow-hidden bg-[#0a0e14] text-[#f1f5f9] font-sans antialiased selection:bg-[#1d9bf0]/30 selection:text-white'>
      {/* BEGIN: LeftMiniSidebar */}
      <aside className='w-[72px] xl:w-[80px] border-r border-[#233044]/70 flex flex-col justify-between items-center py-6 px-2 bg-[#0d121a] shrink-0 z-20'>
        <div className='flex flex-col items-center gap-7 w-full'>
          <a className='p-2.5 rounded-2xl hover:bg-[#111721] transition-all duration-300 group' href='#' title='VibeOn'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform flex items-center justify-center'>
              <div className='w-full h-full bg-[#0a0e14] rounded-[10px] flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-cyan-400'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  viewBox='0 0 24 24'
                >
                  <path d='M2 10s3-5 5-5c3 0 4 10 7 10 2 0 4-5 6-5 1 0 2 1 2 1'></path>
                  <circle cx='12' cy='12' r='9' strokeOpacity='0.3'></circle>
                </svg>
              </div>
            </div>
          </a>

          <nav className='flex flex-col items-center gap-4 w-full'>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Trang chủ'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Khám phá'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Vibe Reels'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' strokeLinecap='round' strokeLinejoin='round'></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition relative group'
              href='#'
              title='Tin nhắn'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-[#1d9bf0] rounded-full animate-ping'></span>
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-[#1d9bf0] rounded-full'></span>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Thông báo'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Tạo bài viết mới'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='M12 4v16m8-8H4' strokeLinecap='round' strokeLinejoin='round'></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Trang cá nhân'
            >
              <div className='w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1.5px]'>
                <div className='w-full h-full bg-[#111721] rounded-full flex items-center justify-center text-xs font-bold text-cyan-300'>
                  HB
                </div>
              </div>
            </a>
          </nav>
        </div>

        <div className='flex flex-col items-center gap-3 w-full'>
          <a
            className='p-3 text-[#1d9bf0] bg-[#1d9bf0]/10 rounded-2xl border border-[#1d9bf0]/30 shadow-inner group'
            href='#'
            title='Cài đặt'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2.2' viewBox='0 0 24 24'>
              <path
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' strokeLinecap='round' strokeLinejoin='round'></path>
            </svg>
          </a>
        </div>
      </aside>

      {/* BEGIN: SettingsNavigationColumn */}
      <div className='w-[320px] md:w-[352px] border-r border-[#233044]/60 bg-[#111721] flex flex-col h-full shrink-0 overflow-y-auto'>
        <div className='p-6 pb-3 sticky top-0 bg-[#111721]/90 backdrop-blur-md z-10'>
          <h1 className='text-2xl font-bold text-white tracking-tight mb-4 flex items-center justify-between'>
            <span>Cài đặt</span>
            <span className='text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/40'>
              VibeOn v2.4
            </span>
          </h1>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94a3b8]'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </span>
            <input
              className='w-full pl-10 pr-4 py-2 bg-[#0a0e14] border border-[#233044] rounded-xl text-sm placeholder-[#94a3b8]/60 text-white focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] transition-all duration-200'
              placeholder='Tìm kiếm cài đặt...'
              type='text'
            />
          </div>
        </div>

        <div className='px-3 pb-8 space-y-6 flex-1'>
          {/* Nhóm: Tài khoản của bạn */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Tài khoản của bạn
            </div>
            <div className='mt-1 p-3 rounded-2xl bg-[#161f2e]/40 border border-[#233044]/40 hover:border-[#1d9bf0]/40 transition-colors group cursor-pointer'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-cyan-400 mt-0.5 border border-cyan-500/20 group-hover:scale-105 transition-transform'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path
                      d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0v.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </div>
                <div className='flex-1'>
                  <div className='text-sm font-semibold text-white group-hover:text-[#1d9bf0] transition-colors flex items-center gap-1.5'>
                    Vibe Account Hub
                    <svg
                      className='w-3.5 h-3.5 text-[#94a3b8] group-hover:translate-x-0.5 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path d='M9 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round'></path>
                    </svg>
                  </div>
                  <p className='text-xs text-[#94a3b8]/80 mt-1 leading-relaxed'>
                    Mật khẩu, bảo mật, thông tin cá nhân &amp; quyền riêng tư đa nền tảng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nhóm: Cách bạn dùng VibeOn */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Cách bạn dùng VibeOn
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#1d9bf0]/15 text-white font-medium border border-[#1d9bf0]/30 shadow-sm'
                href='#'
              >
                <svg
                  className='w-5 h-5 text-[#1d9bf0] shrink-0'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm font-semibold flex-1'>Chỉnh sửa hồ sơ</span>
                <span className='w-2 h-2 rounded-full bg-[#1d9bf0] shadow-sm shadow-[#1d9bf0]'></span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Thông báo</span>
              </a>
            </div>
          </div>

          {/* Nhóm: Ai có thể xem nội dung */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Ai có thể xem nội dung
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Quyền riêng tư tài khoản</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg
                  className='w-5 h-5 shrink-0 text-emerald-400'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Bạn thân (Vibe Circle)</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Đã chặn</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Tin &amp; Vị trí trực tiếp</span>
              </a>
            </div>
          </div>

          {/* Nhóm: Cách tương tác khác */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Cách người khác tương tác
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Tin nhắn &amp; Phản hồi tin</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Lượt gắn thẻ &amp; Nhắc tên</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BEGIN: MainContentEditProfile */}
      <main className='flex-1 overflow-y-auto bg-[#0a0e14] p-6 lg:p-12 relative flex justify-center'>
        <div className='w-full max-w-2xl pb-24'>
          <div className='flex items-center justify-between mb-8 pb-4 border-b border-[#233044]/50'>
            <div>
              <h2 className='text-2xl lg:text-3xl font-bold tracking-tight text-white'>Chỉnh sửa hồ sơ</h2>
              <p className='text-sm text-[#94a3b8] mt-1'>
                Cập nhật thông tin cá nhân và định danh hiển thị trên VibeOn Network
              </p>
            </div>
          </div>

          <div className='space-y-6'>
            {/* NAME */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-white'>Tên hiển thị</label>
              {editingField === 'name' ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    name='name'
                    maxLength={50}
                    className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition'
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={handleCancel}
                      className='px-4 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSave('name')}
                      className='px-4 py-1.5 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                  <span className='text-white text-sm'>{formData.name}</span>
                  <button
                    onClick={() => setEditingField('name')}
                    className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-white'>Tên người dùng</label>
              {editingField === 'username' ? (
                <div className='flex flex-col gap-2'>
                  <div className='relative flex items-center'>
                    <span className='absolute left-3.5 text-[#94a3b8] font-mono text-sm pointer-events-none'>@</span>
                    <input
                      type='text'
                      name='username'
                      className='w-full pl-8 pr-4 py-2.5 bg-[#1a2332] border border-[#1d9bf0] rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition'
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={handleCancel}
                      className='px-4 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSave('username')}
                      className='px-4 py-1.5 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                  <div className='flex items-center gap-2'>
                    <span className='text-cyan-400 font-mono text-sm'>@{formData.username}</span>
                    <span className='text-[11px] font-medium text-emerald-400 flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded'>
                      <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span> Khả dụng
                    </span>
                  </div>
                  <button
                    onClick={() => setEditingField('username')}
                    className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* BIO */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-white'>Tiểu sử</label>
              {editingField === 'bio' ? (
                <div className='flex flex-col gap-2'>
                  <textarea
                    name='bio'
                    className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition resize-none'
                    maxLength={150}
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                  />
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={handleCancel}
                      className='px-4 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSave('bio')}
                      className='px-4 py-1.5 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-start justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                  <span className='text-white text-sm pr-4'>{formData.bio}</span>
                  <button
                    onClick={() => setEditingField('bio')}
                    className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors shrink-0'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* LOCATION & WEBSITE */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* Location */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-white'>Vị trí</label>
                {editingField === 'location' ? (
                  <div className='flex flex-col gap-2'>
                    <input
                      type='text'
                      name='location'
                      className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition'
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={handleCancel}
                        className='px-3 py-1 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleSave('location')}
                        className='px-3 py-1 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                    <span className='text-white text-sm'>{formData.location}</span>
                    <button
                      onClick={() => setEditingField('location')}
                      className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Website */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-white'>Trang web</label>
                {editingField === 'website' ? (
                  <div className='flex flex-col gap-2'>
                    <input
                      type='url'
                      name='website'
                      className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition'
                      value={formData.website}
                      onChange={handleChange}
                    />
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={handleCancel}
                        className='px-3 py-1 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleSave('website')}
                        className='px-3 py-1 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                    <a
                      href={formData.website}
                      target='_blank'
                      rel='noreferrer'
                      className='text-[#1d9bf0] hover:underline text-sm truncate pr-2'
                    >
                      {formData.website}
                    </a>
                    <button
                      onClick={() => setEditingField('website')}
                      className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors shrink-0'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* DOB */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-white'>Ngày sinh</label>
              {editingField === 'date_of_birth' ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type='date'
                    name='date_of_birth'
                    className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition [color-scheme:dark]'
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={handleCancel}
                      className='px-4 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSave('date_of_birth')}
                      className='px-4 py-1.5 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
                  <span className='text-white text-sm'>{formData.date_of_birth}</span>
                  <button
                    onClick={() => setEditingField('date_of_birth')}
                    className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
