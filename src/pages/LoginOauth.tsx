import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LoginOauth() {
  const naviGate = useNavigate()
  const [params] = useSearchParams()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    if (access_token && refresh_token) {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      naviGate('/')
      toast.success('Login Success')
    } else {
      naviGate('/login')
    }
  }, [params, naviGate])
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-20 h-18 flex justify-center items-center'>
        <svg fill='hsl(228, 97%, 42%)' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <rect x='1' y='4' width='6' height='14' opacity='1'>
            <animate
              id='spinner_aqiq'
              begin='0;spinner_xVBj.end-0.25s'
              attributeName='y'
              dur='0.75s'
              values='1;5'
              fill='freeze'
            />
            <animate begin='0;spinner_xVBj.end-0.25s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='0;spinner_xVBj.end-0.25s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
          <rect x='9' y='4' width='6' height='14' opacity='.4'>
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='y' dur='0.75s' values='1;5' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
          <rect x='17' y='4' width='6' height='14' opacity='.3'>
            <animate
              id='spinner_xVBj'
              begin='spinner_aqiq.begin+0.3s'
              attributeName='y'
              dur='0.75s'
              values='1;5'
              fill='freeze'
            />
            <animate begin='spinner_aqiq.begin+0.3s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.3s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
        </svg>
      </div>
    </div>
  )
}
