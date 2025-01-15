import { useState } from 'react'
import { useAddBoard } from '../../apis/boards.ts'
import { BoardData } from '../../../models/board.ts'

function AddBoardCard() {
  const [showForm, setShowForm] = useState(false)
  const [link, setLink] = useState('')
  const [company, setCompany] = useState('')
  const [board, setBoard] = useState('')

  const { mutate: addNewBoard } = useAddBoard()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newBoard: BoardData = {
      company,
      link,
      board,
    }

    addNewBoard(newBoard)
    setShowForm(false)
    setCompany('')
    setLink('')
    setBoard('')
  }

  return (
    <div className="w-full">
      {/* Add Job Board Button */}
      {!showForm && (
        <button
          className="block w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-center text-lg font-bold shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          onClick={() => setShowForm(true)}
        >
          +
        </button>
      )}

      {/* Job Board Form */}
      {showForm && (
        <form
          className="w-full rounded-2xl border border-gray-300 bg-white p-6 shadow-md"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="link">
              Link to Job Board
            </label>
            <input
              id="link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="board">
              Name Job Board
            </label>
            <input
              type="text"
              id="board"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-800"
            >
              Add Board
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddBoardCard
