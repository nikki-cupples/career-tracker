import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import {User } from '../../models/user.ts'
import { useState } from 'react'
import * as api from '../apis/users.ts'

export function useAddProfile() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const [profileUpdated, setProfileUpdated] = useState(false)

  const mutation = useMutation({
    mutationFn: async (profileData: User) => {
      if (profileUpdated) {
        return
      }

      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }

      const accessToken = await getAccessTokenSilently()
      console.log(accessToken)

      try {
        const response = await api.upsertUser(profileData, accessToken)
        return response
      } catch (error) {
        console.error('Error during upsertUser:', error)
        throw error
      }
    },
    onSuccess: () => {
      setProfileUpdated(true)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      console.error('Error during mutation:', error)
    },
  })

  const handleProfileUpsert = (profileData: User) => {
    if (!profileUpdated) {
      mutation.mutate(profileData)
    }
  }

  return { mutation, handleProfileUpsert }
}
