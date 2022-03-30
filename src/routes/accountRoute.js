const accountRouter = require('express').Router();

const { AccountController } = require('../controllers/account');
const { validation } = require('../utils/validation');
const {
  changePasswordValidator,
  changeEmailValidator
} = require('../validations/account');

accountRouter
  .route('/change-password')
  .put(validation(changePasswordValidator), AccountController.changePassword);
accountRouter.route('/').get(AccountController.getAccount);

accountRouter
  .route('/change-email')
  .put(validation(changeEmailValidator), AccountController.changeEmail);
accountRouter.route('/confirm-email').get(AccountController.confirmEmail);
accountRouter
  .route('/cancel-email-changing')
  .post(AccountController.cancelEmailChanging);
accountRouter
  .route('/resent-email-new-token')
  .post(AccountController.resendConfirmNewEmailToken);

module.exports = accountRouter;
