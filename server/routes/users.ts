import express from 'express'
import * as db from '../db/users'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import { User } from '../../models/user'

const router = express.Router()

// -- ADD NEW USER -- //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { name, email } = req.body
  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    return res.sendStatus(400)
  }

  try {
    const user: User = {
      auth0_id,
      name,
      email,
    }

    const result = await db.addProfile(user)
    return res.status(200).json(result)
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to add user profile' })
  }
})

// -- GET USER INFORMATION -- //
router.get('/:auth0_id', checkJwt, async (req: JwtRequest, res) => {
  const { auth0_id } = req.params

  if (!auth0_id) {
    return res.status(400).json({ success: false, message: 'Missing Auth0 ID' })
  }

  try {
    const user = await db.getUserByAuth0Id(auth0_id)

    if (!user) {
      return res.sendStatus(404)
    }

    return res.sendStatus(200)
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to fetch user data' })
  }
})

// -- UPDATE USER INFORMATION -- //
router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  const { name, email } = req.body
  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }
  try {
    await db.updateUserByAuth0Id(auth0_id, { name, email })
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
})

export default router
