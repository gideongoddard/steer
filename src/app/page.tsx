import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from './actions/auth'
import { removeSavedList } from './actions/claims'
import styles from './dashboard.module.css'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signin')

  const [{ data: lists }, { data: savedLists }] = await Promise.all([
    supabase
      .from('lists')
      .select('id, name')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('list_saves')
      .select('id, list_id, lists(id, name, share_code)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>My lists</h1>
        <form action={signOut}>
          <button type="submit" className={styles.signOutButton}>Sign out</button>
        </form>
      </header>
      <main>
        {lists && lists.length > 0 ? (
          <ul className={styles.listGrid}>
            {lists.map((list) => (
              <li key={list.id}>
                <Link href={`/lists/${list.id}`} className={styles.listCard}>
                  <span className={styles.listName}>{list.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>You don&apos;t have any lists yet.</p>
            <Link href="/lists/new" className={styles.ctaButton}>Create your first list</Link>
          </div>
        )}

        {savedLists && savedLists.length > 0 && (
          <section className={styles.sharedSection}>
            <h2 className={styles.sectionTitle}>Shared lists</h2>
            <ul className={styles.listGrid}>
              {savedLists.map((save) => {
                const list = save.lists as unknown as { id: string; name: string; share_code: string } | null
                if (!list) return null
                return (
                  <li key={save.id} className={styles.savedListItem}>
                    <Link href={`/share/${list.share_code}`} className={styles.listCard}>
                      <span className={styles.listName}>{list.name}</span>
                    </Link>
                    <form action={removeSavedList}>
                      <input type="hidden" name="listId" value={list.id} />
                      <button type="submit" className={styles.removeButton}>Remove</button>
                    </form>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
