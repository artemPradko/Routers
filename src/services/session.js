const Session = require('../models/session');
const { config } = require('../config/index');
const user = require('../models/user');
const session = require('../models/session');

class SessionService {
  static async addRefreshSession(refreshSession) {
    const userId = refreshSession.userId;

    const sessions = await Session.find({ userId: userId });

    if (session.length >= config.refreshTokenCount) {
      await Session.deleteMany({ userId: userId });
    }

    await refreshSession.save();
  }

  static async removeAllSessionByUser(userId) {
    await Session.deleteMany({ userId: userId });
  }

  static async removeRefreshSession(refreshToken) {
    await Session.deleteOne({ refreshToken: refreshToken });
  }

  static getRefreshSession(refreshToken) {
    return Session.findOne({ refreshToken: refreshToken });
  }
}

module.exports = { SessionService };
