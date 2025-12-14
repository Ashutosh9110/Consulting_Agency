const { celebrate, Joi, Segments } = require("celebrate");

exports.validateSignup = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid("user", "admin").optional(),
    }).unknown(true)
});

exports.validateLogin = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
});
