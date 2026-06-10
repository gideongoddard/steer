import styles from '../auth.module.css'
import SignInForm from './SignInForm'
import AuthNav from '../AuthNav'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className={styles.main}>
      <AuthNav />
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign in</h1>
        <SignInForm next={next} />
      </div>
    </main>
  )
}
