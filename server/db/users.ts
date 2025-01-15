import { EditUser, User } from '../../models/user'
import db from './connection'

export async function addProfile(user: User) {
  const { auth0_id, name, email } = user

  try {
    const existingUser = await db('users').where('auth0_id', auth0_id).first()
    if (existingUser) {
      return { success: true, message: 'User already exists' }
    }
    await db('users')
      .insert({
        auth0_id,
        name,
        email,
      })
      .onConflict('auth0_id')
      .merge()

    return { success: true, message: 'User added/updated successfully' }
  } catch (error) {
    throw new Error(
      ` ${error instanceof Error ? error.message : 'Failed to add or update user'}`,
    )
  }
}

export async function getUserByAuth0Id(auth0_id: string): Promise<User[]> {
  const result = await db('users').where('auth0_id', auth0_id).select('*')

  return result
}

export async function updateUserByAuth0Id(
  auth0_id: string,
  updatedProfile: EditUser,
) {
  const result = await db('users')
    .where('auth0_id', auth0_id)
    .update(updatedProfile)
  return result
}
