import { ObjectId } from 'mongodb'
import Boom from '@hapi/boom'
import { collections } from '../database'
import User from '../models/user'
import { generatePassword } from '../utils/password'

const findAll = async (): Promise<User[]> => {
    const users = (await collections.users?.find({}).toArray()) as User[]

    return users
}

const findOne = async (filter: Partial<User>): Promise<User> => {
    const user = (await collections.users?.findOne(filter)) as User

    if (!user) {
        throw Boom.notFound('User not found')
    }

    return user
}

const findByUsername = async (username: string): Promise<User> => {
    const user = await findOne({ username })

    return user
}

const findById = async (_id: string): Promise<User> => {
    const user = await findOne({ _id: new ObjectId(_id) })

    return user
}

const create = async (username: string, password: string) => {
    const found = await findByUsername(username)

    if (found) {
        throw Boom.badRequest('Username is already taken')
    }

    await collections.users?.insertOne({
        username: username,
        password: await generatePassword(password),
    })

    return 'created'
}

const remove = async (_id: string) => {
    return await collections.users?.deleteOne({
        _id: new ObjectId(_id),
    })
}

export default {
    findAll,
    findById,
    findByUsername,
    findOne,
    create,
    remove,
}
