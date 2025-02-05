export interface Job {
  id: number
  title: string
  description: string
  company: string
  requirements: string
  applied: boolean
  date: string
  contacted: string
  notes: string
  userId: string
}

export interface JobData {
  title: string
  description: string
  company: string
  requirements: string
  applied: boolean
  date: string
  contacted: string
  notes: string
  userId: string
}

export interface AppliedForJob {
  id: number
  applied: boolean
}

export interface EditJobData {
  id: number
  title: string
  description: string
  company: string
  requirements: string
  applied: boolean
  date: string
  contacted: string
  notes: string
}

export interface NewJobData {
  title: string
  description: string
  company: string
  requirements: string
  applied: boolean
  date: string
  contacted: string
  notes: string
}
