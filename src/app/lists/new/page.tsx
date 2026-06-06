import Link from 'next/link'
import AppNav from '../../AppNav'
import CreateListForm from './CreateListForm'

function ArrowLeftIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <path d="M11 6l-6 6 6 6M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NewListPage() {
  return (
    <>
      <AppNav />
      <div className="screen">
        <Link href="/" className="back">
          <ArrowLeftIcon />
          All lists
        </Link>
        <div className="header-block" style={{ marginTop: 14 }}>
          <h1 className="display">New list</h1>
        </div>
        <CreateListForm />
      </div>
    </>
  )
}
