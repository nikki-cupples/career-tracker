import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Job } from '../../models/job'
import { useAuth0 } from '@auth0/auth0-react'
import * as api from '../apis/jobs'

export function useEditJob() {
  const client = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (data: Job) => {
      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }
      const accessToken = await getAccessTokenSilently()

      await api.editJobInformation(accessToken, data)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
