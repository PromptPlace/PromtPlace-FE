import { useState } from 'react'

type TagFilterProps = {
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
}

export default function TagFilter({ placeholder = '태그를 입력해주세요.', tags, setTags }: TagFilterProps) {
  const [input, setInput] = useState('')

  const addTag = (tag: string) => {
    const cleaned = tag.trim().replace(/^#/, '')
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned])
    }
  }

  const handleAddTags = () => {
    const splitTags = input
      .split(/[\s,]+/)
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean)
    splitTags.forEach(addTag)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ' ', ','].includes(e.key)) {
      e.preventDefault()
      handleAddTags()
    }
  }

  const handleDelete = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <div className="relative w-[490px] h-14">
      {/* 태그 입력 박스 */}
      <div className="absolute inset-0 flex flex-wrap items-center gap-2 rounded-lg border border-blue-500 bg-white px-4 py-3 shadow-md">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="flex items-center gap-1 rounded-full border border-gray-800 bg-white px-3 py-1 shadow-sm"
          >
            <span className="text-sm text-gray-800">#{tag}</span>
            <button
              onClick={() => handleDelete(tag)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none text-xs"
            >
              ✕
            </button>
          </div>
        ))}
        {/* 입력창 */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow min-w-[100px] border-none text-sm text-gray-800 focus:outline-none"
        />
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={handleAddTags}
        className="absolute right-4 top-3 h-8 rounded-lg border border-blue-500 bg-white px-4 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 transition"
      >
        완료
      </button>
    </div>
  )
}
