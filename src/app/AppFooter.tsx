import Link from 'next/link'
import styles from './footer.module.css'

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.wordmark}>
            steer<span className={styles.dot}>.</span>
          </Link>
          <span className={styles.copy}>© 2026 Steer</span>
        </div>
        <nav className={styles.links}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  )
}
