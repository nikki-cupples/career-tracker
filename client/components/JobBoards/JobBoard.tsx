import { Link } from 'react-router-dom'
import { useAllBoards } from '../../apis/boards'
import { Board } from '../../../models/board'
import AddBoardCard from './AddBoardCard'

function JobBoard() {
  const { data } = useAllBoards()

  return (
    <>
      <div>
        {data &&
          data.data.map((item: Board) => (
            <div
              key={item.link}
              className="my-4 flex w-full transform flex-row justify-between rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl"
            >
              <h1 className="font-semibold">{item.company}</h1>
              <Link to={item.link}>
                <p className="text-blue-800 underline hover:text-blue-950">
                  {item.board}
                </p>
              </Link>
            </div>
          ))}
        <AddBoardCard />
      </div>
    </>
  )
}

export default JobBoard
