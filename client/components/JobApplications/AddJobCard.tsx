import { useState } from 'react'
import { useAddJob } from '../../hooks/useAddJob.ts'
import { NewJobData } from '../../../models/job'

function AddJobCard() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [requirements, setRequirements] = useState('')
  const [applied, setApplied] = useState(false)
  const [date, setDate] = useState('')
  const [contacted, setContacted] = useState('')
  const [notes, setNotes] = useState('')

  const { mutate: addNewJob } = useAddJob()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newJob: NewJobData = {
      title,
      description,
      company,
      requirements,
      applied,
      date,
      contacted,
      notes,
    }

    addNewJob(newJob)
    setShowForm(false)
    setTitle('')
    setDescription('')
    setCompany('')
    setRequirements('')
    setApplied(false)
    setDate('')
    setContacted('')
    setNotes('')
  }

  return (
    <div className="w-full">
      {/* Add Job Button */}
      {!showForm && (
        <button
          className="block w-full transform rounded-2xl border border-gray-300 bg-white p-6 text-center text-lg font-bold shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          onClick={() => setShowForm(true)}
        >
          +
        </button>
      )}

      {/* Job Form */}
      {showForm && (
        <form
          className="w-full rounded-2xl border border-gray-300 bg-white p-6 shadow-md"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="company">
              Company Name
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
            <label className="block py-2 text-gray-700" htmlFor="requirements">
              Technical Requirements
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="mr-2 text-gray-700" htmlFor="applied">
              Applied
            </label>
            <input
              type="checkbox"
              id="applied"
              checked={applied}
              onChange={(e) => setApplied(e.target.checked)}
              className="rounded-md border-gray-300 shadow-sm focus:ring focus:ring-teal-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="date">
              Date Applied
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="contacted">
              Follow Up Notes
            </label>
            <input
              type="text"
              id="contacted"
              value={contacted}
              onChange={(e) => setContacted(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="notes">
              Additional Details
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200"
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
              Add Job
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddJobCard
