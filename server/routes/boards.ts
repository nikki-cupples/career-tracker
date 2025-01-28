import express from 'express'
import {
  addJobBoard,
  deleteJobBoard,
  editJobBoard,
  getAllBoards,
  getBoardById,
} from '../db/boards'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'

// -- API ROUTES SERVERSIDE -- //
const router = express.Router()

// -- GET ALL JOB BOARDS -- //
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid user id' })
  }

  try {
    const data = await getAllBoards(userId)
    res.json({ data })
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- GET JOB BOARD BY ID -- //
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const data = await getBoardById(id)
    res.json(data)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- ADD NEW JOB BOARD -- //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  const newJobBoard = req.body

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid user id' })
  }

  try {
    await addJobBoard(newJobBoard, userId)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- DELETE JOB BOARD -- //
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const removeJobBoard = await deleteJobBoard(id)
    res.json(removeJobBoard)
  } catch (error) {
    res.sendStatus(500)
  }
})

// -- EDIT JOB -- //
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const { company, link, board } = req.body

  try {
    await editJobBoard({
      id,
      company,
      link,
      board,
    })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
