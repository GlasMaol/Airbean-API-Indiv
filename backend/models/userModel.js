import Joi from 'joi'

const userSchema = Joi.object({
    username: Joi.string().min(5).max(10).alphanum().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('user', 'admin').default('user')
    //valid = kan bara vara user eller admin
    //default = om inget role skrivs så blit role default user.
})

export default userSchema;