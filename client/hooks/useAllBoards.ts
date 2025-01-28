import { useQuery } from '@tanstack/react-query'
import * as api from '../apis/boards'
import { useAuth0 } from '@auth0/auth0-react'
import { Board } from '../../models/board'

export function useAllBoards() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const accessToken = getAccessTokenSilently()

      if (user && user.sub) {
        const res = await api.getBoards(await accessToken)
        return res as Board[]
      }
    },
  })

  return { data, isLoading, isError }
}
