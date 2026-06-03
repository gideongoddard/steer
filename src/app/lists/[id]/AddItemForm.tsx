'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { addItem } from '../../actions/items'

function PlusIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="9" width="16" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9h17M12 9v11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9S10.5 4.5 8.4 5.1C6.8 5.6 7.4 9 12 9zM12 9s1.5-4.5 3.6-3.9C17.2 5.6 16.6 9 12 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function AddItemForm({ listId, hasItems }: { listId: string; hasItems: boolean }) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(addItem, {})

  if (!open && !hasItems) {
    return (
      <div className="empty">
        <div className="empty-mark"><GiftIcon /></div>
        <h3>This list is empty</h3>
        <p>Add the first gift — a name is all you need. A link makes it easy for others to find.</p>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon /> Add a gift
        </button>
      </div>
    )
  }

  if (!open) {
    return (
      <button type="button" className="add-trigger" onClick={() => setOpen(true)}>
        <span className="plus"><PlusIcon /></span>
        Add a gift
      </button>
    )
  }

  return (
    <form action={action} className="add-card">
      <input type="hidden" name="listId" value={listId} />
      <div className="field">
        <label htmlFor="add-name">Gift</label>
        <input
          id="add-name"
          name="name"
          type="text"
          required
          autoFocus
          maxLength={500}
          placeholder="What would they love?"
        />
      </div>
      <div className="field">
        <label htmlFor="add-url">Link (optional)</label>
        <input
          id="add-url"
          name="url"
          type="text"
          placeholder="example.com"
        />
      </div>
      {state?.error && <p className="field-error">{state.error}</p>}
      <div className="form-row">
        <div className="spacer" />
        <button type="button" className="btn btn-quiet btn-sm" onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
          {pending ? 'Adding…' : 'Add gift'}
        </button>
      </div>
    </form>
  )
}
