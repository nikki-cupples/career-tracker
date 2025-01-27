import { Job } from '../../../models/job'
import AddJobCard from './AddJobCard'
import { useState } from 'react'
import { useEditJob } from '../../hooks/useEditJob'

type JobCardProps = {
  jobs: Job[] | undefined
}

function JobCard({ jobs }: JobCardProps) {
  const editJob = useEditJob()

  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({})
  const [editingJobId, setEditingJobId] = useState<number | null>(null)
  const [editedJob, setEditedJob] = useState<Partial<Job>>({})

  const toggleExpansion = (jobId: number) => {
    setExpandedJobs((prev) => {
      const newExpandedJobs = { ...prev }
      newExpandedJobs[jobId] = !prev[jobId]
      return newExpandedJobs
    })
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
      {jobs &&
        jobs
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

                  <label htmlFor="applied">Applied</label>
                  <input
                    className="mx-2 mb-2 rounded border p-2"
                    type="checkbox"
                    id="applied"
                    name="applied"
                    checked={editedJob.applied || false}
                    onChange={(e) =>
                      setEditedJob((prev) => ({
                        ...prev,
                        applied: e.target.checked,
                        date: e.target.checked ? prev.date || '' : '',
                      }))
                    }
                  />

                  <div className="flex flex-col">
                    {editedJob.applied && (
                      <>
                        <label htmlFor="date" className="sr-only">
                          Applied Date
                        </label>
                        <input
                          className="mb-2 w-full rounded border p-2"
                          type="date"
                          id="date"
                          name="date"
                          value={editedJob.date || ''}
                          onChange={handleInputChange}
                        />
                      </>
                    )}
                    <label htmlFor="requirements">Requirements</label>
                    <textarea
                      className="mb-2 w-full rounded border p-2"
                      name="requirements"
                      value={editedJob.requirements || ''}
                      onChange={handleInputChange}
                    />
                  </div>
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
                  <div className="flex justify-end space-x-4">
                    <button
                      className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-800"
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
                  <div className="mt-2 flex justify-end space-x-4">
                    <button
                      className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-400"
                      onClick={() => handleEditClick(job)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      <AddJobCard />
    </div>
  )
}

export default JobCard
