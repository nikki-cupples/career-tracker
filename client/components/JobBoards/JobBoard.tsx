import { Link } from 'react-router-dom'
import { useAllBoards } from '../../apis/boards'
import { Board } from '../../../models/board'

function JobBoard() {
  const { data } = useAllBoards()

  // const data2 = [
  //   {
  //     company: 'Google',
  //     link: 'https://www.google.com/about/careers/applications/locations/auckland/',
  //     board: 'Google Auckland Jobs',
  //   },
  //   {
  //     company: 'Air NZ',
  //     link: 'https://careers.airnewzealand.co.nz/digital-graduates',
  //     board: 'Air NZ Grad Careers',
  //   },
  //   {
  //     company: 'MYOB (Sharsies)',
  //     link: 'https://careers.myob.com/grad',
  //     board: 'MYOB Graduates Board',
  //   },
  //   { company: 'Google', link: '' },
  // ]

  return (
    <>
      <div>
        {data &&
          data.data.map((item: Board) => (
            <div
              key={item.link}
              className="m-4 flex w-full transform flex-row justify-between rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl"
            >
              <h1 className="font-semibold">{item.company}</h1>
              <Link to={item.link}>
                <p className="text-blue-800 underline hover:text-blue-950">
                  {item.board}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </>
  )
}

export default JobBoard
