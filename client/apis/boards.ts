import request from 'superagent'
import { Board, BoardData } from '../../models/board'

// -- GET USER BOARDS -- //
export async function getBoards(token: string) {
  const res = await request
    .get('/api/v1/boards')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as Board[]
}

// -- ADD NEW BOARD -- //
export async function addBoard(board: BoardData, token: string) {
  try {
    const res = await request
      .post('/api/v1/boards')
      .set('Authorization', `Bearer ${token}`)
      .send(board)

    return res.body
  } catch (error) {
    console.error(500)
  }
}
