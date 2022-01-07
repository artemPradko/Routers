const express = require('express')

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
} = require('./helpers/january-task')

const app = express()

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/showAllFriends', async function (req, res) {

    console.info('request body---', req, req.body)

    const json = require("./db/january.json")

    const data = await showAllFriends(json)

    res.send(data)
})

app.post('/showAllUsersWithTags', async function (req, res) {

    const json = require("./db/january.json")

    const data = await showAllUsersWithTags(json)

    res.send(data)
})

app.post('/getOldestMan', async function (req, res) {

    const json = require("./db/january.json")

    const data = await getOldestMan(json)

    res.send(data)
})

app.post('/showBalance', async function (req, res) {

    const json = require("./db/january.json")

    const data = await showBalance(json)

    res.send(data)
})

app.post('/findTags', async function (req, res) {

    const json = require("./db/january.json")

    const data = await findTags(json)

    res.send(data)
})

app.post('/calculateAllUserBalance', async function (req, res) {

    const json = require("./db/january.json")

    const data = await calculateAllUserBalance(json)

    res.send(data)
})

app.post('/showAllUniqueTags', async function (req, res) {

    const json = require("./db/january.json")

    const data = await showAllUniqueTags(json)

    console.info('data ---', Array.from(data))

    res.send({ data: Array.from(data) })
})

app.post('/getAllUserDescription', async function (req, res) {

    const json = require("./db/january.json")

    const data = await getAllUserDescription(json)

    res.send(data)
})

app.post('/showOldCars', async function (req, res) {

    const mockData = require("./db/mock_data.json")

    const data = await showOldCars(mockData)

    res.send(data)
})

app.post('/findParameter', async function (req, res) {

    console.info('request body---', req, req.body)

    const json = require("./db/january.json")

    const data = await findParameter(json, req.body)

    // console.info('data ---', data)

    res.send(data)
})

app.post('/findParameterOnManyFiles', async function (req, res) {

    console.info('request body---', req, req.body)

    const json = require("./db/january.json")
    const mockData = require("./db/mock_data.json")

    const data = await findParameterOnManyFiles(json, mockData, req.body)

    res.send(data)
})

app.post('/withUpdatedKeys', async function (req, res) {

    const mockData = require("./db/mock_data.json")

    const data = await updateDataKeys(mockData)

    res.send(data)
})

app.post('/cardJcb', async function (req, res) {

    const mockData = require("./db/mock_data.json")

    const data = await test(mockData)

    res.send(data)
})

app.post('/mockDataMoney', async function (req, res) {

    const mockData = require("./db/mock_data.json")

    const data = await calculateAllMockDataMoney(mockData)

    // res.sendStatus(200).send(data)
    console.info('data --', data)
    res.json(data)
    // res.send(data)
})

app.listen(3000, () => {
    console.info('server listen on port 3000')
})