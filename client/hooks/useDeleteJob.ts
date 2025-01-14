import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

export function useDeleteJob() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/jobs/${id}`)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
