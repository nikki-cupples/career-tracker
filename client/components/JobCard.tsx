import { Job } from '../../models/job'
import { useAllJobs } from '../hooks/useAllJobs'
import AddJobCard from './AddJobCard'
import { useState } from 'react'

function JobCard() {
  const { data } = useAllJobs()

  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({})

  const toggleExpansion = (jobId: number) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {data &&
        data.data
          .sort((a, b) => {
            if (a.applied && !b.applied) {
              return -1
            } else if (!a.applied && b.applied) {
              return 1
            }
            return 0
          })
          .map((job: Job) => (
            <button
              key={job.id}
              className="block w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl"
              onClick={() => toggleExpansion(job.id)}
            >
              <h2 className="mb-2 text-lg font-semibold uppercase text-gray-800 md:text-xl">
                {job.title}
              </h2>
              <p className="mb-2 text-lg capitalize text-gray-700">
                {job.company}
              </p>
              <p className="mb-4 text-lg capitalize text-gray-500">
                {job.applied ? `Applied on ${job.date}` : 'Not applied'}
              </p>

              {expandedJobs[job.id] && (
                <>
                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                    About
                  </p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p className=" mt-2 line-clamp-3 rounded p-2 text-sm text-gray-800">
                      {job.description}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                    Requirements
                  </p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p className=" rounded p-2 text-sm">{job.requirements}</p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                    Follow Up Information
                  </p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p className="rounded p-2 text-sm">{job.contacted}</p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                    Relevant Details & Links
                  </p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p className="rounded p-2 text-sm">{job.notes}</p>
                  </div>
                </>
              )}
            </button>
          ))}
      <AddJobCard />
    </div>
  )
}

export default JobCard
