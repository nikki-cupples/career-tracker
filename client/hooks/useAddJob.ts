import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobData } from '../../models/job'
import request from 'superagent'

export function useAddJob() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ jobs }: { jobs: JobData }) => {
      await request.post('api/v1/jobs').send(jobs)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
