'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { addItem } from '../../actions/items'
import styles from './list.module.css'

export default function AddItemForm({ listId }: { listId: string }) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(addItem, {})

  if (!open) {
    return (
      <button type="button" className={styles.primaryButton} onClick={() => setOpen(true)}>
        Add item
      </button>
    )
  }

  return (
    <form action={action} className={styles.addForm}>
      <input type="hidden" name="listId" value={listId} />
      <div className={styles.field}>
        <label htmlFor="add-name">Item</label>
        <input
          id="add-name"
          name="name"
          type="text"
          required
          autoFocus
          maxLength={500}
          placeholder="e.g. Blue Nike trainers, size 10"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="add-url">Link (optional)</label>
        <input
          id="add-url"
          name="url"
          type="text"
          placeholder="https://..."
        />
      </div>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <div className={styles.formActions}>
        <button type="submit" className={styles.primaryButton} disabled={pending}>
          {pending ? 'Adding...' : 'Add item'}
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  )
}
