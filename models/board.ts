export interface Board {
  id: number
  company: string
  link: string
  board: string
  userId: string
}

export interface BoardData {
  company: string
  link: string
  board: string
  userId: string
}

export interface EditBoardData {
  id: number
  company: string
  link: string
  board: string
}