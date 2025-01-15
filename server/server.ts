import express from 'express'
import * as Path from 'node:path'

import jobRoutes from './routes/jobs.ts'
import userRoutes from './routes/users.ts'
import boardRoutes from './routes/boards.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/jobs', jobRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/boards', boardRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
