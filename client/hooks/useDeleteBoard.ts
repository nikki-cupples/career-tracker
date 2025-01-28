import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

export function useDeleteBoard() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/boards/${id}`)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
