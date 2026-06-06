import { createClient } from '@/utils/supabase/server'
import { signOut } from './actions/auth'

function getInitials(firstName: string, lastName: string) {
  if (firstName && lastName) return (firstName[0] + lastName[0]).toUpperCase()
  if (firstName) return firstName.slice(0, 2).toUpperCase()
  return '?'
}

export default async function AppNav() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let initials = '?'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('user_id', user.id)
      .single()
    if (profile) initials = getInitials(profile.first_name, profile.last_name)
  }

  return (
    <nav className="appbar">
      <span className="wordmark">steer<span className="dot">.</span></span>
      {user && (
        <div className="appbar-right">
          <form action={signOut}>
            <button type="submit" className="account-pill">
              <div className="avatar">{initials}</div>
              Sign out
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}
