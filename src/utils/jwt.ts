import jwt from 'jsonwebtoken'

export const generateJwtToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Secret is missing')
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2 days',
    })

    return token
}
