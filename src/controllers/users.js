const { re } = require('prettier');
const User = require('../models/user');
const { UserService } = require('../services/userServices');
const configJson = require('../config/config');
const { config } = require('dotenv');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { verifyJWT } = require('../utils/jwt');

class UsersController {
  static async createUser(req, res) {
    const user = new User(req.body);
    try {
      await UserService.createUser(user);

      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'User created'
      });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }

  static async updateUser(req, res) {
    const body = req.body;

    console.info('id --- ', req.query.id);

    const userId = Number(req.query.id);

    try {
      const user = await UserService.findById(userId);
      console.info('user ---', user);

      if (!user) {
        return res.status(404).json({
          message: 'User not found!'
        });
      }

      user.name = body.name;
      user.lastName = body.lastName;
      user.email = body.email;

      const updateUser = await UserService.updateUser(user);

      const result = {
        success: true,
        user: updateUser,
        message: 'User updated!'
      };

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }

  static async deleteUser(req, res) {
    const userId = Number(req.query.id);

    if (!userId) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    try {
      const user = await UserService.findById(Number(req.query.id));

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found!' });
      }
      await UserService.deleteUser(user._id);

      return res.status(200).json({
        success: true,
        id: user._id,
        message: 'User deleted!'
      });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }

  static async getUserById(req, res) {
    try {
      console.info('req.params ---', res.locals.accessTokenResult);

      const accessTokenData = req.body.accessToken;
      const accessTokenResult = await verifyJWT(accessTokenData);

      if (accessTokenResult === 'jwt expired') {
        // const accessToken = createJWT(user.email, user._id, config.accessTokenExp);
        // req.body.accessToken = accessToken;
        // console.info('middleware');

        return res.status(403).json({
          data: 'data'
        });
      }
      console.info('accessTokenData ---', accessTokenResult, req);

      const paramsWithTokenData = { ...req.params, accessTokenResult };

      res.locals.accessTokenResult = paramsWithTokenData;

      console.info('paramsWithTokenData --', res.locals.accessTokenResult);

      const user = await UserService.findById(
        mongoose.Types.ObjectId(accessTokenResult.accessTokenResult?.userId)
      );

      if (!user._id) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found!' });
      }

      return res
        .status(200)
        .json({ success: true, data: user, date: new Date() });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();

      if (!users.length) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }

      return res.status(200).json({ success: true, data: users });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }
}

module.exports = { UsersController };
