// server.js
let express     = require('express')
let app         = express()
let bodyParser  = require('body-parser')
let mysql       = require('mysql')
let dbconfig    = require('./config/database')

// Database

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-control-Allow-headers', 'content-type')
    next()
})

// API
app.use('/api/v1/gamsung', require('./api/gamsung'))

// Server
let port = 3000
app.listen(port, function() {
    console.log('The server is running on port' + port)
})

