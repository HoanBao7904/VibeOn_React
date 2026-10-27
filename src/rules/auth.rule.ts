import * as yup from 'yup'

export const register = yup.object({
  name: yup.string().max(50, 'độ dài có tối đa 50 kí tự').min(4, 'độ dài có tối đa 50 kí tự').required(),
  email: yup.string().email().required(),
  password: yup.string(),
  confirm_Password: yup.string(),
  date_Of_Birth: yup.string()
})
