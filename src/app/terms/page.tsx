import Link from 'next/link'
import styles from '../legal.module.css'

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.wordmark}>
        steer<span className={styles.dot}>.</span>
      </Link>

      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: 9 June 2026</p>

      <div className={styles.prose}>
        <p>By using Steer you agree to these terms. If you don't agree, please don't use the app.</p>

        <h2>The service</h2>
        <p>Steer lets you create and share wishlists. We provide it as-is and may change or discontinue it at any time.</p>

        <h2>Your account</h2>
        <p>You're responsible for keeping your account credentials secure and for all activity under your account. Let us know immediately if you suspect unauthorised access.</p>

        <h2>Acceptable use</h2>
        <p>Don't use Steer for anything illegal, harmful, or abusive. We reserve the right to suspend accounts that violate this.</p>

        <h2>Your data</h2>
        <p>You own the content you create in Steer. By using the app you grant us the rights necessary to store and display that content to you and anyone you share it with.</p>

        <h2>Availability</h2>
        <p>We aim to keep Steer running reliably but don't guarantee uptime or that data won't be lost. Keep your own copies of anything important.</p>

        <h2>Limitation of liability</h2>
        <p>To the fullest extent permitted by law, we're not liable for any indirect, incidental, or consequential damages arising from your use of Steer.</p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time. Continued use of the app after changes are posted means you accept the updated terms.</p>

      </div>
    </div>
  )
}
