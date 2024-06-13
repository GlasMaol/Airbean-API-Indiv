import Joi from 'joi';

const offerSchema = Joi.object({
    products: Joi.array().items(Joi.number()).min(2).required(),
    offerPrice: Joi.number().min(0).required(),
    title: Joi.string().required(),
    description: Joi.string().required()
});

export default offerSchema;