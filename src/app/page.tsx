import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from './actions/auth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getInitials(firstName: string, lastName: string) {
  if (firstName && lastName) return (firstName[0] + lastName[0]).toUpperCase()
  if (firstName) return firstName.slice(0, 2).toUpperCase()
  return '?'
}

function ChevronIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signin')

  const [{ data: profile }, { data: lists }, { data: savedLists }] = await Promise.all([
    supabase.from('profiles').select('first_name, last_name').eq('user_id', user.id).single(),
    supabase
      .from('lists')
      .select('id, name, share_code, items(id, name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('list_saves')
      .select('id, list_id, lists(id, name, share_code, user_id, items(id))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ])

  const ownerIds = [...new Set((savedLists ?? []).map(s => (s.lists as any)?.user_id).filter(Boolean))]
  const { data: ownerProfiles } = ownerIds.length > 0
    ? await supabase.from('profiles').select('user_id, first_name, last_name').in('user_id', ownerIds)
    : { data: [] }
  const profileMap = new Map((ownerProfiles ?? []).map(p => [p.user_id, p]))

  const firstName = profile?.first_name || 'there'
  const initials = profile ? getInitials(profile.first_name, profile.last_name) : '?'
  const greeting = getGreeting()

  const ownedList = lists && lists.length > 0 ? lists[0] : null
  const ownedItems = (ownedList?.items ?? []) as { id: string; name: string }[]
  const previewItems = ownedItems.slice(0, 3)
  const moreCount = ownedItems.length - previewItems.length

  return (
    <>
      <nav className="appbar">
        <span className="wordmark">steer<span className="dot">.</span></span>
        <div className="appbar-right">
          <form action={signOut}>
            <button type="submit" className="account-pill">
              <div className="avatar">{initials}</div>
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="screen">
        <div className="header-block">
          <h1 className="display">
            <span style={{ color: 'var(--muted)' }}>{greeting},</span><br />{firstName}.
          </h1>
        </div>

        <section style={{ marginBottom: 46 }}>
          <div className="section-head">
            <span className="section-title">Your list</span>
          </div>

          {ownedList ? (
            <Link href={`/lists/${ownedList.id}`} className="owned-card">
              <div className="owned-top">
                <div className="owned-headcol">
                  <div className="owned-name">{ownedList.name}</div>
                  <div className="owned-meta">
                    <span className="live-dot" />
                    <span className="l-sub">{ownedItems.length} {ownedItems.length === 1 ? 'gift idea' : 'gift ideas'}</span>
                  </div>
                </div>
                <span className="owned-open"><ChevronIcon /></span>
              </div>
              {previewItems.length > 0 && (
                <div className="owned-preview">
                  {previewItems.map((item) => (
                    <div className="owned-pv-row" key={item.id}>
                      <span className="bullet" />
                      <span className="pv-name">{item.name}</span>
                    </div>
                  ))}
                  {moreCount > 0 && (
                    <div className="owned-more">+ {moreCount} more {moreCount === 1 ? 'gift idea' : 'gift ideas'}</div>
                  )}
                </div>
              )}
            </Link>
          ) : (
            <div className="empty">
              <div className="empty-mark">
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="9" width="16" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3.5 9h17M12 9v11" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 9S10.5 4.5 8.4 5.1C6.8 5.6 7.4 9 12 9zM12 9s1.5-4.5 3.6-3.9C17.2 5.6 16.6 9 12 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>You haven&apos;t made your list yet</h3>
              <p>Start your wishlist, add a few things you&apos;d love, then share one link with everyone.</p>
              <Link href="/lists/new" className="btn btn-primary">Create your list</Link>
            </div>
          )}
        </section>

        {savedLists && savedLists.length > 0 && (
          <section>
            <div className="section-head">
              <span className="section-title">Shared with you</span>
              <span className="eyebrow">{savedLists.length} {savedLists.length === 1 ? 'list' : 'lists'}</span>
            </div>
            <div className="stack">
              {savedLists.map((save) => {
                const list = save.lists as unknown as { id: string; name: string; share_code: string; user_id: string; items: { id: string }[] } | null
                if (!list) return null
                const itemCount = (list.items ?? []).length
                const ownerProfile = profileMap.get(list.user_id)
                const ownerInitials = ownerProfile
                  ? getInitials(ownerProfile.first_name, ownerProfile.last_name)
                  : list.name.charAt(0).toUpperCase()
                const ownerName = ownerProfile
                  ? `${ownerProfile.first_name} ${ownerProfile.last_name}`.trim()
                  : null
                return (
                  <Link key={save.id} href={`/share/${list.share_code}`} className="listrow">
                    <div className="avatar" style={{ width: 38, height: 38, fontSize: 13 }}>{ownerInitials}</div>
                    <div className="meta-col">
                      <span className="l-name">{list.name}</span>
                      <span className="l-meta">
                        <span className="l-sub">{ownerName ? `${ownerName} · ` : ''}{itemCount} {itemCount === 1 ? 'gift idea' : 'gift ideas'}</span>
                      </span>
                    </div>
                    <ChevronIcon />
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
