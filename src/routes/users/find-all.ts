import { ServerRoute } from '@hapi/hapi'
import usersController from '../../controllers/users-controller'

export const findAll: ServerRoute = {
    method: 'GET',
    path: '/users',
    handler: usersController.findAll,
    options: {
        auth: false,
    },
}
