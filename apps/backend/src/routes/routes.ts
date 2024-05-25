import express from "express"
const addUser = require('../controller/addUser')

const route = express.Router()

route.post('/addUser', addUser)

module.exports = route