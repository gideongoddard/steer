'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateList } from '../../actions/lists'

function EditIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function EditListName({ listId, name }: { listId: string; name: string }) {
  const [editing, setEditing] = useState(false)
  const [state, action, pending] = useActionState(updateList, {})

  if (editing) {
    return (
      <form
        action={action}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <input type="hidden" name="listId" value={listId} />
        <div className="field">
          <label htmlFor="list-name">List name</label>
          <input
            id="list-name"
            name="name"
            type="text"
            defaultValue={name}
            required
            autoFocus
            maxLength={100}
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <h1 className="display">{name}</h1>
      <button type="button" className="icon-btn" onClick={() => setEditing(true)} title="Edit list name">
        <EditIcon />
      </button>
    </div>
  )
}
