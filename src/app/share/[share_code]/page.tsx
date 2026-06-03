import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { claimItem, unclaimItem } from '@/app/actions/claims'
import styles from './share.module.css'

export default async function SharePage({
  params,
}: {
  params: Promise<{ share_code: string }>
}) {
  const { share_code } = await params

  const supabase = await createClient()

  const { data: list } = await supabase
    .from('lists')
    .select('id, name, user_id')
    .eq('share_code', share_code)
    .single()

  if (!list) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.title}>List not found</h1>
          <p className={styles.notFoundText}>
            This link doesn&apos;t match any list. The owner may have deleted it.
          </p>
          <Link href="/" className={styles.homeLink}>Go to dashboard</Link>
        </div>
      </div>
    )
  }

  const { data: { user } } = await supabase.auth.getUser()

  // === Unauthenticated ===
  if (!user) {
    const { data: preview } = await supabase
      .from('items')
      .select('id, name, url')
      .eq('list_id', list.id)
      .order('created_at', { ascending: true })
      .limit(2)

    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{list.name}</h1>
        {preview && preview.length > 0 && (
          <ul className={styles.itemList}>
            {preview.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
                      Link ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.gate}>
          <p className={styles.gateText}>Sign in to see the full list and claim items.</p>
          <div className={styles.gateActions}>
            <Link href={`/signin?next=/share/${share_code}`} className={styles.primaryButton}>
              Sign in
            </Link>
            <Link href={`/signup?next=/share/${share_code}`} className={styles.secondaryButton}>
              Create account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { data: items } = await supabase
    .from('items')
    .select('id, name, url')
    .eq('list_id', list.id)
    .order('created_at', { ascending: true })

  // === Owner ===
  if (user.id === list.user_id) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Link href={`/lists/${list.id}`} className={styles.backLink}>← Edit list</Link>
            <h1 className={styles.title}>{list.name}</h1>
          </div>
          <p className={styles.ownerNote}>This is how your list looks to others.</p>
        </header>
        {items && items.length > 0 ? (
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
                      Link ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyItems}>No items on this list yet.</p>
        )}
      </div>
    )
  }

  // === Authenticated non-owner ===

  const itemIds = items?.map((i) => i.id) ?? []
  const { data: claims } = itemIds.length > 0
    ? await supabase.from('claims').select('item_id, user_id').in('item_id', itemIds)
    : { data: [] }

  // Auto-save on first visit
  const { data: existingSave } = await supabase
    .from('list_saves')
    .select('id')
    .eq('list_id', list.id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!existingSave) {
    await supabase.from('list_saves').insert({ list_id: list.id, user_id: user.id })
  }

  const claimMap = new Map(claims?.map((c) => [c.item_id, c.user_id]) ?? [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backLink}>← Dashboard</Link>
          <h1 className={styles.title}>{list.name}</h1>
        </div>
      </header>
      {items && items.length > 0 ? (
        <ul className={styles.itemList}>
          {items.map((item) => {
            const claimedBy = claimMap.get(item.id)
            const claimedByMe = claimedBy === user.id
            const claimedByOther = !!claimedBy && claimedBy !== user.id

            return (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
                      Link ↗
                    </a>
                  )}
                </div>
                <div className={styles.itemActions}>
                  {claimedByMe ? (
                    <form action={unclaimItem}>
                      <input type="hidden" name="itemId" value={item.id} />
                      <input type="hidden" name="shareCode" value={share_code} />
                      <button type="submit" className={styles.unclaimButton}>Unclaim</button>
                    </form>
                  ) : claimedByOther ? (
                    <span className={styles.claimedBadge}>Claimed</span>
                  ) : (
                    <form action={claimItem}>
                      <input type="hidden" name="itemId" value={item.id} />
                      <input type="hidden" name="shareCode" value={share_code} />
                      <button type="submit" className={styles.secondaryButton}>Claim</button>
                    </form>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className={styles.emptyItems}>No items on this list yet.</p>
      )}
    </div>
  )
}
