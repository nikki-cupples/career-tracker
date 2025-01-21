import express from 'express'
import {
  getAllJobs,
  getJobById,
  addJob,
  deleteJob,
  checkOffJob,
  editJob,
} from '../db/jobs'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'

// -- API ROUTES SERVERSIDE -- //
const router = express.Router()

// -- GET ALL USER'S JOBS -- //
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid user id' })
  }

  try {
    const data = await getAllJobs(userId)
    res.json({ data })
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- GET JOB BY JOB ID -- //
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
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  const newJob = req.body

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid user id' })
  }

  try {
    await addJob(newJob, userId)
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
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
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
