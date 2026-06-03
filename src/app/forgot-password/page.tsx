import styles from '../auth.module.css'
import ForgotPasswordForm from './ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Forgot password</h1>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
