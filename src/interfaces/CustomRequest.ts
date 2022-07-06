import { Request } from '@hapi/hapi'

export interface CustomRequest extends Request {
    userId: string
}
