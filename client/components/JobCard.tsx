import { Job } from '../../models/job'
import { useAllJobs } from '../hooks/useAllJobs'
import AddJobCard from './AddJobCard'
import { useState } from 'react'
import { useEditJob } from '../hooks/useEditJob'

function JobCard() {
  const { data } = useAllJobs()
  const editJob = useEditJob()

  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({})
  const [editingJobId, setEditingJobId] = useState<number | null>(null)
  const [editedJob, setEditedJob] = useState<Partial<Job>>({})

  const toggleExpansion = (jobId: number) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  const handleEditClick = (job: Job) => {
    setEditingJobId(job.id)
    setEditedJob(job)
  }

  const handleCancel = () => {
    setEditingJobId(null)
    setEditedJob({})
  }

  const handleSave = () => {
    if (editedJob.id) {
      editJob.mutate(editedJob as Job, {
        onSuccess: () => {
          setEditingJobId(null)
          setEditedJob({})
        },
      })
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEditedJob((prev) => ({
      ...prev,
      [name]: value,
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
            <div
              key={job.id}
              className="block w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-left shadow-md transition-transform hover:shadow-xl"
            >
              {editingJobId === job.id ? (
                <>
                  <label htmlFor="title">Title</label>
                  <input
                    className="mb-2 w-full rounded border p-2"
                    name="title"
                    value={editedJob.title || ''}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="company">Company</label>
                  <input
                    className="mb-2 w-full rounded border p-2"
                    name="company"
                    value={editedJob.company || ''}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="description">About</label>
                  <textarea
                    className="mb-2 w-full rounded border p-2"
                    name="description"
                    value={editedJob.description || ''}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="requirements">Requirements</label>
                  <textarea
                    className="mb-2 w-full rounded border p-2"
                    name="requirements"
                    value={editedJob.requirements || ''}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="contacted">Follow Up Information</label>
                  <textarea
                    className="mb-2 w-full rounded border p-2"
                    name="contacted"
                    value={editedJob.contacted || ''}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="notes">Relevant Details & Links</label>
                  <textarea
                    className="mb-2 w-full rounded border p-2"
                    name="notes"
                    value={editedJob.notes || ''}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-4">
                    <button
                      className="text-sm text-blue-500 md:text-lg"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="text-sm text-red-500 md:text-lg"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mb-2 text-lg font-semibold uppercase text-gray-800 md:text-xl">
                    {job.title}
                  </h2>
                  <p className="mb-2 text-lg capitalize text-gray-700">
                    {job.company}
                  </p>
                  <p className="mb-4 text-lg capitalize text-gray-500">
                    {job.applied ? `Applied on ${job.date}` : 'Not applied'}
                  </p>
                  <button
                    className="text-sm text-blue-500 md:text-lg"
                    onClick={() => toggleExpansion(job.id)}
                  >
                    {expandedJobs[job.id] ? 'Less' : 'More'}
                  </button>
                  {expandedJobs[job.id] && (
                    <>
                      <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                        About
                      </p>
                      <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                        <p className="mt-2 line-clamp-3 rounded p-2 text-sm text-gray-800">
                          {job.description}
                        </p>
                      </div>
                      <p className="mt-4 text-sm font-semibold capitalize text-gray-800">
                        Requirements
                      </p>
                      <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                        <p className="rounded p-2 text-sm">
                          {job.requirements}
                        </p>
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
                  <button
                    className="mx-4 text-sm text-blue-500 md:text-lg"
                    onClick={() => handleEditClick(job)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
      <AddJobCard />
    </div>
  )
}

export default JobCard
