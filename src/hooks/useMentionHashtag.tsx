import { useState, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react'
import { useQuery } from '@tanstack/react-query'
import searchsApi from '~/apis/searchs.api'
import { useDebounce } from './useDebounce'

// Chỉnh lại type cho khớp với searchs.type của bạn
export type MentionUser = { _id: string; name: string; username: string; avatar?: string }
type HashtagItem = { _id: string; name: string }
type Trigger = '@' | '#'
type SuggestionState = { type: Trigger | null; query: string; startIndex: number }

export type SuggestionItem = {
  key: string
  label: string
  sublabel?: string
  avatar?: string
  insertText: string
  user?: MentionUser
}

const CLOSED: SuggestionState = { type: null, query: '', startIndex: -1 }
// @ hoặc # phải ở đầu chuỗi hoặc sau khoảng trắng (tránh bắt email)
const TRIGGER_REGEX = /(?:^|\s)([@#])([\p{L}\p{N}_]*)$/u

interface Options {
  content: string
  setContent: (value: string) => void
  textareaRef: RefObject<HTMLTextAreaElement | null>
}

export function useMentionHashtag({ content, setContent, textareaRef }: Options) {
  const [suggestion, setSuggestion] = useState<SuggestionState>(CLOSED)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mentions, setMentions] = useState<MentionUser[]>([])

  const debouncedQuery = useDebounce(suggestion.query, 250)

  const { data: hashtagData } = useQuery({
    queryKey: ['searchHashtags', debouncedQuery],
    queryFn: () => searchsApi.searchHashtags({ q: debouncedQuery }),
    enabled: suggestion.type === '#' && debouncedQuery.length > 0,
    staleTime: 60 * 1000
  })

  const { data: mentionData } = useQuery({
    queryKey: ['searchMentions', debouncedQuery],
    queryFn: () => searchsApi.searchMentions({ q: debouncedQuery }),
    enabled: suggestion.type === '@' && debouncedQuery.length > 0,
    staleTime: 60 * 1000
  })

  // Chuẩn hóa về 1 kiểu item để dropdown render chung
  const items: SuggestionItem[] = (() => {
    if (suggestion.type === '@') {
      const users = (mentionData?.data.result ?? []) as MentionUser[]
      return users.map((u) => ({
        key: u._id,
        label: u.name,
        sublabel: `@${u.username}`,
        avatar: u.avatar,
        insertText: `@${u.username}`,
        user: u
      }))
    }
    if (suggestion.type === '#' && suggestion.query) {
      const tags = (hashtagData?.data.result ?? []) as HashtagItem[]
      const list = tags.map((t) => ({ key: t._id, label: `#${t.name}`, insertText: `#${t.name}` }))
      const exists = tags.some((t) => t.name.toLowerCase() === suggestion.query.toLowerCase())
      return exists
        ? list
        : [
            {
              key: 'new',
              label: `#${suggestion.query}`,
              sublabel: 'Hashtag mới',
              insertText: `#${suggestion.query}`
            },
            ...list
          ]
    }
    return []
  })()

  const isOpen = suggestion.type !== null && items.length > 0

  const close = () => setSuggestion(CLOSED)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)

    const textBeforeCursor = text.slice(0, e.target.selectionStart)
    const match = textBeforeCursor.match(TRIGGER_REGEX)

    setActiveIndex(0)
    setSuggestion(
      match
        ? {
            type: match[1] as Trigger,
            query: match[2],
            startIndex: textBeforeCursor.length - match[2].length - 1
          }
        : CLOSED
    )
  }

  const select = (item: SuggestionItem) => {
    const { startIndex, query } = suggestion
    const before = content.slice(0, startIndex)
    const after = content.slice(startIndex + query.length + 1)
    const inserted = item.insertText + ' '

    setContent(before + inserted + after)

    if (item.user) {
      setMentions((prev) => (prev.some((u) => u._id === item.user!._id) ? prev : [...prev, item.user!]))
    }

    close()
    const cursorPos = before.length + inserted.length
    requestAnimationFrame(() => {
      textareaRef.current?.focus()
      textareaRef.current?.setSelectionRange(cursorPos, cursorPos)
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + items.length) % items.length)
        break
      case 'Enter':
      case 'Tab':
        e.preventDefault()
        select(items[activeIndex])
        break
      case 'Escape':
        close()
        break
    }
  }

  // Chỉ gửi ID của những người còn xuất hiện trong nội dung
  const getMentionIds = () => mentions.filter((u) => content.includes(`@${u.username}`)).map((u) => u._id)

  const resetMentions = () => {
    setMentions([])
    close()
  }

  return {
    suggestionType: suggestion.type,
    items,
    isOpen,
    activeIndex,
    handleChange,
    handleKeyDown,
    select,
    close,
    getMentionIds,
    resetMentions
  }
}
