'use client'

import type { MouseEventHandler } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useState } from 'react'
import { copyToClipboard } from '@/lib/utils'

function MarkdownCopyCodeButton({ className }: { className?: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const parent = e.currentTarget.parentElement

    if (!parent)
      return

    const copied = await copyToClipboard(parent.textContent!)

    setIsCopied(copied)
    setTimeout(() => {
      setIsCopied(false)
    }, 3500)
  }

  return (
    <button aria-label="Copy Code" className={className} onClick={handleClick}>
      {isCopied ? <IconCheck className="shrink-0" size={20} /> : <IconCopy className="shrink-0" size={20} />}
    </button>
  )
}

export default MarkdownCopyCodeButton
