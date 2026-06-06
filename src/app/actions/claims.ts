'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { trackEvent } from '@/utils/mixpanel/server'

export async function claimItem(formData: FormData): Promise<void> {
  console.log('[claimItem] called')
  const itemId = formData.get('itemId') as string
  const shareCode = formData.get('shareCode') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('claims').insert({ item_id: itemId, user_id: user.id })
  await trackEvent('item_claimed', user.id, { item_id: itemId, share_code: shareCode })
  revalidatePath(`/share/${shareCode}`)
}

export async function unclaimItem(formData: FormData): Promise<void> {
  const itemId = formData.get('itemId') as string
  const shareCode = formData.get('shareCode') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('claims').delete().eq('item_id', itemId).eq('user_id', user.id)
  revalidatePath(`/share/${shareCode}`)
}

export async function removeSavedList(formData: FormData): Promise<void> {
  const listId = formData.get('listId') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('list_saves').delete().eq('list_id', listId).eq('user_id', user.id)
  revalidatePath('/')
}
