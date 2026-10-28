import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import logoImg from '~/imgs/a.png'
import { registerRules } from '~/rules/auth.rule'
import type { errorResponse } from '~/types/auth.type'
import { setProfile } from '~/utils/auth'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

const loginSchema = registerRules.pick(['email', 'password'])

interface FormData {
  email: string
  password: string
}
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginApi(body)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        const res = await authApi.getMeApi()
        const { _id, date_of_birth, email, name, username } = res.data.result
        setProfile({ _id, date_of_birth, email, name, username })
        navigate('/')
        toast.success('Đăng nhập thành công !')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<errorResponse>(errors)) {
          const formErrors = errors.response?.data.error
          if (formErrors?.email) {
            setError('email', { message: formErrors.email.msg })
          }
          if (formErrors?.password) {
            setError('password', { message: formErrors.email.msg })
          }
        }
      }
    })
  })

  return (
    <div className='bg-background text-gray-200 font-sans flex min-h-screen flex-col items-center justify-center p-4'>
      <main className='w-full max-w-md mx-auto'>
        <div className='flex flex-col w-full'>
          {/* Khung Card */}
          <div className='relative w-full max-w-lg mx-auto my-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden'>
            {/* Background glow */}
            <div className='absolute -top-24 -left-20 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-24 -right-20 w-56 h-56 bg-green-500/10 rounded-full blur-3xl pointer-events-none' />

            {/* Header */}
            <div className='flex flex-col items-center text-center mb-6 relative z-10'>
              <div className='mb-3 flex justify-center items-center'>
                {/* Thay src bằng ảnh logo của bạn */}
                <img
                  src={logoImg}
                  alt='VibeOn Logo'
                  className='w-14 h-14 rounded-2xl shadow-lg hover:scale-105 transition-transform'
                />
              </div>
              <span className='text-xs font-semibold text-blue-500 tracking-widest uppercase mb-1'>
                Bảo mật đa tầng • OAuth 2.0
              </span>
              <h1 className='text-2xl font-bold text-white tracking-tight mb-1'>Chào mừng bạn trở lại</h1>
              <p className='text-sm text-gray-400'>Đăng nhập vào không gian thảo luận thời gian thực VibeOn</p>
            </div>

            {/* Social Buttons */}
            <div className='flex flex-col gap-2.5 mb-6 relative z-10'>
              <button
                type='button'
                className='w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-150 active:scale-[0.98] shadow-sm font-medium'
              >
                <svg className='w-4 h-4' viewBox='0 0 24 24'>
                  <path
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                    fill='#EA4335'
                  />
                </svg>
                <span>Đăng nhập bằng Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className='flex items-center gap-3 mb-5'>
              <div className='flex-1 h-px bg-gray-800' />
              <span className='text-xs font-medium text-gray-500 px-1 uppercase tracking-wider'>Hoặc</span>
              <div className='flex-1 h-px bg-gray-800' />
            </div>

            {/* Form */}
            <form className='flex flex-col gap-4 relative z-10' onSubmit={onSubmit}>
              {/* Email */}
              <div className='flex flex-col gap-1.5'>
                <label htmlFor='email' className='text-sm font-medium text-gray-400 flex items-center justify-between'>
                  <span>Địa chỉ Email</span>
                  <span className='text-gray-500 text-[11px] font-normal'>Bắt buộc</span>
                </label>
                <div className='relative flex items-center'>
                  <input
                    {...register('email')}
                    type='email'
                    placeholder='nguyenhoanbao4@gmail.com'
                    className='w-full bg-gray-800 px-4 py-2.5 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />

                  <span className='material-symbols-outlined text-gray-400 text-[20px] absolute right-4 pointer-events-none'>
                    alternate_email
                  </span>
                </div>
                {errors.email?.message && <p>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-sm font-medium text-gray-400'>
                    Mật khẩu
                  </label>
                  <a href='#' className='text-xs text-blue-400 hover:text-blue-300 transition-colors'>
                    Quên mật khẩu?
                  </a>
                </div>
                <div className='relative flex items-center'>
                  <input
                    {...register('password')}
                    type='password'
                    placeholder='••••••••••••'
                    className='w-full bg-gray-800 pl-4 pr-11 py-2.5 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px]'
                  />
                  <button
                    type='button'
                    className='absolute right-4 text-gray-400 hover:text-white p-1 transition-colors'
                  >
                    <span className='material-symbols-outlined text-[20px]'>visibility</span>
                  </button>
                </div>
                {errors.password?.message && <p>{errors.password?.message}</p>}
              </div>

              {/* Remember me */}
              <div className='flex items-center gap-2 mt-1'>
                <input
                  id='remember'
                  type='checkbox'
                  className='w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/40 cursor-pointer'
                />
                <label htmlFor='remember' className='text-xs text-gray-400 cursor-pointer'>
                  Ghi nhớ đăng nhập trên thiết bị này
                </label>
              </div>

              {/* Submit */}
              <button
                type='submit'
                className='w-full mt-3 py-3 px-6 rounded-full bg-blue-500 hover:bg-blue-400 active:scale-[0.98] text-white font-semibold shadow-lg shadow-blue-500/20 transition-all duration-150 flex items-center justify-center'
              >
                Đăng nhập
              </button>
            </form>

            {/* 2FA Info */}
            {/* <div className='mt-6 p-3 rounded-xl bg-gray-800/50 flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400'>
                <span className='material-symbols-outlined text-[18px]'>verified_user</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xs font-semibold text-green-400'>Xác thực 2 lớp (2FA) được kích hoạt</span>
                <span className='text-[11px] text-gray-400'>Mọi phiên đăng nhập đều được mã hóa bằng SHA-256.</span>
              </div>
            </div> */}

            {/* Footer */}
            <div className='mt-6 pt-5 border-t border-gray-800 flex items-center justify-center gap-1.5 relative z-10'>
              <span className='text-sm text-gray-500'>Chưa có tài khoản VibeOn?</span>
              <Link
                to='/register'
                className='text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors'
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
