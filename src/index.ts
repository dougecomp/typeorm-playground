import 'reflect-metadata'
import { config } from 'dotenv-safe'

import { createConnection } from 'typeorm'

import { app } from './app'

config()

const validEnvironments = ['production', 'development']

const environment = process.env.NODE_ENV || 'development'
if (!validEnvironments.includes(environment)) {
  console.error('Incorrent environmment', process.env.NODE_ENV)
  process.exit(1)
}

createConnection().then(() => {
  console.log('Database connected')
}).catch(err => {
  console.log('Error on connection to database: ' + err)
  console.log('Check if user and/or database exists and credentials are correct')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready to receive requisitions on port ' + port)
})
