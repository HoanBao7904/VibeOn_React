import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import type { errorResponse } from '~/types/auth.type'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import logoImg from '~/imgs/a.png'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerRules } from '~/rules/auth.rule'
import type { Resolver } from 'react-hook-form'
import Input from '~/components/Input'

// type RegisterBody = Omit<FormData, 'dob_day' | 'dob_month' | 'dob_year'>
interface RegisterBody {
  name: string
  email: string
  password: string
  confirm_Password: string
  date_Of_Birth: string
}

type FormData = RegisterBody & {
  dob_day?: string
  dob_month?: string
  dob_year?: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { dob_day: '', dob_month: '', dob_year: '' },
    resolver: yupResolver(registerRules) as Resolver<FormData>
  })

  // Theo dõi sự thay đổi của 3 ô này
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchDay = watch('dob_day')
  const watchMonth = watch('dob_month')
  const watchYear = watch('dob_year')

  // Tự động ghép ngày tháng năm khi user chọn đủ
  useEffect(() => {
    if (watchDay && watchMonth && watchYear) {
      // Ghép thành dạng YYYY-MM-DD
      setValue('date_Of_Birth', `${watchYear}-${watchMonth}-${watchDay}`, { shouldValidate: true })
    } else {
      setValue('date_Of_Birth', '')
    }
  }, [watchDay, watchMonth, watchYear, setValue])

  const registerMutation = useMutation({
    mutationFn: (body: RegisterBody) => authApi.register(body)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    // 1. Tách 3 trường dob_ ra để không gửi thừa lên server
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dob_day, dob_month, dob_year, ...payload } = data

    // // 2. Ép kiểu ngày sinh sang chuẩn ISO (ví dụ: 2010-09-15T00:00:00.000Z)
    if (payload.date_Of_Birth) {
      payload.date_Of_Birth = new Date(payload.date_Of_Birth).toISOString()
    }

    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate('/login')
        toast.success('Đăng kí tài khoản thành công')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
          const formErrors = error.response?.data.error
          if (formErrors?.email) {
            setError('email', { message: formErrors.email.msg })
          }
          if (formErrors?.name) {
            setError('name', { message: formErrors.name.msg })
          }
          if (formErrors?.password) {
            setError('password', { message: formErrors.password.msg })
          }
          if (formErrors?.confirm_Password) {
            setError('confirm_Password', { message: formErrors.confirm_Password.msg })
          }
          if (formErrors?.date_Of_Birth) {
            setError('date_Of_Birth', { message: formErrors.date_Of_Birth.msg })
          }
        }
      }
    })
  })

  return (
    // Thẻ bọc ngoài: Dùng màu nền background vừa tạo + chữ màu xám sáng (gray-200)
    <div className='bg-background text-gray-200 font-sans flex min-h-screen flex-col items-center justify-center p-4'>
      <main className='w-full max-w-md mx-auto'>
        <div className='flex flex-col w-full'>
          {/* Khung Card: Nền xám đậm (gray-900), viền xám (gray-800) */}
          <div className='relative w-full max-w-lg mx-auto my-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden'>
            {/* Background glow */}
            <div className='absolute -top-24 -left-20 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-24 -right-20 w-56 h-56 bg-green-500/10 rounded-full blur-3xl pointer-events-none' />

            {/* Header */}
            <div className='flex flex-col items-center text-center mb-6 relative z-10'>
              <div className='mb-3 flex justify-center items-center'>
                <img
                  src={logoImg}
                  alt='VibeOn Logo'
                  className='w-14 h-14 rounded-2xl shadow-lg hover:scale-105 transition-transform'
                />
              </div>
              <h1 className='text-2xl font-bold text-white tracking-tight mb-1'>Tạo tài khoản của bạn</h1>
              <p className='text-sm text-gray-400'>Tham gia cộng đồng công nghệ &amp; chia sẻ tri thức tức thì</p>
            </div>

            {/* Social OAuth */}
            <div className='flex flex-col gap-2.5 mb-6 relative z-10'>
              <button
                type='button'
                className='w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-150 active:scale-[0.98] shadow-sm font-medium'
              >
                <svg className='w-4 h-4' viewBox='0 0 24 24'>
                  <path
                    d='M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z'
                    fill='#EA4335'
                  />
                </svg>
                <span>Đăng ký bằng Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className='flex items-center gap-3 mb-5'>
              <div className='flex-1 h-px bg-gray-800' />
              <span className='text-xs font-medium text-gray-500 px-1'>hoặc đăng ký bằng email</span>
              <div className='flex-1 h-px bg-gray-800' />
            </div>

            {/* Form */}
            <form className='flex flex-col gap-4 relative z-10' onSubmit={onSubmit} noValidate>
              {/* Name */}
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='reg_name'
                  className='text-sm font-medium text-gray-400 flex items-center justify-between'
                >
                  <span>Họ và tên / Tên hiển thị</span>
                  <span className='text-gray-500 text-[11px] font-normal'>Bắt buộc</span>
                </label>
                <Input
                  register={register}
                  name='name'
                  type='text'
                  errorMessage={errors.name?.message}
                  icon='person'
                  placeholder='Ví dụ: baonguyendev1'
                />
                {/* <div className='relative flex items-center'>
                  <input
                    {...register('name')}
                    type='text'
                    required
                    placeholder='Ví dụ: baonguyendev1'
                    className='w-full bg-gray-800 px-4 py-2.5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />
                  <span className='material-symbols-outlined text-gray-400 text-[20px] absolute right-3 pointer-events-none'>
                    person
                  </span>
                </div>
                {errors.name?.message && <p>{errors.name?.message}</p>} */}
              </div>

              {/* Email */}
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='reg_email'
                  className='text-sm font-medium text-gray-400 flex items-center justify-between'
                >
                  <span>Địa chỉ Email</span>
                  <span className='text-gray-500 text-[11px] font-normal'>Định dạng hợp lệ</span>
                </label>
                <Input
                  register={register}
                  name='email'
                  type='email'
                  errorMessage={errors.email?.message}
                  icon='mail'
                  placeholder='nguyenhoanbao4@gmail.com'
                />
                {/* <div className='relative flex items-center'>
                  <input
                    {...register('email')}
                    type='email'
                    autoComplete='off'
                    required
                    placeholder='nguyenhoanbao4@gmail.com'
                    className='w-full bg-gray-800 px-4 py-2.5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />
                  <span className='material-symbols-outlined text-gray-400 text-[20px] absolute right-3 pointer-events-none'>
                    mail
                  </span>
                </div>
                {errors.email?.message && <p>{errors.email?.message}</p>} */}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='reg_password'
                  className='text-sm font-medium text-gray-400 flex items-center justify-between'
                >
                  <span>Mật khẩu</span>
                  <span className='text-gray-500 text-[11px] font-normal'>Tối thiểu 8 ký tự</span>
                </label>
                <Input
                  register={register}
                  name='password'
                  type='password'
                  errorMessage={errors.password?.message}
                  icon='visibility'
                  placeholder='Nhập mật khẩu an toàn'
                />
                {/* <div className='relative flex items-center'>
                  <input
                    {...register('password')}
                    type='password'
                    autoComplete='off'
                    required
                    placeholder='Nhập mật khẩu an toàn'
                    className='w-full bg-gray-800 pl-4 pr-11 py-2.5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />
                  <button
                    type='button'
                    aria-label='Toggle password visibility'
                    className='absolute right-3 text-gray-400 hover:text-white p-1 transition-colors'
                  >
                    <span className='material-symbols-outlined text-[20px]'>visibility</span>
                  </button>
                </div> */}
                {/* {errors.password?.message && <p>{errors.password?.message}</p>} */}
                {/* Strength meter */}
                <div className='grid grid-cols-4 gap-1.5 mt-1'>
                  <div className='h-1 rounded-full bg-gray-700' />
                  <div className='h-1 rounded-full bg-gray-700' />
                  <div className='h-1 rounded-full bg-gray-700' />
                  <div className='h-1 rounded-full bg-gray-700' />
                </div>
              </div>

              {/* Confirm password */}
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='reg_confirm_password'
                  className='text-sm font-medium text-gray-400 flex items-center justify-between'
                >
                  <span>Xác nhận mật khẩu</span>
                  <span className='text-gray-500 text-[11px] font-normal'>Khớp với mật khẩu trên</span>
                </label>
                <Input
                  register={register}
                  name='confirm_Password'
                  type='password'
                  errorMessage={errors.confirm_Password?.message}
                  icon='visibility_off'
                  placeholder='Nhập lại mật khẩu'
                />
                {/* <div className='relative flex items-center'>
                  <input
                    id='reg_confirm_password'
                    {...register('confirm_Password')}
                    type='password'
                    required
                    placeholder='Nhập lại mật khẩu'
                    className='w-full bg-gray-800 pl-4 pr-11 py-2.5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />
                  <div className='absolute right-3 flex items-center gap-1'>
                   
                    <button
                      type='button'
                      aria-label='Toggle confirm password visibility'
                      className='text-gray-400 hover:text-white p-1 transition-colors'
                    >
                      <span className='material-symbols-outlined text-[20px]'>visibility</span>
                    </button>
                  </div>
                </div>
                {errors.confirm_Password?.message && <p>{errors.confirm_Password?.message}</p>} */}
              </div>

              {/* Date of birth */}
              <div className='flex flex-col gap-1.5 pt-1'>
                <label className='text-sm font-medium text-gray-400'>Ngày sinh</label>
                <div className='grid grid-cols-3 gap-2'>
                  {/* Ngày */}
                  <div className='relative'>
                    <select
                      {...register('dob_day')} // Đăng ký với RHF (dùng as any để tránh lỗi TS)
                      className='w-full bg-gray-800 py-2.5 px-3 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 cursor-pointer text-[15px]'
                    >
                      <option value='' disabled>
                        Ngày
                      </option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const v = String(i + 1).padStart(2, '0')
                        return (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                    <span className='material-symbols-outlined text-gray-400 text-[18px] absolute right-2.5 top-3 pointer-events-none'>
                      expand_more
                    </span>
                  </div>

                  {/* Tháng */}
                  <div className='relative'>
                    <select
                      {...register('dob_month')}
                      className='w-full bg-gray-800 py-2.5 px-3 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 cursor-pointer text-[15px]'
                    >
                      <option value='' disabled>
                        Tháng
                      </option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const v = String(i + 1).padStart(2, '0')
                        return (
                          <option key={v} value={v}>
                            Tháng {i + 1}
                          </option>
                        )
                      })}
                    </select>
                    <span className='material-symbols-outlined text-gray-400 text-[18px] absolute right-2.5 top-3 pointer-events-none'>
                      expand_more
                    </span>
                  </div>

                  {/* Năm */}
                  <div className='relative'>
                    <select
                      {...register('dob_year')}
                      className='w-full bg-gray-800 py-2.5 px-3 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 cursor-pointer text-[15px]'
                    >
                      <option value='' disabled>
                        Năm
                      </option>
                      {Array.from({ length: 2026 - 1930 + 1 }, (_, i) => {
                        const v = String(2026 - i)
                        return (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                    <span className='material-symbols-outlined text-gray-400 text-[18px] absolute right-2.5 top-3 pointer-events-none'>
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Trường ẩn chứa giá trị ngày sinh chuẩn để gửi API */}
                <input type='hidden' {...register('date_Of_Birth')} />
                {errors.date_Of_Birth?.message && (
                  <p className='text-xs text-red-500 mt-1 px-2'>{errors.date_Of_Birth?.message}</p>
                )}
                <p className='text-xs leading-relaxed text-gray-500 mt-0.5'>
                  Thông tin này sẽ không được hiển thị công khai. Hãy xác nhận độ tuổi của bạn ngay cả khi tài khoản này
                  dành cho doanh nghiệp hoặc thú cưng.
                </p>
              </div>

              {/* Terms */}
              <div className='flex items-start gap-3 mt-1 cursor-pointer'>
                <div className='relative flex items-center justify-center mt-0.5'>
                  <input
                    id='terms_agree'
                    type='checkbox'
                    required
                    className='peer appearance-none w-4 h-4 rounded border border-gray-600 bg-gray-800 checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer'
                  />
                  <span className='material-symbols-outlined text-white text-[14px] absolute pointer-events-none opacity-0 peer-checked:opacity-100 font-bold'>
                    check
                  </span>
                </div>
                <label htmlFor='terms_agree' className='text-xs leading-snug text-gray-400 select-none cursor-pointer'>
                  Tôi đồng ý với{' '}
                  <a href='#' className='text-blue-400 hover:underline'>
                    Điều khoản Dịch vụ
                  </a>
                  ,{' '}
                  <a href='#' className='text-blue-400 hover:underline'>
                    Chính sách Quyền riêng tư
                  </a>{' '}
                  và cách sử dụng Cookie của nền tảng.
                </label>
              </div>

              {/* Submit */}
              <button
                type='submit'
                className='w-full mt-3 py-3 px-6 rounded-full bg-blue-500 hover:bg-blue-400 active:scale-[0.98] text-white font-semibold shadow-lg shadow-blue-500/20 transition-all duration-150 flex items-center justify-center gap-2 group'
              >
                <span>Đăng ký tài khoản</span>
              </button>
            </form>

            {/* Footer */}
            <div className='mt-6 pt-5 border-t border-gray-800 flex items-center justify-center gap-1.5 relative z-10'>
              <span className='text-sm text-gray-500'>Đã có tài khoản VibeOn?</span>
              <Link
                to='/login'
                className='text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors'
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
