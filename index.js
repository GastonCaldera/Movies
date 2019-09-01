'use strict'

const express = require('express')
const app = express()
const moviesApi = require('./routes/movies')

const { config } = require('./config/index')
const { 
    logErrors, 
    wrapErros, 
    errorHandler 
} = require('./utils/middleware/errorHandlers')

const notFoundHanldler = require('./utils/middleware/notFoundHandler')

//body parse
app.use(express.json())

//routes
moviesApi(app);

// Catch 404
app.use(notFoundHanldler)

// Errors middleware
app.use(logErrors)
app.use(wrapErros)
app.use(errorHandler)


app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`)
})
