const Joi = require('joi');

module.exports = {
    create: {
        body: {
            username: Joi.string().min(4).required(),
            password: Joi.string().min(8).alphanum().required(),
            email: Joi.string().email().required(),
        }
    },
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().alphanum().required(),
        }
    }
}