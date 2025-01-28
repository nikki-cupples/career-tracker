import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Board } from '../../models/board'
import { useAuth0 } from '@auth0/auth0-react'
import * as api from '../apis/boards'

export function useEditBoard() {
  const client = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (data: Board) => {
      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }
      const accessToken = await getAccessTokenSilently()

      await api.editBoardInformation(accessToken, data)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boards'] })
    },
    onError: (error) => {
      console.error('Error during mutation:', error)
    },
  })
}
