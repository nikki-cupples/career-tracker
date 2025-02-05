import { Link } from 'react-router-dom'
import { Board } from '../../../models/board'
import AddBoardCard from './AddBoardCard'
import Loading from '../LoadingErrorPages/Loading'
import ErrorJobBoard from '../LoadingErrorPages/ErrorJobBoard'
import { useAllBoards } from '../../hooks/useAllBoards'
import { useEditBoard } from '../../hooks/useEditBoard'
import { useDeleteBoard } from '../../hooks/useDeleteBoard'
import { useState } from 'react'

function JobBoard() {
  const { data, isLoading, isError } = useAllBoards()
  const editBoard = useEditBoard()
  const delBoard = useDeleteBoard()

  const [editingBoardId, setEditingBoardId] = useState<number | null>(null)
  const [editedBoard, setEditedBoard] = useState<Partial<Board>>({})
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleEditClick = (board: Board) => {
    setEditingBoardId(board.id)
    setEditedBoard(board)
  }

  const handleCancel = () => {
    setEditingBoardId(null)
    setEditedBoard({})
  }

  const handleSave = () => {
    if (editedBoard.id) {
      editBoard.mutate(editedBoard as Board, {
        onSuccess: () => {
          setEditingBoardId(null)
          setEditedBoard({})
        },
      })
    }
  }

  const handleDel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    delBoard.mutate(Number(id))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEditedBoard((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorJobBoard />
  }

  // Sort the data alphabetically
  const sortedData =
    data?.data.sort((a: Board, b: Board) => {
      const nameA = a.company.toLowerCase()
      const nameB = b.company.toLowerCase()

      if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1
      if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1
      return 0
    }) || []

  return (
    <>
      <div>
        <div className="mb-4 flex justify-end">
          <button
            className="mt-2 rounded-md bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
            onClick={toggleSortOrder}
          >
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </button>
        </div>
        {data &&
          sortedData.map((board: Board) => (
            <div
              key={board.link}
              className="my-4 flex w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl"
            >
              {editingBoardId === board.id ? (
                <>
                  <div className="w-full">
                    <div className="flex flex-col">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        className="mb-2 w-full rounded border p-2"
                        name="company"
                        value={editedBoard.company || ''}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="link">Link to Job Board</label>
                      <input
                        id="link"
                        className="mb-2 w-full rounded border p-2"
                        name="link"
                        value={editedBoard.link || ''}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="board">Board Name</label>
                      <textarea
                        id="board"
                        className="mb-2 w-full rounded border p-2"
                        name="board"
                        value={editedBoard.board || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-800"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-400"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <div className="flex flex-col justify-between">
                      <h1 className="font-semibold">{board.company}</h1>
                      <Link to={board.link}>
                        <p className="text-blue-800 underline hover:text-blue-950">
                          {board.board}
                        </p>
                      </Link>
                    </div>
                    <div className="mt-2 flex justify-end space-x-4">
                      <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-blue-400"
                        onClick={() => handleEditClick(board)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-red-400"
                        onClick={(e) => handleDel(e, board.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        <AddBoardCard />
      </div>
    </>
  )
}

export default JobBoard
