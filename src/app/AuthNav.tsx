import Link from 'next/link'
import styles from './auth.module.css'

export default function AuthNav() {
  return (
    <Link href="/" className={styles.wordmark}>
      steer<span className={styles.dot}>.</span>
    </Link>
  )
}
