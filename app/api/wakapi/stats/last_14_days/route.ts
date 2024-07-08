import { NextResponse } from 'next/server'
import { getLast14DaysStats } from '@/lib/wakapi'

export async function GET() {
  const res = await getLast14DaysStats()

  if (!res.ok) {
    throw new Error('failed to fetch wakatime data')
  }

  const data = await res.json()

  return NextResponse.json({ data })
}