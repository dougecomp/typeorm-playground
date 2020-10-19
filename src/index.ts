import 'reflect-metadata'
import 'dotenv-safe/config'
import { join } from 'path'

import { createConnection, getConnectionOptions } from 'typeorm'

import { app } from './app'

getConnectionOptions().then(connectionOptions => {
  Object.assign(connectionOptions, {
    entities: [
      join(__dirname, 'src', '**', 'entities', '*.{ts,js}')
    ],
    migrations: [
      join(__dirname, 'src', '**', 'migrations', '*.{ts,js}')
    ],
    options: {
      enableArithAbort: false,
      cli: {
        entitiensDir: 'src/entitiens',
        migrationsDir: 'src/migrations'
      }
    }
  })

  createConnection(connectionOptions).then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log('Error on connection to database: ' + err)
    console.log('Check if user and/or database exists and credentials are correct')
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready to receive requisitions on port ' + port)
})
