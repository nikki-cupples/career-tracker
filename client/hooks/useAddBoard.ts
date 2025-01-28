import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../apis/boards'
import { useAuth0 } from '@auth0/auth0-react'
import { BoardData } from '../../models/board'

export function useAddBoard() {
  const client = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (board: BoardData) => {
      const accessToken = await getAccessTokenSilently()

      if (!user?.sub) {
        throw new Error('User not authenticated')
      }
      await api.addBoard(board, accessToken)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
