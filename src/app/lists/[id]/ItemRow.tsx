'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateItem, deleteItem } from '../../actions/items'
import styles from './list.module.css'

type Item = { id: string; list_id: string; name: string; url: string | null }

export default function ItemRow({ item }: { item: Item }) {
  const [editing, setEditing] = useState(false)
  const [state, action, pending] = useActionState(updateItem, {})

  if (editing) {
    return (
      <li className={styles.itemEditing}>
        <form action={action} className={styles.editForm}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="listId" value={item.list_id} />
          <div className={styles.field}>
            <label htmlFor={`name-${item.id}`}>Item</label>
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
          <div className={styles.field}>
            <label htmlFor={`url-${item.id}`}>Link (optional)</label>
            <input
              id={`url-${item.id}`}
              name="url"
              type="text"
              defaultValue={item.url ?? ''}
              placeholder="https://..."
            />
          </div>
          {state?.error && <p className={styles.error}>{state.error}</p>}
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryButton} disabled={pending}>
              {pending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className={styles.secondaryButton} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className={styles.item}>
      <div className={styles.itemContent}>
        <span className={styles.itemName}>{item.name}</span>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.itemLink}
          >
            Link ↗
          </a>
        )}
      </div>
      <div className={styles.itemActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <form action={deleteItem}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="listId" value={item.list_id} />
          <button type="submit" className={styles.dangerButton}>Delete</button>
        </form>
      </div>
    </li>
  )
}
