import { ServerRoute } from '@hapi/hapi'
import usersController from '../../controllers/users-controller'

export const remove: ServerRoute = {
    method: 'DELETE',
    path: '/users/{id}',
    handler: usersController.remove,
    options: {
        auth: false,
    },
}
