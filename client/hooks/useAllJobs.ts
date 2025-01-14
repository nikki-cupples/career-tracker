import { useQuery } from '@tanstack/react-query'
import { getJobs } from '../apis/jobs'

export function useAllJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })
}
