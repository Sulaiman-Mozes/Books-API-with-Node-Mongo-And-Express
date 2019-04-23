const Joi = require('joi');

const currentYear = new Date().getFullYear();

module.exports = {
    queryValidator: {
        query: {
            year: Joi.number().integer().min(1700).max(currentYear),
            title: Joi.string(),
            language: Joi.string(),
            country: Joi.string(),
            author: Joi.string()
        }
    },
    addValidator: {
        body: {
            year: Joi.number().integer().required(),
            title: Joi.string().required(),
            language: Joi.string().required(),
            country: Joi.string().required(),
            author: Joi.string().required(),
            pages: Joi.number().integer().required(),
            imageLink: Joi.string().required(),
            link: Joi.string().required(),
        }
    }
}