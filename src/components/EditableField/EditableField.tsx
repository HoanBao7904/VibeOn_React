import type { EditTableField } from '~/pages/EditProfile'
import Button from '../Button'
import Input from '../Input'
import type { UseFormRegister } from 'react-hook-form'
import type { UpdateFormData } from '~/rules/auth.rule'
import type { Me } from '~/types/auth.type'
import type { SubmitEventHandler } from 'react'
interface Props {
  editingField: EditTableField
  activeEditingField: EditTableField | null
  register: UseFormRegister<UpdateFormData>
  onCancel: React.MouseEventHandler<HTMLButtonElement>
  onOpenEdit: React.MouseEventHandler<HTMLButtonElement>
  onsubmit: SubmitEventHandler<HTMLFormElement>
  // onclick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  isLoading: boolean
  me?: Me
  label: string
  type: React.HTMLInputTypeAttribute
}

export default function EditableField(Props: Props) {
  const {
    me,
    type,
    onsubmit,
    activeEditingField,
    onCancel,
    onOpenEdit,
    editingField,
    register,
    disabled,
    isLoading,
    label
  } = Props
  const isEditing = editingField === activeEditingField

  // Hàm format ngày sinh
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa cập nhật'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Hàm lấy giá trị hiển thị dựa trên trường đang xét
  const getDisplayValue = () => {
    const value = me?.[editingField]

    if (editingField === 'date_of_birth') {
      return formatDate(value as string)
    }

    return value || 'Chưa cập nhật'
  }

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-semibold text-white'>{label}</label>
      {isEditing ? (
        <div className='flex flex-col gap-2'>
          <form onSubmit={onsubmit}>
            <div className='flex flex-col gap-2'>
              <Input
                register={register}
                type={type}
                name={editingField}
                className='w-full bg-[#1a2332] border border-[#1d9bf0] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] transition'
              />

              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  onClick={onCancel}
                  className='px-4 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-white bg-[#161f2e] rounded-lg'
                >
                  Hủy
                </Button>

                <Button
                  type='submit'
                  disabled={disabled}
                  isLoding={isLoading}
                  className='px-4 py-1.5 text-xs font-medium text-white bg-[#1d9bf0] hover:bg-sky-400 rounded-lg'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        // (
        //   <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
        //     <span className='text-white text-sm'>{me?.[editingField] || 'Chưa cập nhật'}</span>
        //     {me?.[editingField] === 'username' && (
        //       <span className='text-[11px] font-medium text-emerald-400 flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded'>
        //         <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span> Khả dụng
        //       </span>
        //     )}
        //     <Button
        //       className={
        //         editingField === 'username'
        //           ? 'text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
        //           : 'text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
        //       }
        //       isLoding={isLoading}
        //       onClick={onOpenEdit}
        //     />
        //   </div>
        // )
        <div className='flex items-center justify-between p-4 bg-[#161f2e]/40 border border-[#233044] rounded-xl group'>
          {editingField === 'website' ? (
            <a
              href={me?.website}
              target='_blank'
              rel='noreferrer'
              className='text-[#1d9bf0] hover:underline text-sm truncate pr-2'
            >
              {me?.website}
            </a>
          ) : (
            <div className='flex items-center gap-2'>
              {/* Nếu là username thì hiện dấu @ và màu cyan, ngược lại hiện text trắng */}
              {editingField === 'username' ? (
                <span className='text-cyan-400 font-mono text-sm'>@{me?.[editingField]}</span>
              ) : (
                <span className='text-white text-sm'>{getDisplayValue()}</span>
              )}
            </div>
          )}

          <div className='flex items-center gap-2'>
            {/* Hiện tag Khả dụng nếu là username */}
            {editingField === 'username' && (
              <span className='text-[11px] font-medium text-emerald-400 flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span> Khả dụng
              </span>
            )}

            <Button
              className='text-[#94a3b8] hover:text-[#1d9bf0] transition-colors'
              isLoding={isLoading}
              onClick={onOpenEdit}
            />
          </div>
        </div>
      )}
    </div>
  )
}
