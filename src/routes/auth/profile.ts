import usersController from '../../controllers/users-controller'

export const profile = {
    method: 'GET',
    path: '/profile',
    handler: usersController.profile,
    options: {
        auth: {
            strategy: 'jwt',
        },
    },
}
