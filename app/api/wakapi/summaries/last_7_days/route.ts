import { NextResponse } from 'next/server'
import { getSummariesLast7DaysStats } from '@/lib/wakapi'

export async function GET() {
  const res = await getSummariesLast7DaysStats()

  if (!res.ok) {
    throw new Error('failed to fetch wakatime data')
  }

  const data = await res.json()

  return NextResponse.json({ data })
}