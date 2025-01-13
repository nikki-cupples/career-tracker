import express from 'express'
import {
  getAllJobs,
  getJobById,
  addJob,
  deleteJob,
  checkOffJob,
  editJob,
} from '../db/jobs'

// -- API ROUTES SERVERSIDE -- //
const router = express.Router()

// -- GET ALL JOBS -- //
router.get('/', async (_req, res) => {
  try {
    const data = await getAllJobs()
    res.json({ data })
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- GET JOB BY ID -- //
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const data = await getJobById(id)
    res.json(data)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- ADD NEW JOB -- //
router.post('/', async (req, res) => {
  const newJob = req.body
  try {
    await addJob(newJob)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- DELETE JOB -- //
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const removeJob = await deleteJob(id)
    res.json(removeJob)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- CHECK OFF APPLIED FOR JOB -- //
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { applied } = req.body
  try {
    await checkOffJob({ id, applied })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- EDIT JOB -- //
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const {
    title,
    description,
    company,
    requirements,
    applied,
    date,
    contacted,
    notes,
  } = req.body

  try {
    await editJob({
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
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
