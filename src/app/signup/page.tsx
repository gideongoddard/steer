import styles from '../auth.module.css'
import SignUpForm from './SignUpForm'
import AuthNav from '../AuthNav'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className={styles.main}>
      <AuthNav />
      <div className={styles.card}>
        <h1 className={styles.heading}>Create an account</h1>
        <SignUpForm next={next} />
      </div>
    </main>
  )
}
