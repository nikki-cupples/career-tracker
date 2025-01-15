import express from 'express'
import {
  addJobBoard,
  deleteJobBoard,
  editJobBoard,
  getAllBoards,
  getBoardById,
} from '../db/boards'

// -- API ROUTES SERVERSIDE -- //
const router = express.Router()

// -- GET ALL JOB BOARDS -- //
router.get('/', async (_req, res) => {
  try {
    const data = await getAllBoards()
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
router.post('/', async (req, res) => {
  const newJobBoard = req.body
  try {
    await addJobBoard(newJobBoard)
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
router.put('/:id', async (req, res) => {
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
