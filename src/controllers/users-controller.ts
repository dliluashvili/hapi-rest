import { Request, ResponseToolkit } from '@hapi/hapi'
import usersService from '../services/users-service'
import authService from '../services/auth-service'
import User from '../models/user'
import { CustomRequest } from '../interfaces/CustomRequest'

const findAll = async (): Promise<User[]> => {
    const users = await usersService.findAll()
    return users.map((user) => {
        delete user.password
        return user
    })
}

const find = async (request: Request): Promise<User> => {
    const user = await usersService.findById(request.params.id)

    delete user.password

    return user
}

const signIn = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload as User

    return authService.signIn(payload.username, payload.password!)
}

const profile = async (request: CustomRequest) => {
    const user = await usersService.findById(request.userId)
    delete user.password

    return user
}

const create = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload as User

    return usersService.create(payload.username, payload.password!)
}

const remove = (request: Request) => {
    return usersService.remove(request.params.id)
}

export default {
    findAll,
    find,
    create,
    remove,
    signIn,
    profile,
}
