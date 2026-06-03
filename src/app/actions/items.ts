'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export type ItemState = { error?: string }

export async function addItem(prevState: ItemState, formData: FormData): Promise<ItemState> {
  const listId = formData.get('listId') as string
  const name = (formData.get('name') as string)?.trim()
  const url = (formData.get('url') as string)?.trim() || null

  if (!name) return { error: 'Item description is required.' }
  if (name.length > 500) return { error: 'Item description must be 500 characters or fewer.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be signed in.' }

  const { error } = await supabase
    .from('items')
    .insert({ list_id: listId, name, url })

  if (error) return { error: 'Something went wrong. Please try again.' }

  revalidatePath(`/lists/${listId}`)
  redirect(`/lists/${listId}`)
}

export async function updateItem(prevState: ItemState, formData: FormData): Promise<ItemState> {
  const itemId = formData.get('itemId') as string
  const listId = formData.get('listId') as string
  const name = (formData.get('name') as string)?.trim()
  const url = (formData.get('url') as string)?.trim() || null

  if (!name) return { error: 'Item description is required.' }
  if (name.length > 500) return { error: 'Item description must be 500 characters or fewer.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be signed in.' }

  const { error } = await supabase
    .from('items')
    .update({ name, url })
    .eq('id', itemId)

  if (error) return { error: 'Something went wrong. Please try again.' }

  revalidatePath(`/lists/${listId}`)
  redirect(`/lists/${listId}`)
}

export async function deleteItem(formData: FormData): Promise<void> {
  const itemId = formData.get('itemId') as string
  const listId = formData.get('listId') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('items').delete().eq('id', itemId)

  revalidatePath(`/lists/${listId}`)
  redirect(`/lists/${listId}`)
}
