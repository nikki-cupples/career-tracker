import AddBoardCard from '../JobBoards/AddBoardCard'

function ErrorJobBoard() {
  return (
    <div>
      <div className=" mb-4 block w-full transform items-center rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl">
        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-blue-600">
          Oops! You have no current job boards.
        </h1>
        <p className="mb-6 text-gray-600">
          Please create a new board to continue.
        </p>
      </div>
      <AddBoardCard />
    </div>
  )
}

export default ErrorJobBoard
