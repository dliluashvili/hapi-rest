import { generateJwtToken } from './../utils/jwt'
import Boom from '@hapi/boom'
import { scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import usersService from './users-service'
const scrypt = promisify(_scrypt)

const signIn = async (username: string, password: string): Promise<string> => {
    const user = await usersService.findByUsername(username)

    const [salt, storedHash] = user.password!.split('.')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (storedHash === hash.toString('hex')) {
        const token = generateJwtToken(user._id?.toString()!)

        return token
    }

    throw Boom.badRequest('Incorrect credentials')
}

export default {
    signIn,
}
