import { useQuery } from '@tanstack/react-query'
import * as api from '../apis/jobs'
import { useAuth0 } from '@auth0/auth0-react'
import { Job } from '../../models/job'

export function useAllJobs() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const accessToken = getAccessTokenSilently()

      if (user && user.sub) {
        const res = await api.getJobs(await accessToken)
        return res as Job[]
      }
    },
  })

  return { data, isLoading, isError }
}
