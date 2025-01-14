import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AppliedForJob } from '../../models/job'
import request from 'superagent'

export function useCompletedApplication() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (applied: AppliedForJob) => {
      const id = applied.id
      await request.patch(`/api/v1/jobs/${id}`).send({
        id,
        applied: applied.applied,
      })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
