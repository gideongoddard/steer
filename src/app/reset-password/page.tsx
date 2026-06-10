import styles from '../auth.module.css'
import ResetPasswordForm from './ResetPasswordForm'
import AuthNav from '../AuthNav'

export default function ResetPasswordPage() {
  return (
    <main className={styles.main}>
      <AuthNav />
      <div className={styles.card}>
        <h1 className={styles.heading}>Reset password</h1>
        <ResetPasswordForm />
      </div>
    </main>
  )
}
