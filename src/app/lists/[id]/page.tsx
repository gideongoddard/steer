import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import styles from './list.module.css'
import CopyShareLink from './CopyShareLink'
import ItemRow from './ItemRow'
import AddItemForm from './AddItemForm'

export default async function ListPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: list } = await supabase
    .from('lists')
    .select('id, name, share_code, user_id')
    .eq('id', id)
    .single()

  if (!list || list.user_id !== user.id) redirect('/')

  const { data: items } = await supabase
    .from('items')
    .select('id, list_id, name, url')
    .eq('list_id', list.id)
    .order('created_at', { ascending: true })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const shareUrl = `${siteUrl}/share/${list.share_code}`

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backLink}>← Dashboard</Link>
          <h1 className={styles.title}>{list.name}</h1>
        </div>
        <CopyShareLink url={shareUrl} />
      </header>
      <main>
        {items && items.length > 0 ? (
          <ul className={styles.itemList}>
            {items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <p className={styles.emptyItems}>No items yet — add one below.</p>
        )}
        <AddItemForm listId={list.id} />
      </main>
    </div>
  )
}
