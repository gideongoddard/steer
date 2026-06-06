'use client'

import { signOut } from './actions/auth'
import { mixpanel } from '@/utils/mixpanel/client'

export default function SignOutButton({ initials }: { initials: string }) {
  return (
    <form action={signOut} onSubmit={() => { try { mixpanel.reset() } catch {} }}>
      <button type="submit" className="account-pill">
        <div className="avatar">{initials}</div>
        Sign out
      </button>
    </form>
  )
}
