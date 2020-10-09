const express = require('express')
require('./models/mongoose')

const app = express()
app.use(express.json())

module.exports = app