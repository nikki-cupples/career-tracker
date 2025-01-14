import { Job } from '../../models/job'
import { useAllJobs } from '../hooks/useAllJobs'
import AddJobCard from './AddJobCard'

function JobCard() {
  const { data } = useAllJobs()

  return (
    <div className="grid grid-cols-1 gap-6 ">
      {data &&
        data.data.map((job: Job) => (
          <button
            key={job.id}
            className="block w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="mt-2 text-gray-500">
              Applied: {job.applied ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-500">Date: {job.date}</p>
            <p className="mt-4 line-clamp-3 text-gray-500">{job.description}</p>
          </button>
        ))}
      <AddJobCard />
    </div>
  )
}

export default JobCard
