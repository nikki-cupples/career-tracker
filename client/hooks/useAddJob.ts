import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewJobData } from '../../models/job'
import request from 'superagent'

export function useAddJob() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (job: NewJobData) => {
      await request.post('api/v1/jobs').send(job)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
