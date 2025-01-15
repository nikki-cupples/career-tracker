export interface User {
  auth0_id: string
  name: string
  email: string
}

export interface EditUser {
  name?: string
  email?: string
}
