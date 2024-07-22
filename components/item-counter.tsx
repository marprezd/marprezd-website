import { IconChevronRight } from '@tabler/icons-react'
import React from 'react'

interface ItemCounterProps {
  number: any
}
export function ItemCounter({ number }: ItemCounterProps) {
  return (
    <div className="flex items-center gap-1 text-default-400">
      <span className="text-small">{number}</span>
      <IconChevronRight className="text-xl" />
    </div>
  )
}
