import { Board, BoardData, EditBoardData } from '../../models/board.ts'
import db from './connection.ts'

// -- GET ALL BOARDS -- //
export async function getAllBoards(user_id: string): Promise<Board[]> {
  const jobBoards = await db('job_boards')
    .select('id', 'company', 'link', 'board', 'user_id as userId')
    .where({ user_id })
  return jobBoards as Board[]
}

// -- GET BOARD BY ID -- //
export async function getBoardById(id: number): Promise<Board> {
  const job = await db('job_boards').select().first().where({ id })
  return job as Board
}

// -- ADD NEW BOARD -- //
export async function addJobBoard(
  data: BoardData,
  userId: string,
): Promise<BoardData> {
  const { company, link, board } = data

  return await db('job_boards').insert({
    company,
    link,
    board,
    user_id: userId,
  })
}

// -- DELETE BOARD -- //
export async function deleteJobBoard(id: number): Promise<Board> {
  return await db('job_boards').where('id', id).del()
}

// -- EDIT JOB BOARD-- //
export async function editJobBoard(
  updatedJob: EditBoardData,
): Promise<EditBoardData> {
  const { id, company, link, board } = updatedJob

  return await db('job_boards').where('id', id).update({
    id,
    company,
    link,
    board,
  })
}
