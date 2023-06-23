const Joi = require('joi');

const userRegisterSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(3)
        .max(30)
        .required()
});

const userLoginSchema = Joi.object({
    email : Joi.string()
        .email({minDomainSegments : 2})
        .required(),

    password : Joi.string()
        .required()
})

module.exports = {
    userRegisterSchema,
    userLoginSchema
}