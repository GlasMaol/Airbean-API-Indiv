import Joi from 'joi';

const menuSchema = Joi.object({
    id: Joi.number().min(1).required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required(),
    offer: Joi.boolean().default(false),
});

export default menuSchema;