"use client"

import { useEffect } from "react"

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>error</div>
  )
}
