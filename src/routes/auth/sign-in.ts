import { ServerRoute } from '@hapi/hapi'
import usersController from '../../controllers/users-controller'
import signInValidation from '../../validations/sign-in'

export const signIn: ServerRoute = {
    method: 'POST',
    path: '/sign-in',
    handler: usersController.signIn,
    options: {
        auth: false,
        validate: signInValidation,
    },
}
