import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from './Authentication/Authenticated.tsx'
import { useAddProfile } from '../hooks/useAddProfile.ts'
import { User } from '../../models/user.ts'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const { handleProfileUpsert } = useAddProfile()

  const handleSignOut = () => {
    logout()
  }

  const handleLogIn = async () => {
    try {
      await loginWithRedirect()
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  useEffect(() => {
    if (user) {
      const profileData: User = {
        auth0_id: user?.sub || '',
        name: user?.name || '',
        email: user?.email || '',
      }
      handleProfileUpsert(profileData)
      console.log(user)
    }
  }, [user, handleProfileUpsert])

  return (
    <div className="flex items-center justify-between bg-red-400">
      <div className="flex pr-16 text-white">
        <IfAuthenticated>
          <div className="flex items-center hover:underline">
            <button>
              <p className="text-l space-l font-labrada mr-3">{user?.name}</p>
            </button>

            <button>
              <img
                src={user?.picture}
                alt={user?.name}
                className="mr-3 h-10 w-10 rounded-full"
              />
            </button>

            <button onClick={handleSignOut}>
              <p className="text-l space-l font-labrada">Sign out</p>
            </button>
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <div className="flex items-center hover:underline">
            <button onClick={handleLogIn}>
              <p className="text-l space-l font-labrada">Sign in</p>
            </button>
          </div>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

export default Nav
