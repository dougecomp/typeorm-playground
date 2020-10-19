import fs from 'fs'
import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'

import { app } from '../app'

describe('App Test Suite', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: './db',
      synchronize: true,
      logging: false,
      entities: [
        'src/entities/**/*.ts'
      ],
      migrations: [
        'src/migrations/**/*.ts'
      ],
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations'
      }
    })
  })

  afterAll(async () => {
    await getConnection().dropDatabase()
    await getConnection().close()
    fs.unlinkSync(getConnection().options.database as string)
  })

  it('should list users', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('users')
    expect(response.body.users).toHaveLength(0)
  })
})
