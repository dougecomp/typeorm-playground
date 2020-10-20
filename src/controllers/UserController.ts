import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../entities/User'

export class UserController {
  async index (request: Request, response: Response): Promise<Response<User[]>> {
    const userRepository = getRepository(User)

    const users = await userRepository.find()

    return response.json(users)
  }

  async show (request: Request, response: Response): Promise<Response<User>> {
    const { id } = request.params

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(500).json(error)
    }

    return response.json(user)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const userRepository = getRepository(User)

    const user = await userRepository.save(
      userRepository.create({
        name,
        email,
        password
      })
    )

    return response.status(201).json(user)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, password } = request.body

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(500).json(error)
    }

    if (!user) {
      return response.status(500)
    }

    Object.assign(user, { name, email, password })

    await userRepository.save(user)

    return response.json()
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(500).json(error)
    }

    if (!user) {
      return response.status(500)
    }

    await userRepository.remove(user)

    return response.json()
  }
}
