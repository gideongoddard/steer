'use client'

import { useState } from 'react'
import { deleteList } from '../../actions/lists'

function TrashIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function DeleteListFooter({ listId, listName }: { listId: string; listName: string }) {
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="list-footer">
      {confirming ? (
        <div className="confirm-card">
          <div className="confirm-text">
            <strong>Delete &ldquo;{listName}&rdquo;?</strong>
            <span>This will permanently remove the list and all its gifts. Anyone with your share link will lose access.</span>
          </div>
          <div className="confirm-actions">
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => setConfirming(false)}>
              Cancel
            </button>
            <form action={deleteList}>
              <input type="hidden" name="listId" value={listId} />
              <button type="submit" className="btn btn-sm btn-danger-solid">
                Delete list
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button type="button" className="footer-danger" onClick={() => setConfirming(true)}>
          <TrashIcon />
          Delete this list
        </button>
      )}
    </div>
  )
}
