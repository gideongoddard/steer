'use client'

import { useState } from 'react'
import styles from './list.module.css'

export default function CopyShareLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={handleCopy} className={styles.copyButton}>
      {copied ? 'Copied!' : 'Copy share link'}
    </button>
  )
}
