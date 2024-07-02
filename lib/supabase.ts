'use server'

import { createClient } from '@supabase/supabase-js'
import { unstable_noStore as noStore } from 'next/cache'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServerKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey)

export async function fetchAndIncrementViewCount(slug: string): Promise<number | null> {
  await SupabaseAdmin.rpc('increment_page_view', {
    page_slug: slug,
  })

  return fetchViewCount(slug)
}

export async function fetchViewCount(slug: string): Promise<number | null> {
  noStore()
  const { data } = await SupabaseAdmin.from('pages')
    .select('view_count')
    .eq('slug', slug)

  if (data && data.length > 0)
    return data[0].view_count

  return null
}

export async function fetchAllViewCounts(): Promise<Record<string, number>> {
  const { data } = await SupabaseAdmin.from('pages').select('*')
  // efficient way to lookup slug to view_count later
  const viewCounts: Record<string, number> = {}

  if (data) {
    data.forEach((page) => {
      viewCounts[page.slug] = page.view_count
    })
  }

  return viewCounts
}
