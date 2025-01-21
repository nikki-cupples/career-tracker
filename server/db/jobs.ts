import db from './connection.ts'
import { AppliedForJob, EditJobData, Job, JobData } from '../../models/job.ts'

// -- GET ALL JOBS -- //
export async function getAllJobs(user_id: string): Promise<Job[]> {
  const jobs = await db('job_information')
    .select(
      'title',
      'description',
      'company',
      'requirements',
      'applied',
      'date',
      'contacted',
      'notes',
      'user_id as userId',
    )
    .where({ user_id })
  return jobs as Job[]
}

// -- GET JOB BY ID -- //
export async function getJobById(id: number): Promise<Job> {
  const job = await db('job_information').select().first().where({ id })
  return job as Job
}

// -- ADD NEW JOB -- //
export async function addJob(data: JobData, userId: string): Promise<JobData> {
  const {
    title,
    description,
    company,
    requirements,
    applied,
    date,
    contacted,
    notes,
  } = data

  return await db('job_information').insert({
    title,
    description,
    company,
    requirements,
    applied,
    date,
    contacted,
    notes,
    user_id: userId,
  })
}

// -- DELETE JOB -- //
export async function deleteJob(id: number): Promise<Job> {
  return await db('job_information').where('id', id).del()
}

// -- CHECK OFF APPLIED FOR JOB -- //
export async function checkOffJob(
  appliedforJob: AppliedForJob,
): Promise<AppliedForJob> {
  return await db('job_information')
    .where('id', appliedforJob.id)
    .update('applied', appliedforJob.applied)
}

// -- EDIT JOB -- //
export async function editJob(updatedJob: EditJobData): Promise<EditJobData> {
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
  } = updatedJob

  return await db('job_information').where('id', id).update({
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
