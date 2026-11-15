import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import tweetsApi from '~/apis/tweets.api'
import { createTweetRules } from '~/rules/tweets.rule'
import { TweetAudience, TweetType } from '~/types/enum.type'
import type { BodyCreateTweet } from '~/types/tweets.type'
import { useUploadMedia } from '~/hooks/useUploadMedia'
import { useMentionHashtag } from '~/hooks/useMentionHashtag'
import { extractHashtags } from '~/utils/utils'
import CharCounter, { MAX_CHARS } from '~/components/CharCounter/CharCounter'
import AudienceSelect from '~/components/AudienceSelect/AudienceSelect'
import SuggestionDropdown from '~/components/SuggestionDropdown/SuggestionDropdown'
import MediaCarousel from '~/components/MediaCarousel/MediaCarousel'
import HighlightedTextarea from '~/components/HighlightedTextarea/HighlightedTextarea'

const MAX_MEDIAS = 4

interface Props {
  onSuccess?: () => void
  autoFocus?: boolean
}

export default function CreateTweet({ onSuccess, autoFocus }: Props) {
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { watch, setValue, handleSubmit, reset } = useForm<BodyCreateTweet>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(createTweetRules) as any,
    defaultValues: {
      type: TweetType.Tweet,
      audience: TweetAudience.Everyone,
      content: '',
      parent_id: null,
      hashtags: [],
      mentions: [],
      medias: []
    }
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const content = watch('content') || ''
  const audience = watch('audience')

  const { medias, upload, isUploading, removeMedia, resetMedias } = useUploadMedia()

  const mention = useMentionHashtag({
    content,
    setContent: (value) => setValue('content', value),
    textareaRef
  })

  // Kéo thả vào cả composer; bấm icon ảnh ở toolbar thì gọi open()
  const handleDrop = (files: File[]) => {
    const remaining = MAX_MEDIAS - medias.length
    if (remaining <= 0) {
      toast.warn(`Tối đa ${MAX_MEDIAS} ảnh/video`)
      return
    }
    upload(files.slice(0, remaining))
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'], 'video/*': ['.mp4', '.mov'] },
    noClick: true,
    noKeyboard: true
  })

  const createTweetMutation = useMutation({
    mutationFn: (body: BodyCreateTweet) => tweetsApi.createTweet(body),
    onSuccess: () => {
      toast.success('Đăng Vibe thành công!')
      reset()
      resetMedias()
      mention.resetMentions()
      queryClient.invalidateQueries({ queryKey: ['newsfeed'] })
      onSuccess?.()
    },
    onError: () => toast.error('Đăng bài thất bại!')
  })

  const onSubmit = (data: BodyCreateTweet) => {
    createTweetMutation.mutate({
      ...data,
      parent_id: data.parent_id || null,
      hashtags: extractHashtags(data.content),
      mentions: mention.getMentionIds(),
      medias
    })
  }

  const isSubmitDisabled =
    (!content.trim() && medias.length === 0) ||
    content.length > MAX_CHARS ||
    createTweetMutation.isPending ||
    isUploading

  return (
    <div {...getRootProps()} className='relative flex gap-3 bg-[#0a0f14] p-4'>
      <input {...getInputProps()} />

      {/* Overlay khi đang kéo file vào */}
      {isDragActive && (
        <div className='pointer-events-none absolute inset-2 z-20 flex items-center justify-center rounded-2xl border-2 border-dashed border-[#1d9bf0] bg-[#0a0f14]/90 text-[15px] font-semibold text-[#1d9bf0]'>
          Thả ảnh/video vào đây
        </div>
      )}

      {/* Avatar */}
      <div className='h-11 w-11 shrink-0 rounded-full bg-gradient-to-tr from-[#1d9bf0] via-[#353a3f] to-[#4adf9d] p-[2px]'>
        <div className='flex h-full w-full items-center justify-center rounded-full bg-[#0a0f14] text-[17px] font-bold text-[#1d9bf0]'>
          HB
        </div>
      </div>

      <div className='flex min-w-0 flex-1 flex-col'>
        <AudienceSelect value={audience} onChange={(v) => setValue('audience', v)} />

        {/* Nhập nội dung */}
        <div className='relative w-full'>
          <HighlightedTextarea
            className='mt-1'
            textareaRef={textareaRef}
            value={content}
            autoFocus={autoFocus}
            onChange={mention.handleChange}
            onKeyDown={mention.handleKeyDown}
            onBlur={mention.close}
            rows={2}
            placeholder='Chuyện gì đang xảy ra trong tần số của bạn?...'
          />
          {mention.isOpen && (
            <SuggestionDropdown
              title={mention.suggestionType === '@' ? 'Người dùng' : 'Hashtags'}
              items={mention.items}
              activeIndex={mention.activeIndex}
              onSelect={mention.select}
            />
          )}
        </div>

        {/* Media */}
        <MediaCarousel medias={medias} onRemove={removeMedia} />
        {isUploading && <div className='mt-3 h-24 animate-pulse rounded-2xl bg-[#1b2025]' />}

        {/* Toolbar */}
        <div className='mt-3 flex items-center justify-between border-t border-[#30353b]/60 pt-3'>
          <button
            type='button'
            onClick={open}
            disabled={medias.length >= MAX_MEDIAS || isUploading}
            title='Thêm ảnh/video'
            className='flex h-9 w-9 items-center justify-center rounded-full text-[#1d9bf0] transition-colors hover:bg-[#1d9bf0]/10 disabled:pointer-events-none disabled:opacity-40'
          >
            <span className='material-symbols-outlined text-[22px]'>image</span>
          </button>

          <div className='flex items-center gap-4'>
            <CharCounter count={content.length} />
            <button
              type='button'
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitDisabled}
              className='rounded-full bg-[#1d9bf0] px-5 py-1.5 text-[15px] font-semibold text-white shadow-[0_0_15px_rgba(29,155,240,0.35)] transition-all hover:bg-[#1a8cd8] active:scale-95 disabled:pointer-events-none disabled:opacity-50'
            >
              {createTweetMutation.isPending ? 'Đang đăng...' : 'Đăng Vibe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
