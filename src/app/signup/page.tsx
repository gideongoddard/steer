import styles from '../auth.module.css'
import SignUpForm from './SignUpForm'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className={styles.main}>
      <span className={styles.wordmark}>wispr<span className={styles.dot}>.</span></span>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create an account</h1>
        <SignUpForm next={next} />
      </div>
    </main>
  )
}
