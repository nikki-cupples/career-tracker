import { Job } from '../../models/job'
import { useAllJobs } from '../hooks/useAllJobs'
import AddJobCard from './AddJobCard'
import { useState } from 'react'
import { useEditJob } from '../hooks/useEditJob'

function JobCard() {
  const { data } = useAllJobs()
  const { mutate: editJob } = useEditJob()

  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({})
  const [editMode, setEditMode] = useState<Record<string, boolean>>({})
  const [editedFields, setEditedFields] = useState<Record<string, Partial<Job>>>({})

  const toggleExpansion = (jobId: number) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  const handleDoubleClick = (jobId: number, field: string, value: string) => {
    setEditMode((prev) => ({
      ...prev,
      [jobId]: true,
    }))
    setEditedFields((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value,
      },
    }))
  }

  const handleChange = (jobId: number, field: string, value: string) => {
    setEditedFields((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value,
      },
    }))
  }

  const handleSave = (jobId: number) => {
    if (editedFields[jobId]) {
      editJob({ jobId, updates: editedFields[jobId] })
    }
    setEditMode((prev) => ({
      ...prev,
      [jobId]: false,
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
              <h2 className="mb-2 text-lg font-semibold uppercase text-gray-800 md:text-xl">
                {job.title}
              </h2>

              <p
                className="mb-2 text-lg capitalize text-gray-700"
                onDoubleClick={() =>
                  handleDoubleClick(job.id, 'company', job.company)
                }
              >
                {editMode[job.id] ? (
                  <input
                    type="text"
                    value={editedFields[job.id]?.company || job.company}
                    onChange={(e) =>
                      handleChange(job.id, 'company', e.target.value)
                    }
                  />
                ) : (
                  job.company
                )}
              </p>

              <p
                className="mb-4 text-lg capitalize text-gray-500"
                onDoubleClick={() =>
                  handleDoubleClick(
                    job.id,
                    'applied',
                    job.applied ? `Applied on ${job.date}` : 'Not applied',
                  )
                }
              >
                {editMode[job.id] ? (
                  <input
                    type="text"
                    value={
                      editedFields[job.id]?.applied ||
                      (job.applied ? `Applied on ${job.date}` : 'Not applied')
                    }
                    onChange={(e) =>
                      handleChange(job.id, 'applied', e.target.value)
                    }
                  />
                ) : job.applied ? (
                  `Applied on ${job.date}`
                ) : (
                  'Not applied'
                )}
              </p>

              <button className="text-sm md:text-lg text-blue-500" onClick={() => toggleExpansion(job.id)}>
                {expandedJobs[job.id] ? 'Less' : 'More'}
              </button>

              {expandedJobs[job.id] && (
                <>
                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">About</p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p
                      className="mt-2 line-clamp-3 rounded p-2 text-sm text-gray-800"
                      onDoubleClick={() =>
                        handleDoubleClick(job.id, 'description', job.description)
                      }
                    >
                      {editMode[job.id] ? (
                        <textarea
                          value={editedFields[job.id]?.description || job.description}
                          onChange={(e) =>
                            handleChange(job.id, 'description', e.target.value)
                          }
                          className="w-full rounded p-2"
                        />
                      ) : (
                        job.description
                      )}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">Requirements</p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p
                      className="rounded p-2 text-sm"
                      onDoubleClick={() =>
                        handleDoubleClick(job.id, 'requirements', job.requirements)
                      }
                    >
                      {editMode[job.id] ? (
                        <textarea
                          value={editedFields[job.id]?.requirements || job.requirements}
                          onChange={(e) =>
                            handleChange(job.id, 'requirements', e.target.value)
                          }
                          className="w-full rounded p-2"
                        />
                      ) : (
                        job.requirements
                      )}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">Follow Up Information</p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p
                      className="rounded p-2 text-sm"
                      onDoubleClick={() =>
                        handleDoubleClick(job.id, 'contacted', job.contacted)
                      }
                    >
                      {editMode[job.id] ? (
                        <textarea
                          value={editedFields[job.id]?.contacted || job.contacted}
                          onChange={(e) =>
                            handleChange(job.id, 'contacted', e.target.value)
                          }
                          className="w-full rounded p-2"
                        />
                      ) : (
                        job.contacted
                      )}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-semibold capitalize text-gray-800">Relevant Details & Links</p>
                  <div className="rounded-lg bg-gray-100 p-2 shadow-inner">
                    <p
                      className="rounded p-2 text-sm"
                      onDoubleClick={() =>
                        handleDoubleClick(job.id, 'notes', job.notes)
                      }
                    >
                      {editMode[job.id] ? (
                        <textarea
                          value={editedFields[job.id]?.notes || job.notes}
                          onChange={(e) =>
                            handleChange(job.id, 'notes', e.target.value)
                          }
                          className="w-full rounded p-2"
                        />
                      ) : (
                        job.notes
                      )}
                    </p>
                  </div>

                  {editMode[job.id] && (
                    <button
                      onClick={() => handleSave(job.id)}
                      className="mt-4 text-sm md:text-lg text-blue-500"
                    >
                      Save
                    </button>
                  )}
                </>
              )}
            </div>
          ))}

      <AddJobCard />
    </div>
  )
}

export default JobCard
