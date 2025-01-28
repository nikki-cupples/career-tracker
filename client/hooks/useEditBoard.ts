import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Board } from '../../models/board'

export function useEditBoard() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: Board) => {
      const { id, company, link, board } = data
      await request.put(`/api/v1/boards/${id}`).send({
        id,
        company,
        link,
        board,
      })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
