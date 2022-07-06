import { ServerRoute } from '@hapi/hapi'
import usersController from '../../controllers/users-controller'

export const find: ServerRoute = {
    method: 'GET',
    path: '/users/{id}',
    handler: usersController.find,
    options: {
        auth: false,
    },
}
