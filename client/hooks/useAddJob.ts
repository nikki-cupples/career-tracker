import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobData } from '../../models/job'
import * as api from '../apis/jobs'
import { useAuth0 } from '@auth0/auth0-react'

export function useAddJob() {
  const client = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (job: JobData) => {
      const accessToken = await getAccessTokenSilently()

      if (!user?.sub) {
        throw new Error('User not authenticated')
      }
      await api.addJob(job, accessToken)
      console.log(job)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
