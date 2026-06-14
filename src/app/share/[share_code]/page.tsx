import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import AppNav from '@/app/AppNav'
import AppFooter from '@/app/AppFooter'
import { claimItem, unclaimItem } from '@/app/actions/claims'

function ArrowLeftIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M11 6l-6 6 6 6M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function displayUrl(url: string): string {
  try {
    const full = url.startsWith('http') ? url : `https://${url}`
    return new URL(full).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ share_code: string }>
}) {
  const { share_code } = await params

  const supabase = await createClient()

  const [{ data: list }, { data: { user } }] = await Promise.all([
    supabase.from('lists').select('id, name, user_id').eq('share_code', share_code).single(),
    supabase.auth.getUser(),
  ])

  if (!list) {
    return (
      <>
        <AppNav />
        <div className="screen" style={{ paddingTop: 80, textAlign: 'center' }}>
          <h1 className="display" style={{ marginBottom: 16 }}>
            This list isn&apos;t here <em>anymore</em>.
          </h1>
          <p className="l-sub" style={{ marginBottom: 24 }}>
            It looks like this list has been deleted or the link is wrong. Deleted lists and their links can&apos;t be restored.
          </p>
          {user ? (
            <Link href="/" className="btn btn-primary">Go to my dashboard</Link>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                <Link href="/signup" className="btn btn-primary">Create your list</Link>
                <Link href="/signin" className="btn btn-quiet">Sign in</Link>
              </div>
              <p className="l-sub" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}>Lists shared with you are saved to your dashboard, so you won&apos;t lose them.</p>
            </>
          )}
        </div>
        <AppFooter />
      </>
    )
  }

  // === Unauthenticated ===
  if (!user) {
    const [previewResult, ownerProfileResult] = await Promise.all([
      supabase.from('items').select('id, name, url').eq('list_id', list.id).order('created_at', { ascending: true }).limit(2),
      supabase.from('profiles').select('first_name, last_name').eq('user_id', list.user_id).single(),
    ])

    const preview = previewResult.data
    const ownerProfile = ownerProfileResult.data
    const ownerFullName = ownerProfile
      ? `${ownerProfile.first_name} ${ownerProfile.last_name}`.trim()
      : null

    return (
      <>
        <AppNav />
        <div className="screen">
          <div className="header-block">
            <h1 className="display">{list.name}</h1>
            {ownerFullName && (
              <div className="title-meta">
                <div className="avatar" style={{ width: 26, height: 26, fontSize: 11 }}>{getInitials(ownerFullName)}</div>
                <span className="l-sub" style={{ fontSize: 13.5 }}>{ownerFullName}</span>
              </div>
            )}
          </div>

          {preview && preview.length > 0 && (
            <div className="items" style={{ marginBottom: 24 }}>
              {preview.map((item) => (
                <div key={item.id} className="item">
                  <div className="item-body">
                    <span className="item-name">{item.name}</span>
                    {item.url && (
                      <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noopener noreferrer" className="item-link">
                        {displayUrl(item.url)} <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="note" style={{ flexDirection: 'column', gap: 16 }}>
            <p style={{ color: 'var(--ink)' }}>Create an account or sign in to see the full list and claim items.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href={`/signup?next=/share/${share_code}`} className="btn btn-primary">Create account</Link>
              <Link href={`/signin?next=/share/${share_code}`} className="btn btn-quiet">Sign in</Link>
            </div>
          </div>
        </div>
        <AppFooter />
      </>
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
      <>
        <AppNav />
        <div className="screen">
          <Link href={`/lists/${list.id}`} className="back">
            <ArrowLeftIcon />
            Edit list
          </Link>

          <div className="header-block" style={{ marginTop: 14 }}>
            <div className="eyebrow">Preview</div>
            <h1 className="display">{list.name}</h1>
            <div className="title-meta">
              <span className="l-sub" style={{ fontSize: 13.5 }}>This is how your list looks to others</span>
            </div>
          </div>

          {items && items.length > 0 ? (
            <div className="items">
              {items.map((item) => (
                <div key={item.id} className="item">
                  <div className="item-body">
                    <span className="item-name">{item.name}</span>
                    {item.url && (
                      <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noopener noreferrer" className="item-link">
                        {displayUrl(item.url)} <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="l-sub">No items on this list yet.</p>
          )}
        </div>
      </>
    )
  }

  // === Authenticated non-owner ===

  const itemIds = items?.map((i) => i.id) ?? []
  const [claimsResult, existingSaveResult, ownerProfileResult] = await Promise.all([
    itemIds.length > 0
      ? supabase.from('claims').select('item_id, user_id').in('item_id', itemIds)
      : Promise.resolve({ data: [] }),
    supabase.from('list_saves').select('id').eq('list_id', list.id).eq('user_id', user.id).maybeSingle(),
    supabase.from('profiles').select('first_name, last_name').eq('user_id', list.user_id).single(),
  ])

  if (!existingSaveResult.data) {
    await supabase.from('list_saves').insert({ list_id: list.id, user_id: user.id })
  }

  const claims = claimsResult.data
  const ownerProfile = ownerProfileResult.data
  const ownerFullName = ownerProfile
    ? `${ownerProfile.first_name} ${ownerProfile.last_name}`.trim()
    : list.name
  const claimMap = new Map(claims?.map((c) => [c.item_id, c.user_id]) ?? [])
  const ownerInitials = getInitials(ownerFullName)

  return (
    <>
      <AppNav />
      <div className="screen">
        <Link href="/" className="back">
          <ArrowLeftIcon />
          All lists
        </Link>

        <div className="header-block" style={{ marginTop: 14 }}>
          <div className="header-top">
            <div className="head-col">
              <h1 className="display">{list.name}</h1>
              <div className="title-meta">
                <div className="avatar" style={{ width: 26, height: 26, fontSize: 11 }}>{ownerInitials}</div>
                <span className="l-sub" style={{ fontSize: 13.5 }}>{ownerFullName} · {(items ?? []).length} {(items ?? []).length === 1 ? 'gift idea' : 'gift ideas'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="note">
          <span className="ic"><LockIcon /></span>
          <span>
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>The list owner can&apos;t see who claimed what.</strong>{' '}
            Claiming just quietly tells other guests it&apos;s taken — so nobody doubles up.
          </span>
        </div>

        {items && items.length > 0 ? (
          <div className="items">
            {items.map((item) => {
              const claimedBy = claimMap.get(item.id)
              const claimedByMe = claimedBy === user.id
              const claimedByOther = !!claimedBy && claimedBy !== user.id

              return (
                <div
                  key={item.id}
                  className={`item${claimedByMe ? ' claimed-mine' : claimedByOther ? ' claimed-other' : ''}`}
                >
                  {claimedByMe && (
                    <div className="claim-check"><CheckIcon /></div>
                  )}
                  <div className="item-body">
                    <span className="item-name">{item.name}</span>
                    {claimedByMe ? (
                      <span className="claim-label">You&apos;re giving this</span>
                    ) : item.url ? (
                      <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noopener noreferrer" className="item-link">
                        {displayUrl(item.url)} <ArrowUpRightIcon />
                      </a>
                    ) : null}
                  </div>
                  <div className="item-actions">
                    {claimedByMe ? (
                      <form action={unclaimItem}>
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="hidden" name="shareCode" value={share_code} />
                        <button type="submit" className="btn btn-quiet btn-sm">Release</button>
                      </form>
                    ) : claimedByOther ? (
                      <span className="badge-claimed">Claimed</span>
                    ) : (
                      <form action={claimItem}>
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="hidden" name="shareCode" value={share_code} />
                        <button type="submit" className="btn btn-ghost btn-sm">
                          <CheckIcon /> Claim
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="l-sub">No items on this list yet.</p>
        )}
      </div>
    </>
  )
}
