import { ServerRoute } from '@hapi/hapi'
import usersController from '../../controllers/users-controller'
import createUserValidation from '../../validations/users'

export const create: ServerRoute = {
    method: 'POST',
    path: '/users',
    handler: usersController.create,
    options: {
        auth: false,
        validate: createUserValidation,
    },
}
