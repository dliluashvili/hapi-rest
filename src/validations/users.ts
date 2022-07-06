import Joi from 'joi'

// const authorV1Schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     createdAt: Joi.date().required(),
// })

export default {
    payload: Joi.object({
        username: Joi.string()
            .min(3)
            .messages({
                'string.min': 'username must have a minimum length of {#limit}',
            })
            .required(),
        password: Joi.string()
            .min(6)
            .messages({
                'string.min': 'password must have a minimum length of {#limit}',
            })
            .required(),
    }),
}
