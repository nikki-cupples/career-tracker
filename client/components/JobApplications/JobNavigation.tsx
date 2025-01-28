import { useState } from 'react'
import { useAllJobs } from '../../hooks/useAllJobs'
import { Job } from '../../../models/job'
import JobCard from './JobCard'
import AddJobCard from './AddJobCard'
import Loading from '../LoadingErrorPages/Loading'
import ErrorApplications from '../LoadingErrorPages/ErrorApplications'

function Navigation() {
  const { data, isLoading, isError } = useAllJobs()
  const [searchQuery, setSearchQuery] = useState('')

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorApplications />
  }

  const filteredJobs = data?.data.filter((job: Job) => {
    const lowerQuery = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
    )
  })

  return (
    <div>
      <div className="mb-4 flex items-center rounded">
        <label htmlFor="search-bar" className="sr-only">
          Search
        </label>
        <input
          id="search-bar"
          type="text"
          className="block w-full transform rounded-lg border border-gray-300 bg-white p-2 text-left shadow-md transition-transform hover:shadow-xl"
          placeholder="Search jobs by title, company, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredJobs ? (
        <JobCard key={filteredJobs.id} jobs={filteredJobs} />
      ) : (
        <AddJobCard />
      )}
    </div>
  )
}

export default Navigation
