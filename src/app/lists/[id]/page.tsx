import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import AppNav from '../../AppNav'
import AppFooter from '../../AppFooter'
import CopyShareLink from './CopyShareLink'
import EditListName from './EditListName'
import ItemRow from './ItemRow'
import AddItemForm from './AddItemForm'
import DeleteListFooter from './DeleteListFooter'

function ArrowLeftIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M11 6l-6 6 6 6M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
              <div className="eyebrow">Your list</div>
              <EditListName listId={list.id} name={list.name} />
              <div className="title-meta">
                <span className="l-sub" style={{ fontSize: 13.5 }}>
                  {(items ?? []).length} {(items ?? []).length === 1 ? 'gift idea' : 'gift ideas'}
                </span>
              </div>
            </div>
            <CopyShareLink url={shareUrl} code={list.share_code} />
          </div>
        </div>

        {items && items.length > 0 ? (
          <div className="items">
            {items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        ) : null}

        <AddItemForm listId={list.id} hasItems={!!(items && items.length > 0)} />
        <DeleteListFooter listId={list.id} listName={list.name} />
      </div>
      <AppFooter />
    </>
  )
}
