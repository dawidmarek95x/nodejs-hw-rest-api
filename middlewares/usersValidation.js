const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .pattern(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    )
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .pattern(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    )
    .required(),
  password: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verificationEmailSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .pattern(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    )
    .required(),
});

const validation = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const [{ message }] = error.details;
    return res.status(400).json({
      message: message.replace(/"/g, ""),
    });
  }
  next();
};

const validateRegistration = (req, res, next) => validation(registrationSchema, req, res, next);
const validateLogin = (req, res, next) => validation(loginSchema, req, res, next);
const validateSubscription = (req, res, next) => validation(subscriptionSchema, req, res, next);
const validateEmail = (req, res, next) => validation(verificationEmailSchema, req, res, next);

module.exports = {
  validateRegistration,
  validateLogin,
  validateSubscription,
  validateEmail,
};
