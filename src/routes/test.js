const { Router } = require('express');

const {
  helloWorld,
  allFriends,
  showAllUsersWithEtags,
  getOldestGirl,
  showUserBalance,
  findUserTags,
  calculateAllBalance,
  showAllUniqueUserTags,
  getAllDescription,
  showAllOldCars,
  findUserParameter,
  findUserParameterOnManyFiles,
  updateUserDataKeys,
  cardJcb,
  calculateMockDataMoney
} = require('../controllers/test');

const testRouter = new Router();

testRouter.get('/', helloWorld);
testRouter.post('/showFriends', allFriends);
testRouter.post('/showAllUsersWithETags', showAllUsersWithEtags);
testRouter.post('/getOldestGirl', getOldestGirl);
testRouter.post('/showUserBalance', showUserBalance);
testRouter.post('/findUserTags', findUserTags);
testRouter.post('/calculateAllUserBalance', calculateAllBalance);
testRouter.post('/showAllUniqueTags', showAllUniqueUserTags);
testRouter.post('/getAllUserDescription', getAllDescription);
testRouter.post('/showOldCars', showAllOldCars);
testRouter.post('/findParameter', findUserParameter);
testRouter.post('/findParameterOnManyFiles', findUserParameterOnManyFiles);
testRouter.post('/updateDataKeys', updateUserDataKeys);
testRouter.post('/usersWithCardJcb', cardJcb);
testRouter.post('/calculateAllMockDataMoney', calculateMockDataMoney);

module.exports = testRouter;
