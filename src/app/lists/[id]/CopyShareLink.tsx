'use client'

import { useState } from 'react'

function CopyIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 15V6a2 2 0 012-2h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CopyShareLink({ url, code }: { url: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setFailed(true)
      setTimeout(() => setFailed(false), 1800)
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={`share-pill${copied ? ' copied' : ''}`}>
      <div className="share-meta">
        <span className="share-label">{copied ? 'Link copied!' : failed ? 'Couldn\'t copy link' : 'Share your list'}</span>
        <span className="code">{code}</span>
      </div>
      <span className="copy-ic">{copied ? <CheckIcon /> : <CopyIcon />}</span>
    </button>
  )
}
