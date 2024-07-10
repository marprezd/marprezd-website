import { NextResponse } from 'next/server'
import { getSummariesYesterday } from '@/lib/wakapi'

export async function GET() {
  const res = await getSummariesYesterday()

  if (!res.ok) {
    throw new Error('failed to fetch wakatime data')
  }

  const data = await res.json()

  return NextResponse.json({ data })
}
