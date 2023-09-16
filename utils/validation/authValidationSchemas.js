const Joi = require('joi');
const { nameValidationRegex, passwordValidationRegex } = require('./constants/regex');
const { NAME_MIN_LENGTH, NAME_MAX_LENGTH, EMAIL_MAX_LENGTH } = require('./constants/fieldLength');
const {
  NAME_VALIDATION_ERROR_MESSAGE,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
} = require('./constants/validationErrorMessages');

const registrationValidationSchema = Joi.object({
  name: Joi.string()
    .min(NAME_MIN_LENGTH)
    .max(NAME_MAX_LENGTH)
    .required()
    .pattern(nameValidationRegex)
    .messages({ 'string.pattern.base': NAME_VALIDATION_ERROR_MESSAGE }),
  email: Joi.string().email().max(EMAIL_MAX_LENGTH).required(),
  password: Joi.string()
    .pattern(passwordValidationRegex)
    .required()
    .messages({ 'string.pattern.base': PASSWORD_VALIDATION_ERROR_MESSAGE }),
});

const loginValidationSchema = Joi.object().keys({
  email: registrationValidationSchema.extract('email'),
  password: registrationValidationSchema.extract('password'),
});


module.exports = { registrationValidationSchema, loginValidationSchema };
