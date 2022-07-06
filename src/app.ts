import Hapi, { Server } from '@hapi/hapi'
import routes from './routes'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import dotenv from 'dotenv'
import db from './database'
import { CustomRequest } from './interfaces/CustomRequest'
import { CustomPayload } from './interfaces/CustomPayload'

dotenv.config()

const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
        cors: true,
        validate: {
            failAction: async (req, h, err) => {
                throw err
            },
        },
    },
})

export const start = async (): Promise<Server> => {
    await server.register(hapiAuthJwt2)
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: function (decoded: CustomPayload, request: CustomRequest, h) {
            let isValid = false
            if (decoded.id) {
                request.userId = decoded.id
                isValid = true
            }

            return {
                isValid,
            }
        },
    })

    server.auth.default('jwt')
    await server.start()
    server.route(routes)
    await db.connect()
    return server
}

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})
