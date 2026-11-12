import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import useQueryParams from '~/hooks/useQueryParams'
import { registerRules } from '~/rules/auth.rule'
import type { errorResponse } from '~/types/auth.type'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import logoImg from '~/imgs/a.png'
interface FormData {
  password: string
  confirm_Password: string
}

// Chỉ lấy các rule cần thiết cho reset password
const resetPasswordRule = registerRules.pick(['confirm_Password', 'password'])

export default function ResetPassword() {
  const query = useQueryParams()
  const token = query.token
  // const navigate = useNavigate()

  // State ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordRule),
    mode: 'onChange' // Validate ngay khi gõ để bắt lỗi mật khẩu yếu
  })

  // Lấy giá trị mật khẩu realtime từ form (thay vì dùng state)
  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch('password') || ''
  const confirmPasswordValue = watch('confirm_Password') || ''

  // --- LOGIC ĐÁNH GIÁ ĐỘ MẠNH MẬT KHẨU ---
  const hasLength = passwordValue.length >= 6
  const hasCase = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue)
  const hasNumber = /[0-9]/.test(passwordValue)
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue)

  let score = 0
  if (hasLength) score++
  if (hasCase) score++
  if (hasNumber) score++
  if (hasSpecial) score++

  let strengthText = 'Chưa nhập'
  let strengthColor = 'text-[#89919d]'
  let barsColor = 'bg-[#30353b]'
  let shadowColor = ''

  if (passwordValue.length > 0) {
    if (score === 1) {
      strengthText = 'Độ mạnh: Yếu'
      strengthColor = 'text-[#ffb4ab]'
      barsColor = 'bg-[#ffb4ab]'
      shadowColor = 'shadow-[0_0_8px_#ffb4ab]'
    } else if (score === 2) {
      strengthText = 'Độ mạnh: Trung bình'
      strengthColor = 'text-[#1d9bf0]'
      barsColor = 'bg-[#1d9bf0]'
      shadowColor = 'shadow-[0_0_8px_#1d9bf0]'
    } else if (score === 3) {
      strengthText = 'Độ mạnh: Mạnh'
      strengthColor = 'text-[#4adf9d]'
      barsColor = 'bg-[#4adf9d]'
      shadowColor = 'shadow-[0_0_8px_#4adf9d]'
    } else if (score === 4) {
      strengthText = 'Độ mạnh: Cực mạnh'
      strengthColor = 'text-[#4adf9d] font-bold'
      barsColor = 'bg-[#4adf9d]'
      shadowColor = 'shadow-[0_0_8px_#4adf9d]'
    }
  }

  // --- GỌI API ĐỔI MẬT KHẨU ---
  const resetPasswordMutation = useMutation({
    mutationFn: (body: { forgot_password_token: string; password: string; confirm_Password: string }) =>
      authApi.resetPassword(body),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!')
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.')
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    if (!token) {
      toast.error('Đường dẫn không hợp lệ hoặc đã hết hạn!')
      return
    }

    const body = {
      ...data,
      forgot_password_token: token
    }
    resetPasswordMutation.mutate(body)
  })

  return (
    <div className='bg-[#0f1419] font-sans text-[#dee3ea] min-h-screen flex flex-col justify-between relative overflow-x-hidden selection:bg-[#1d9bf0] selection:text-[#003050]'>
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#1d9bf0]/10 blur-[130px] rounded-full'></div>
        <div className='absolute -bottom-32 right-1/4 w-[480px] h-[300px] bg-[#01ba7c]/10 blur-[140px] rounded-full'></div>
      </div>

      <main className='relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 py-6'>
        <div className='flex flex-col w-full items-center justify-center max-w-xl mx-auto py-2'>
          <div className='relative w-full rounded-2xl bg-[#171c21] shadow-2xl p-6 sm:p-8 overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1d9bf0] to-[#ff5693] opacity-85'></div>

            <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#1d9bf0]/15 blur-[60px] pointer-events-none rounded-full'></div>

            {/* NẾU THÀNH CÔNG -> HIỂN THỊ GIAO DIỆN SUCCESS */}
            {resetPasswordMutation.isSuccess ? (
              <div className='relative z-10 flex flex-col items-center text-center py-4 transition-all duration-300'>
                <div className='relative w-20 h-20 rounded-2xl bg-[#0a0f14] flex items-center justify-center mb-6 shadow-[0_0_28px_rgba(29,155,240,0.25)] overflow-hidden'>
                  <img src={logoImg} />
                  <div className='absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1b2025] flex items-center justify-center text-[#1d9bf0] shadow-md'>
                    <span
                      className='material-symbols-outlined text-[13px]'
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      shield_person
                    </span>
                  </div>
                </div>
                <div className='inline-flex items-center gap-1 bg-[#4adf9d]/10 text-[#4adf9d] px-3 py-1 rounded-full text-[12px] font-semibold uppercase tracking-wider mb-3'>
                  Hoàn tất bảo mật
                </div>
                <h2 className='text-[24px] font-bold text-white tracking-tight mb-2'>
                  Mật khẩu đã được cập nhật thành công!
                </h2>
                <p className='text-[15px] text-[#bfc7d3] max-w-sm mb-8'>
                  Toàn bộ phiên đăng nhập cũ đã được vô hiệu hóa an toàn. Bạn có thể sử dụng mật khẩu mới để truy cập
                  VibeOn ngay bây giờ.
                </p>
                <div className='w-full max-w-xs flex flex-col gap-4'>
                  <Link
                    to='/login'
                    className='w-full h-11 rounded-full bg-[#1d9bf0] text-white font-bold text-[15px] flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(29,155,240,0.3)] hover:bg-[#1a8cd8] active:scale-[0.98] transition-all'
                  >
                    <span>Đăng nhập ngay</span>
                    <span className='material-symbols-outlined text-[20px]'>arrow_forward</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* NẾU CHƯA THÀNH CÔNG -> HIỂN THỊ FORM */
              <div className='relative z-10 flex flex-col transition-all duration-300'>
                <div className='flex flex-col items-center text-center'>
                  <div className='relative flex items-center justify-center mb-4'>
                    <div className='absolute inset-0 bg-[#1d9bf0]/20 rounded-2xl blur-lg'></div>
                    <div className='relative w-20 h-20 rounded-2xl bg-[#0a0f14] flex items-center justify-center shadow-[0_0_28px_rgba(29,155,240,0.25)] overflow-hidden'>
                      <img src={logoImg} />
                      <div className='absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1b2025] flex items-center justify-center text-[#1d9bf0] shadow-md'>
                        <span
                          className='material-symbols-outlined text-[13px]'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          shield_person
                        </span>
                      </div>
                    </div>
                  </div>

                  <h1 className='text-[24px] font-bold text-white tracking-tight mb-1'>Đặt lại mật khẩu mới</h1>
                  <p className='text-[15px] text-[#bfc7d3] max-w-md'>
                    Tạo mật khẩu mạnh mẽ để bảo vệ danh tính số và dữ liệu tài khoản VibeOn của bạn.
                  </p>
                </div>

                <form className='mt-6 flex flex-col gap-4' onSubmit={onSubmit}>
                  {/* Mật khẩu mới */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                      <label className={`text-[14px] font-semibold text-white transition-colors`} htmlFor='password'>
                        Mật khẩu mới
                      </label>
                      <span className={`text-[12px] font-medium ${strengthColor}`}>{strengthText}</span>
                    </div>
                    <div className='relative flex items-center'>
                      <input
                        className={`w-full bg-[#1b2025] rounded-full px-4 py-3 text-[15px] text-white placeholder:text-[#89919d]/60 focus:bg-[#0a0f14] focus:outline-none transition-all pr-12 ${
                          errors.password ? 'shadow-[0_0_0_2px_#ffb4ab]' : 'focus:shadow-[0_0_0_2px_#1d9bf0]'
                        }`}
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Nhập ít nhất 8 ký tự...'
                        {...register('password')}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 text-[#bfc7d3] hover:text-white p-1 rounded-full transition-colors'
                      >
                        <span className='material-symbols-outlined text-[20px]'>
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {/* Báo lỗi nếu có */}
                    {errors.password && (
                      <span className='text-[12px] text-[#ffb4ab] px-2 mt-0.5'>{errors.password.message}</span>
                    )}

                    {/* Thanh độ mạnh */}
                    <div className='grid grid-cols-4 gap-1 mt-1 px-1'>
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            passwordValue.length > 0 && score >= level ? `${barsColor} ${shadowColor}` : 'bg-[#30353b]'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Checklist yêu cầu */}
                    <div className='bg-[#1b2025] rounded-xl p-3 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
                      <div
                        className={`flex items-center gap-2 text-[12px] transition-colors ${hasLength ? 'text-[#4adf9d]' : 'text-[#bfc7d3]'}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${hasLength ? 'text-[#4adf9d]' : 'text-[#89919d]'}`}
                        >
                          {hasLength ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Tối thiểu 6 ký tự</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-[12px] transition-colors ${hasCase ? 'text-[#4adf9d]' : 'text-[#bfc7d3]'}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${hasCase ? 'text-[#4adf9d]' : 'text-[#89919d]'}`}
                        >
                          {hasCase ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Chữ hoa & chữ thường</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-[12px] transition-colors ${hasNumber ? 'text-[#4adf9d]' : 'text-[#bfc7d3]'}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${hasNumber ? 'text-[#4adf9d]' : 'text-[#89919d]'}`}
                        >
                          {hasNumber ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Ít nhất 1 chữ số (0-9)</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-[12px] transition-colors ${hasSpecial ? 'text-[#4adf9d]' : 'text-[#bfc7d3]'}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${hasSpecial ? 'text-[#4adf9d]' : 'text-[#89919d]'}`}
                        >
                          {hasSpecial ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Ký tự đặc biệt (!@#$%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                      <label className='text-[14px] font-semibold text-white' htmlFor='confirm_Password'>
                        Xác nhận mật khẩu mới
                      </label>
                      {confirmPasswordValue.length > 0 && passwordValue === confirmPasswordValue && (
                        <span className='text-[12px] text-[#4adf9d] font-medium'>Khớp mật khẩu ✓</span>
                      )}
                    </div>
                    <div className='relative flex items-center'>
                      <input
                        className={`w-full bg-[#1b2025] rounded-full px-4 py-3 text-[15px] text-white placeholder:text-[#89919d]/60 focus:bg-[#0a0f14] focus:outline-none transition-all pr-12 ${
                          errors.confirm_Password ? 'shadow-[0_0_0_2px_#ffb4ab]' : 'focus:shadow-[0_0_0_2px_#1d9bf0]'
                        }`}
                        id='confirm_Password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Nhập lại mật khẩu...'
                        {...register('confirm_Password')}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-4 text-[#bfc7d3] hover:text-white p-1 rounded-full transition-colors'
                      >
                        <span className='material-symbols-outlined text-[20px]'>
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {errors.confirm_Password && (
                      <span className='text-[12px] text-[#ffb4ab] px-2 mt-0.5'>{errors.confirm_Password.message}</span>
                    )}
                  </div>

                  <button
                    type='submit'
                    disabled={resetPasswordMutation.isPending}
                    className='relative w-full h-11 rounded-full bg-[#1d9bf0] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(29,155,240,0.35)] hover:bg-[#1a8cd8] active:scale-[0.98] transition-all duration-150 mt-2 disabled:opacity-70'
                  >
                    {resetPasswordMutation.isPending ? (
                      <span className='material-symbols-outlined text-[20px] animate-spin'>progress_activity</span>
                    ) : (
                      <span className='material-symbols-outlined text-[20px]'>lock_reset</span>
                    )}
                    <span>{resetPasswordMutation.isPending ? 'Đang xử lý...' : 'Cập nhật mật khẩu mới'}</span>
                  </button>
                </form>
              </div>
            )}

            <div className='relative z-10 mt-8 pt-6 flex flex-col items-center gap-4 border-t border-[#30353b]/50'>
              <Link
                to='/login'
                className='inline-flex items-center gap-1 text-[14px] font-semibold text-[#bfc7d3] hover:text-[#1d9bf0] transition-colors'
              >
                <span className='material-symbols-outlined text-[18px]'>arrow_back</span>
                <span>Hủy bỏ và quay lại Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
