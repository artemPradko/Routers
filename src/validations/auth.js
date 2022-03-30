const { checkSchema } = require('express-validator');

const { validationRules } = require('./common');

const loginValidator = checkSchema({
  password: validationRules.password,
  email: validationRules.email
});

const registrationValidator = checkSchema({
  password: validationRules.password,
  email: validationRules.email,
  name: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Length of the value should be within 3 and 50 symbols'
    }
  },
  lastName: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Length of the value should be within 3 and 50 symbols'
    }
  }
});

const resetPasswordValidator = checkSchema({
  email: validationRules.email
});

const confirmNewPasswordValidation = checkSchema({
  password: validationRules.password,
  resetPasswordToken: {
    in: ['body'],
    isString: true,
    errorMessage: 'Value must exits'
  }
});

const refreshTokenValidator = checkSchema({
  refreshToken: {
    in: ['body'],
    isString: true,
    errorMessage: 'Value must exits'
  }
});

const emailTokenValidator = checkSchema({
  emailConfirmToken: {
    in: ['body'],
    isString: true,
    errorMessage: 'Value must exits'
  }
});

module.exports = {
  loginValidator,
  registrationValidator,
  resetPasswordValidator,
  confirmNewPasswordValidation,
  refreshTokenValidator,
  emailTokenValidator
};
