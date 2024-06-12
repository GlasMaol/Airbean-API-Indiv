import Joi from 'joi';

const menuUpdateSchema = Joi.object ({
    //id: Joi.number().min(1).required(),
    title: Joi.string().optional(),
    desc: Joi.string().optional(),
    price: Joi.number().optional(),
    offer: Joi.boolean().optional()
})

export default menuUpdateSchema;