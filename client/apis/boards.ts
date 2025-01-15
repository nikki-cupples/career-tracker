import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { BoardData } from '../../models/board'

// -- ADD NEW BOARD -- //
export function useAddBoard() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (jobBoard: BoardData) => {
      await request.post('api/v1/boards').send(jobBoard)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

// -- GET ALL BOARDS -- //
export function useAllBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const res = await request.get('/api/v1/boards')
      return res.body
    },
  })
}
