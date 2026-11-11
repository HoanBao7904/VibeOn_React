import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import useQueryParams from '~/hooks/useQueryParams'
import type { errorResponse } from '~/types/auth.type'
import { setAccessToken, setRefetchToken } from '~/utils/auth'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export default function VerifyEmail() {
  const query = useQueryParams()
  const navigate = useNavigate()
  const token = query.token

  const verifyMutation = useMutation({
    mutationFn: () => authApi.verifyEmailApi(token),
    onSuccess: (data) => {
      setAccessToken(data.data.result.acess_token)
      setRefetchToken(data.data.result.refresh_token)
      toast.success(data.data.message)
      navigate('/login')
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
        toast.error(error.response?.data.message)
      }
    }
  })

  useEffect(() => {
    if (token) {
      verifyMutation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <div>VerifyEmail</div>
}
