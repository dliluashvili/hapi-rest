import Joi from 'joi'

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
