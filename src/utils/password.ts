import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

export const generatePassword = async (password: string): Promise<string> => {
    const scrypt = promisify(_scrypt)

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(password, salt, 32)) as Buffer

    return `${salt}.${hash.toString('hex')}`
}
