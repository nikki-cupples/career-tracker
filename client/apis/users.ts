import request from 'superagent'
import { EditUser, User } from '../../models/user'

// -- GET USER DATA BY AUTH0-ID -- //
export async function getUser(auth0_id: string, token: string) {
  const res = await request
    .get(`/api/v1/users/${auth0_id}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body.user[0]
}

// -- UPSERT USER PROFILE (ADD OR UPDATE) -- //
export async function upsertUser(profileData: User, token: string) {
  const res = await request
    .post('/api/v1/users/')
    .set('Authorization', `Bearer ${token}`)
    .send(profileData)
  return res.body
}

// -- EDIT USER -- //
export async function editUser(updatedProfile: EditUser, token: string) {
  try {
    const res = await request
      .patch('/api/v1/users/')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProfile)
    return res.body
  } catch (error) {
    throw new Error('error')
  }
}
