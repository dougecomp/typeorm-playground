import express from 'express'

import { UserController } from './controllers/UserController'

const app = express()
app.use(express.json())

const userController = new UserController()

app.get('/users', userController.index)
app.get('/users/:id', userController.show)
app.post('/users', userController.create)
app.put('/users/:id', userController.update)
app.delete('/users/:id', userController.delete)

export { app }
