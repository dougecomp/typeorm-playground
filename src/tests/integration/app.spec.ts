import fs from 'fs'
import request from 'supertest'
import { createConnection, getConnection, getRepository } from 'typeorm'

import { app } from '../../app'
import { User } from '../../entities/User'

describe('App Test Suite', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: './database.sqlite',
      dropSchema: true,
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
        migrationsDir: 'src/database/migrations'
      }
    })
  })

  afterEach(async () => {
    await getRepository(User).clear()
  })

  afterAll(async () => {
    const databaseFilePath = getConnection().options.database as string
    await getConnection().dropDatabase()
    await getConnection().close()
    fs.unlinkSync(databaseFilePath)
  })

  it('should list users', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveLength(0)
  })

  it('should create a user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Douglas Silva',
      email: 'douglaseusilva@gmail.com',
      password: '123abc456def'
    })
    expect(response.status).toBe(201)
  })

  it('should get a user', async () => {
    const creationResponse = await request(app).post('/users').send({
      name: 'Douglas Silva',
      email: 'douglaseusilva@gmail.com',
      password: '123abc456def'
    })

    const user = creationResponse.body

    const response = await request(app).get('/users/' + user.id)
    expect(response.body.id).toBeDefined()
  })

  it('should update user', async () => {
    const creationResponse = await request(app).post('/users').send({
      name: 'Douglas Silva',
      email: 'douglaseusilva@gmail.com',
      password: '123abc456def'
    })

    const user = creationResponse.body

    await request(app).put('/users/' + user.id).send({
      name: 'Douglas Eder Uno Silva',
      email: 'deusilva@uefs.br'
    })

    const getResponse = await request(app).get('/users/' + user.id)
    const updatedUser = getResponse.body
    expect(updatedUser.name).toBe('Douglas Eder Uno Silva')
    expect(updatedUser.email).toBe('deusilva@uefs.br')
  })

  it('should delete user', async () => {
    const creationResponse = await request(app).post('/users').send({
      name: 'Douglas Silva',
      email: 'douglaseusilva@gmail.com',
      password: '123abc456def'
    })

    const user = creationResponse.body

    const response = await request(app).delete('/users/' + user.id)
    expect(response.status).toBe(200)

    const getResponse = await request(app).get('/users/' + user.id)
    expect(getResponse.status).toBe(500)
  })
})
