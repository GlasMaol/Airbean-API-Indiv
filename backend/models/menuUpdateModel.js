import Joi from 'joi';

const menuUpdateSchema = Joi.object ({
    title: Joi.string().optional(),
    desc: Joi.string().optional(),
    price: Joi.number().optional(),
    offer: Joi.boolean().optional()
})

export default menuUpdateSchema;