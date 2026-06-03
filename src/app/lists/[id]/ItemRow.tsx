'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateItem, deleteItem } from '../../actions/items'

type Item = { id: string; list_id: string; name: string; url: string | null }

function ArrowUpRightIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ItemRow({ item }: { item: Item }) {
  const [editing, setEditing] = useState(false)
  const [state, action, pending] = useActionState(updateItem, {})

  if (editing) {
    return (
      <form
        action={action}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px var(--row-px)', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid color-mix(in oklab, var(--accent) 30%, var(--border))' }}
      >
        <input type="hidden" name="itemId" value={item.id} />
        <input type="hidden" name="listId" value={item.list_id} />
        <div className="field">
          <label htmlFor={`name-${item.id}`}>Gift</label>
          <input
            id={`name-${item.id}`}
            name="name"
            type="text"
            defaultValue={item.name}
            required
            autoFocus
            maxLength={500}
          />
        </div>
        <div className="field">
          <label htmlFor={`url-${item.id}`}>Link (optional)</label>
          <input
            id={`url-${item.id}`}
            name="url"
            type="text"
            defaultValue={item.url ?? ''}
            placeholder="example.com"
          />
        </div>
        {state?.error && <p className="field-error">{state.error}</p>}
        <div className="form-row">
          <div className="spacer" />
          <button type="button" className="btn btn-quiet btn-sm" onClick={() => setEditing(false)}>Cancel</button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
            {pending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="item">
      <div className="item-body">
        <span className="item-name">{item.name}</span>
        {item.url && (
          <a
            className="item-link"
            href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.url} <ArrowUpRightIcon />
          </a>
        )}
      </div>
      <div className="item-actions">
        <button type="button" className="icon-btn" onClick={() => setEditing(true)} title="Edit">
          <EditIcon />
        </button>
        <form action={deleteItem}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="listId" value={item.list_id} />
          <button type="submit" className="icon-btn icon-danger" title="Delete">
            <TrashIcon />
          </button>
        </form>
      </div>
    </div>
  )
}
