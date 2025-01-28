import request from 'superagent'
import { Job, NewJobData } from '../../models/job'

// -- GET JOBS -- //
export async function getJobs(token: string) {
  const res = await request
    .get('/api/v1/jobs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as Job[]
}

// -- ADD NEW JOB -- //
export async function addJob(job: NewJobData, token: string) {
  try {
    const res = await request
      .post('/api/v1/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send(job)

    return res.body
  } catch (error) {
    console.error(500)
  }
}

// -- EDIT JOB -- //
export async function editJobInformation(token: string, editedJob: Job) {
  const {
    id,
    title,
    description,
    company,
    requirements,
    applied,
    date,
    contacted,
    notes,
  } = editedJob
  await request
    .put(`/api/v1/jobs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      id,
      title,
      description,
      company,
      requirements,
      applied,
      date,
      contacted,
      notes,
    })
}
