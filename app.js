const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())


const dishRouter = require('./routes/dishRouter')

app.use('/dishes', dishRouter)


mongoose.connect('mongodb://localhost:27017/me', () => {
    console.log('Connected to mongodb server')
})

app.listen(3000, (req, res) => {
    console.log("Server started")
})