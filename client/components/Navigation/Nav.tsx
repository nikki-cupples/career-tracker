import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated.tsx'
import { useAddProfile } from '../../hooks/useAddProfile.ts'
import { User } from '../../../models/user.ts'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const { handleProfileUpsert } = useAddProfile()

  const handleSignOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
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
    }
  }, [user, handleProfileUpsert])

  return (
    <div className="w-screen px-4 py-4">
      <div className="flex items-center justify-end space-x-6 px-6 text-black">
        <IfAuthenticated>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              <p>{user?.name}</p>
            </div>

            <div>
              <img
                src={user?.picture}
                alt={user?.name}
                className="h-10 w-10 rounded-full border border-gray-300"
              />
            </div>

            <button
              onClick={handleSignOut}
              className="text-sm font-medium hover:underline"
            >
              <p>Sign out</p>
            </button>
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <div>
            <button
              onClick={handleLogIn}
              className="text-sm font-medium hover:underline"
            >
              <p>Sign in</p>
            </button>
          </div>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

export default Nav
