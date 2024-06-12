import Joi from 'joi';

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    orderNumber: Joi.number().required(),
    total: Joi.number().required(),
    discount: Joi.number().default(0),
    timeStamp: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        })
    ).required()
});

export default orderSchema;