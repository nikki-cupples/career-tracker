import { useAllJobs } from '../hooks/useAllJobs'
import { Job } from '../../models/job'

function Dashboard() {
  const { data } = useAllJobs()
  return (
    <div>
      <p>List of all jobs</p>
      <ul>
        {data && data.data.map((job: Job) => <li key={job.id}>{job.title}</li>)}
      </ul>
    </div>
  )
}

export default Dashboard
