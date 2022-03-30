const User = require('../models/user');
class UserService {
  static findById(userId) {
    return User.findOne({ _id: userId });
  }

  static findByEmail(userEmail) {
    return User.findOne({ email: userEmail });
  }

  static getUsers() {
    return User.find({});
  }

  static createUser(user) {
    return User.create(user);
  }

  static updateUser(user) {
    console.info(
      'updateUser ---',
      User.findOneAndUpdate({ _id: user._id }, user, {
        new: true
      })
    );

    return User.findOneAndUpdate({ _id: user._id }, user, {
      new: true
    });
  }

  static deleteUser(userId) {
    return User.deleteOne({ _id: userId });
  }
}
module.exports = { UserService };
