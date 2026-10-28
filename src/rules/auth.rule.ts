import * as yup from 'yup'

const handleConfirmPassword = (passwordField: string) => {
  return yup
    .string()
    .required('Mật khẩu ép buộc phải nhập')
    .min(6, 'Nhập mật khẩu ít nhất 6 kí tự')
    .max(50, 'Nhập mật khẩu không quá 50 kí tự')
    .oneOf([yup.ref(passwordField)], 'Nhập lại mật khẩu không khớp')
}

export const registerRules = yup.object({
  // name: yup
  //   .string()
  //   .required('Name không được bỏ trống')
  //   .min(4, 'độ dài có tối đa 50 kí tự')
  //   .max(50, 'độ dài có tối đa 50 kí tự'),
  name: yup.string().required('Tên không được để trống').min(4, 'Tên ít nhất 4 kí tự').max(50, 'Tên tối đa 50 kí tự'),
  email: yup.string().email('Định dạng email không đúng').required('Email không được để trống'),
  password: yup
    .string()
    .required('Mật khẩu ép buộc phải nhập')
    .min(6, 'Nhập mật khẩu ít nhất 6 kí tự')
    .max(50, 'Nhập mật khẩu không quá 50 kí tự'),
  confirm_Password: handleConfirmPassword('password'),
  // date_Of_Birth: yup.date().max(new Date(), 'hãy chọn ngày trong quá khứ').required()
  date_Of_Birth: yup.string().test('isPast', 'Hãy chọn ngày trong quá khứ', (valueDate) => {
    console.log('date_Of_Birth value:', valueDate)
    if (!valueDate) return false
    return new Date(valueDate) <= new Date()
    // const date = new Date(valueDate)
    // return !isNaN(date.getTime()) && date <= new Date()
  }),
  dob_day: yup.string().optional(),
  dob_month: yup.string().optional(),
  dob_year: yup.string().optional()
})
