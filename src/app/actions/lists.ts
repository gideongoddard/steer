'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export type ListState = { error?: string }

function generateShareCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

export async function updateList(prevState: ListState, formData: FormData): Promise<ListState> {
  const listId = formData.get('listId') as string
  const name = (formData.get('name') as string)?.trim()

  if (!name) return { error: 'List name is required.' }
  if (name.length > 100) return { error: 'List name must be 100 characters or fewer.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be signed in.' }

  const { data: list } = await supabase.from('lists').select('user_id').eq('id', listId).single()
  if (!list || list.user_id !== user.id) return { error: 'Not authorised.' }

  const { error } = await supabase.from('lists').update({ name }).eq('id', listId)
  if (error) return { error: 'Something went wrong. Please try again.' }

  revalidatePath(`/lists/${listId}`)
  redirect(`/lists/${listId}`)
}

export async function deleteList(formData: FormData): Promise<void> {
  const listId = formData.get('listId') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Verify ownership before deleting
  const { data: list } = await supabase
    .from('lists')
    .select('user_id')
    .eq('id', listId)
    .single()

  if (!list || list.user_id !== user.id) return

  await supabase.from('lists').delete().eq('id', listId)
  redirect('/')
}

export async function createList(prevState: ListState, formData: FormData): Promise<ListState> {
  const name = (formData.get('name') as string)?.trim()

  if (!name) {
    return { error: 'List name is required.' }
  }

  if (name.length > 100) {
    return { error: 'List name must be 100 characters or fewer.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to create a list.' }
  }

  const { data, error } = await supabase
    .from('lists')
    .insert({ name, user_id: user.id, share_code: generateShareCode() })
    .select('id')
    .single()

  if (error) {
    return { error: 'Something went wrong. Please try again.' }
  }

  redirect(`/lists/${data.id}`)
}
