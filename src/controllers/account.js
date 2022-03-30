const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { createJWT, verifyJWT } = require('../utils/jwt');
const { sendConfirmToken, emailType } = require('../utils/mailer');
const { UserService } = require('../services/userServices');
const { UsersController } = require('./users');
const { SessionService } = require('../services/session');

class AccountController {
  static async changePassword(req, res) {
    const { oldPassword, newPassword, accessToken } = req.body;
    console.info('accessToken changePassword ---', accessToken);

    try {
      const accessTokenData = verifyJWT(accessToken);
      const user = await UserService.findById(accessTokenData.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      console.info('oldPassword ---', oldPassword);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: 'Wrong old password'
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);

      await SessionService.removeAllSessionByUser(user._id);
      await UserService.updateUser(user);

      return res.status(200).json({
        success: true,
        message: 'Password changed'
      });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }

  static async changeEmail(req, res) {
    const { newEmail } = req.body;
    const userId = mongoose.Types.ObjectId(req.query.id);

    if (!userId) {
      return res.status(404).json({
        success: false,
        error: 'User not found!'
      });
    }

    try {
      const exitsUser = await UserService.findByEmail(newEmail);
      const user = await UserService.findById(
        mongoose.Types.ObjectId(req.query.id)
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found!'
        });
      }

      if (exitsUser) {
        return res.status(422).json({
          errors: [{ user: 'email already exits' }]
        });
      }

      const emailConfirmToken = createJWT(
        newEmail,
        mongoose.Types.ObjectId(req.query.id),
        3600
      );
      user.emailConfirmToken = '';
      user.emailConfirmToken = emailConfirmToken;
      user.email = newEmail;
      await UserService.updateUser(user);
      sendConfirmToken(
        newEmail,
        user.name,
        emailConfirmToken,
        emailType.confirmNewEmail
      );

      return res.status(200).json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: err });
    }
  }

  static async confirmEmail(req, res) {
    const { emailConfirmToken } = req.query;

    try {
      const tokenData = verifyJWT(emailConfirmToken);

      if (!tokenData) {
        return res.status(400).json({
          errors: 'token incorrect or expired'
        });
      }

      const userId = tokenData?.userId;

      const user = await UserService.findById(userId);

      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }]
        });
      }

      const newEmail = user.newEmail;

      if (user.emailConfirmToken !== emailConfirmToken) {
        return res.status(404).json({
          errors: [{ user: 'not found' }]
        });
      }

      user.email = newEmail;
      user.emailConfirmToken = null;
      await UserService.updateUser(user);

      return res.status(200).json({
        success: true,
        userId: user.id,
        message: 'Email confirm'
      });
    } catch (err) {
      console.info('err ---', err);
      return res.status(500).json({ errors: err });
    }
  }

  static async cancelEmailChanging(req, res) {
    const userId = mongoose.Types.ObjectId(req.query.id);

    if (!userId) {
      return res.status(404).json({
        success: false,
        error: 'User not found!'
      });
    }

    try {
      const user = await UserService.findById(
        mongoose.Types.ObjectId(req.query.id)
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found!'
        });
      }

      user.newEmail = null;
      user.emailConfirmToken = null;

      return res.status(200).json({
        success: true,
        message: 'Email changing canceled'
      });
    } catch (err) {
      return res.status(200).json({ errors: err });
    }
  }

  static async resendConfirmNewEmailToken(req, res) {
    const { email } = req.body;

    try {
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }]
        });
      }

      const resendEmailNewToken = createJWT(user.email, user._id, 3600);
      user.resendConfirmNewEmailToken = resendEmailNewToken;
      await UserService.updateUser(user);
      sendConfirmToken(
        email,
        user.name,
        resendEmailNewToken,
        emailType.confirmNewEmail
      );

      return res.status(200).json({
        success: true,
        message: 'Sent confirm new email token'
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }

  static async getAccount(req, res) {
    try {
      const user = await UserService.findById(req.currentUser.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      return res.status(200).json({
        success: true,
        user
      });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }
}

module.exports = { AccountController };
