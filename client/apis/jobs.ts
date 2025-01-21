import request from 'superagent'
import { Job } from '../../models/job'

// -- GET JOBS -- //
export async function getJobs(token: string) {
  const res = await request
    .get('/api/v1/jobs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as Job[]
}
