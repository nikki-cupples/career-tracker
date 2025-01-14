import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

export function useJobById(id: number) {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await request.get(`/api/v1/jobs/${id}`)
      return res.body
    },
  })
}
