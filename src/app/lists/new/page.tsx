import styles from '../../auth.module.css'
import CreateListForm from './CreateListForm'

export default function NewListPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.heading}>New list</h1>
        <CreateListForm />
      </div>
    </main>
  )
}
