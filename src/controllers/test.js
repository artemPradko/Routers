const {
  showAllFriends,
  showAllUsersWithTags,
  getOldestMan,
  showBalance,
  findTags,
  calculateAllUserBalance,
  showAllUniqueTags,
  getAllUserDescription,
  showOldCars,
  findParameter,
  findParameterOnManyFiles,
  updateDataKeys,
  test,
  calculateAllMockDataMoney
} = require('../helpers/january-task');
const json = require('../db/january.json');
const mockData = require('../db/mock_data.json');

function helloWorld(req, res) {
  res.send('Hello World');
}

async function allFriends(req, res) {
  console.info('request body---', req, req.body);

  const data = await showAllFriends(json);

  res.send(data);
}

async function showAllUsersWithEtags(req, res) {
  const data = await showAllUsersWithTags(json);

  res.send(data);
}

async function getOldestGirl(req, res) {
  const data = await getOldestMan(json);

  res.send(data);
}

async function showUserBalance(req, res) {
  const data = await showBalance(json);

  res.send(data);
}

async function findUserTags(req, res) {
  const data = await findTags(json);

  res.send(data);
}

async function calculateAllBalance(req, res) {
  const data = await calculateAllUserBalance(json);

  res.send(data);
}

async function showAllUniqueUserTags(req, res) {
  const data = await showAllUniqueTags(json);

  res.send({ data: Array.from(data) });
}

async function getAllDescription(req, res) {
  const data = await getAllUserDescription(json);

  res.send(data);
}

async function showAllOldCars(req, res) {
  const data = await showOldCars(mockData);

  res.send(data);
}

async function findUserParameter(req, res) {
  console.info('request body---', req, req.body);

  const data = await findParameter(json, req.body);

  res.send(data);
}

async function findUserParameterOnManyFiles(req, res) {
  console.info('request body---', req, req.body);

  const data = await findParameterOnManyFiles(json, mockData, req.body);

  res.send(data);
}

async function updateUserDataKeys(req, res) {
  const data = await updateDataKeys(mockData);

  res.send(data);
}

async function cardJcb(req, res) {
  const data = await test(mockData);

  res.send(data);
}

async function calculateMockDataMoney(req, res) {
  const data = await calculateAllMockDataMoney(mockData);

  // console.info('data --', data);

  res.json(data);
}

module.exports = {
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
};
