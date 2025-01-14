import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

export function useAllJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await request.get('/api/v1/jobs')
      return res.body
    },
  })
}
