import { useState } from 'react'
import { useAllJobs } from '../../hooks/useAllJobs'
import { Job } from '../../../models/job'
import JobCard from './JobCard'
import { IfAuthenticated } from '../Authentication/Authenticated'
import AddJobCard from './AddJobCard'
import Loading from '../LoadingErrorPages/Loading'
import Error from '../LoadingErrorPages/Error'

function Navigation() {
  const { data, isLoading, isError } = useAllJobs()
  const [searchQuery, setSearchQuery] = useState('')

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
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
      <IfAuthenticated>
        <div className="mb-4 flex items-center rounded">
          <input
            type="text"
            className="block w-full transform rounded-lg border border-gray-300 bg-white p-2 text-left shadow-md transition-transform hover:shadow-xl"
            placeholder="Search jobs by title, company, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {data ? (
          <JobCard key={filteredJobs.id} jobs={filteredJobs} />
        ) : (
          <AddJobCard />
        )}
      </IfAuthenticated>
    </div>
  )
}

export default Navigation
