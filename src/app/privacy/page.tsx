import Link from 'next/link'
import styles from '../legal.module.css'

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.wordmark}>
        steer<span className={styles.dot}>.</span>
      </Link>

      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: 9 June 2026</p>

      <div className={styles.prose}>
        <p>Steer ("we", "us") operates this app. This policy explains what data we collect and how we use it.</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Account information</strong> — your name and email address when you create an account.</li>
          <li><strong>Wishlist data</strong> — the lists and items you create in the app.</li>
          <li><strong>Usage data</strong> — anonymised analytics to understand how the app is used.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To provide the service — storing and displaying your wishlists.</li>
          <li>To send transactional emails, such as password reset links.</li>
          <li>To improve the app based on how it's being used.</li>
        </ul>

        <h2>Third parties</h2>
        <ul>
          <li><strong>Supabase</strong> — stores your account and wishlist data. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</a>.</li>
          <li><strong>Mixpanel</strong> — usage analytics. <a href="https://mixpanel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a>.</li>
          <li><strong>Google</strong> — if you sign in with Google, subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.</li>
        </ul>

        <p>We don't sell your data to anyone.</p>

        <h2>Your rights</h2>
        <p>You can request deletion of your account and all associated data at any time by contacting us. You can also request a copy of the data we hold about you.</p>

      </div>
    </div>
  )
}
