const fs = require('fs');
const { promisify } = require('util');

// const mockData = require("../db/mock_data.json")
// const json = require("../db/january.json")
const { all } = require('express/lib/application');

const fsReadFile = promisify(fs.readFile);

function showAllFriends(entries) {
  const friendsArrayObgect = [];

  entries.forEach((el) => {
    friendsArrayObgect.push(el.friends);
  });

  const friendsArray = [];

  friendsArrayObgect.forEach((el) => {
    el.forEach((el1) => {
      friendsArray.push(el1.name);
    });
  });

  console.info('friendsArray ---', friendsArray);

  return friendsArray;
}

function showAllUsersWithTags(entries) {
  const newArray = entries.map((el) => {
    const newElement = {
      userName: el.name,
      userTags: el.tags
    };

    return newElement;
  });

  console.info('newArray ---', newArray);

  return newArray;
}

function getOldestMan(entries) {
  let oldestAge = 0;

  let oldestUser = null;

  entries.forEach((el) => {
    if (el.gender === 'female' && el.age > oldestAge) {
      oldestAge = el.age;

      oldestUser = el;
    }
  });

  console.info('oldestAge ---', oldestAge);
  console.info('oldestUser ---', oldestUser);

  return oldestUser;
}

function showBalance(entries) {
  let balances = [];

  entries.forEach((el) => {
    console.info('el.balance ---', el.balance, typeof el.balance);

    const balanceString = el.balance.replace(/\D+/g, '');

    console.info('balanceString --', balanceString);

    if (Number(balanceString) > 300000) {
      balances.push({
        money: 'more 3000',
        userName: el.name,
        userBalance: el.balance
      });
    } else {
      balances.push({
        money: 'not more 3000',
        userName: el.name,
        userBalance: el.balance
      });
    }
  });

  console.info('balance ---', balances);

  return balances;
}

function findTags(entries) {
  let tagsWithE = [];

  entries.forEach((el) => {
    el.tags.forEach((el1) => {
      if (el1[0] === 'e') {
        tagsWithE.push({
          userName: el.name,
          userTags: el.tags
        });
      }
    });
  });

  console.info('tagsWithE --', tagsWithE);

  return tagsWithE;
}

function calculateAllUserBalance(entries) {
  let allNumbers = [];

  entries.forEach((el) => {
    allNumbers.push({
      userBalance: el.balance
    });
  });

  let allBalance = 0;

  allNumbers.forEach((el1) => {
    // const numb = el1.userBalance.replace(/\D+/g, '')

    const numb = el1.userBalance.match(/[+-]?\d+(\.\d+)?/g).join('');

    console.info('numb ---', numb, typeof numb);

    allBalance += parseFloat(numb);
  });

  const allBalanceFixed = '$' + allBalance.toFixed(2);

  return allBalanceFixed;
}

function showAllUniqueTags(entries) {
  let uniqueTags = new Set([]);

  entries.forEach((el) => {
    el.tags.forEach((el1) => {
      uniqueTags.add(el1);
    });
  });

  console.info('uniqueTags ---', uniqueTags);

  return uniqueTags;
}

function getAllUserDescription(entries) {
  let userDescriptions = [];

  entries.forEach((el) => {
    userDescriptions.push({
      userName: el.name,
      userId: el.id,
      userGuid: el.guid,
      userDescription: ` Is ${el.name}, Email: ${el.email}, Age: ${el.age}, Working in ${el.company} company, Address ${el.address}, Gender: ${el.gender}, Eye color beautiful ${el.eyeColor}`
    });
  });

  console.info('userDescriptions ---', userDescriptions);

  return userDescriptions;
}

function showOldCars(entries) {
  let res = [];

  entries.forEach((el) => {
    const moneys = el.money.replace(/\D+/g, '');

    console.info('money ---', moneys);

    if (Number(el.car_model_year) < 2000 && Number(moneys) > 1500000) {
      res.push({
        money: 'more 15000',
        userName: el.first_name + ' ' + el.last_name,
        userMoney: el.money,
        carModelYear: el.car_model_year
      });
    }
  });

  console.info('res ---', res);

  return res;
}

async function readCsvData(path) {
  try {
    const csv = await fsReadFile(path);

    const csvString = csv.toString();

    const csvStringArray = csvString.split('\n');

    let result = [];

    const headers = csvStringArray[0].split(',');

    for (let i = 1; i < csvStringArray.length; i++) {
      let obj = {};
      let currentline = csvStringArray[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return console.info('fullJson ---', JSON.stringify(result));
  } catch (error) {
    console.error('csvError --', error);
  }
}

// TODO: for example, remove it
// readCsvData(`${process.cwd()}/src/db/mock_data.csv`)

function populateCondition(item, keys, values) {
  console.info('populateCondition0 ---', item, keys, values);

  const conditions = [];

  keys.forEach((el) => {
    console.info('ccc ---', item[el], values[el]);

    const c = item[el] === values[el];

    conditions.push(c);
  });

  console.info('populateCondition1 ---', conditions);

  return conditions;
}

function findParameter(entries, body) {
  console.info('body --', body, typeof body);

  const searchingKey = Object.keys(body);

  console.info('key ---', searchingKey, typeof searchingKey);

  const searchingValue = Object.values(body);

  console.info('values ---', searchingValue, typeof searchingValue);

  let foundValues = [];

  // const condition = []

  // searchingKey.forEach(el => {
  //     let c =
  // })

  // entries.forEach(el => {

  //     let elArray = Array(el)

  //     elArray.forEach(el1 => {
  //         console.info('el1 ---', el1.name === body.name, el1.name == body.name)
  //         if (el1.name === body.name) {
  //             foundValue = `I'm find ${body}`
  //         }
  //     })
  // })

  console.info('Entries ---', searchingKey, searchingValue);

  entries.forEach((el) => {
    const res = populateCondition(el, searchingKey, body);

    console.info('condition map ---', res);

    // if (el[searchingKey] === searchingValue) {
    //     foundValues?.push(el)
    // }
    if (!res.includes(false)) {
      foundValues?.push(el);
    }
  });

  console.info('foundValues ---', foundValues);

  return foundValues.length > 0 ? foundValues : 'Not found';
}

function findParameterOnManyFiles(fileFirst, fileSecond, body) {
  console.info('body --', body, typeof body);

  const searchingKey = Object.keys(body);

  console.info('key ---', searchingKey, typeof searchingKey);

  const searchingValue = Object.values(body);

  console.info('values ---', searchingValue, typeof searchingValue);

  let foundValues = [];

  // const condition = []

  console.info('Entries ---', searchingKey, searchingValue);

  const twoArrays = fileFirst.concat(fileSecond);

  twoArrays.forEach((el) => {
    const res = populateCondition(el, searchingKey, body);

    console.info('condition map ---', res);

    // if (el[searchingKey] === searchingValue) {
    //     foundValues?.push(el)
    // }
    if (!res.includes(false)) {
      foundValues?.push(el);
    }
  });

  console.info('foundValues ---', foundValues);

  return foundValues.length > 0 ? foundValues : 'Not found';
}

function objectPropsToCamelCase(obj) {
  const objectToEntries = Object.entries(obj);

  // let replaceResult = []

  // objectToEntries.forEach(el => {
  //     return replaceResult.push(el[0].split('_'))
  // })

  const resArray = objectToEntries.map((item) => {
    console.info('item --', item);

    const keyArray = item[0].split('_');

    const newItemRoot = [...item];

    if (keyArray.length > 1) {
      const newKeyItem = keyArray.map((i, index) => {
        if (index !== 0) {
          const res = i.charAt(0).toUpperCase() + i.slice(1);

          console.info('res ---', res);

          return res;
        }

        // newItemRoot[0] = item

        return i;
      });

      const newItem = newKeyItem.join('');

      newItemRoot[0] = newItem;

      return newItemRoot;
    }

    return newItemRoot;
  });

  // console.info('objectEntries ---', objectToEntries)
  console.info('replace ---', resArray);

  // TODO: convert resArray to object
  const convertedRes = Object.fromEntries(resArray);

  console.info('convertedRes --- ', convertedRes);

  return convertedRes;
}

function updateDataKeys(entries) {
  const result = entries.map((el) => {
    return objectPropsToCamelCase(el);
  });

  //TODO: return all converted data
  return result;
}

function test(entries) {
  let filteredArray = entries.filter((el) => el.credit_card_type === 'jcb');

  console.info('jcb --', filteredArray);

  const filterWithCardType = filteredArray.map((item) => {
    // console.info('item ---', item, typeof item)

    const itemWithNewValue = {
      ...item,
      credit_card_number: Math.random() * 1000000000
    };

    return itemWithNewValue;
  });

  filterWithCardType.forEach((el) => {
    console.info(
      `This user ${el.first_name} ${el.last_name} have card ${el.credit_card_type}, number of card ${el.credit_card_number}`
    );
  });

  return filteredArray;
}

function calculateAllMockDataMoney(entries) {
  let allMoney = 0;

  entries.reduce((money, el) => {
    // console.info('el, money --', allMoney, el, money, typeof el)

    allMoney += parseFloat(Number(el.money.replace(/\D+/g, '')));
  }, 0);

  const allMoneyFixed =
    '$' + String(allMoney).slice(0, 6) + '.' + String(allMoney).slice(6, 8);

  // console.info('moneyOnNumbers ---', moneyOnNumbers)
  console.info('money ---', allMoneyFixed);

  return allMoneyFixed;
}

module.exports = {
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
};
