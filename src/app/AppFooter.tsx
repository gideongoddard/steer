import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import styles from './footer.module.css'

export default async function AppFooter() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
          {user ? (
            <Link href="/">Dashboard</Link>
          ) : (
            <>
              <Link href="/signin">Sign in</Link>
              <Link href="/signup">Create account</Link>
            </>
          )}
        </nav>
      </div>
    </footer>
  )
}
