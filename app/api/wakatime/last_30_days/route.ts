import { NextResponse } from 'next/server'
import { getLast30DaysStats } from '@/lib/wakatime'

export async function GET() {
  const res = await getLast30DaysStats()

  if (!res.ok) {
    throw new Error('failed to fetch wakatime data')
  }

  const data = await res.json()

  return NextResponse.json({ data })
}