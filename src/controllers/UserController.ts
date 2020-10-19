import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../entities/User'

export class UserController {
  async index (request: Request, response: Response): Promise<Response<User[]>> {
    const userRepository = getRepository(User)

    const users = await userRepository.find()

    return response.json({ users })
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const userRepository = getRepository(User)

    const user = await userRepository.save({
      name,
      email
    })

    return response.json({ user }).status(201)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email } = request.body

    const userRepository = getRepository(User)

    const user = await userRepository.findOne(id)

    if (!user) {
      return response.status(500)
    }

    Object.assign(user, { name, email })

    await userRepository.save(user)

    return response.json({})
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userRepository = getRepository(User)

    const user = await userRepository.findOne(id)

    if (!user) {
      return response.status(500)
    }

    await userRepository.delete(user)

    return response.json({})
  }
}
