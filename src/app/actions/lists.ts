'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type ListState = { error?: string }

function generateShareCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
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
