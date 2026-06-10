import styles from '../auth.module.css'
import ForgotPasswordForm from './ForgotPasswordForm'
import AuthNav from '../AuthNav'

export default function ForgotPasswordPage() {
  return (
    <main className={styles.main}>
      <AuthNav />
      <div className={styles.card}>
        <h1 className={styles.heading}>Forgot password</h1>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
