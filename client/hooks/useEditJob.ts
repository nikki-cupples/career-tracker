import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Job } from '../../models/job'
import request from 'superagent'

export function useEditJob() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: Job) => {
      const {
        id,
        title,
        description,
        company,
        requirements,
        applied,
        date,
        contacted,
        notes,
      } = data
      await request.put(`/api/v1/jobs/${id}`).send({
        id,
        title,
        description,
        company,
        requirements,
        applied,
        date,
        contacted,
        notes,
      })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
