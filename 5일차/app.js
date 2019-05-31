var express = require('express')
var app = express()
var main = require('./router/main')
var email = require('./router/email')

app.use(express.static('public'))
app.use('/main', main)
app.use('/email', email)
app.use('view engine', 'ejs')

app.get('/', function(req, res){
    res.send("hello world!")
})

app.get('/email', function(req, res) {
    res.sendFile( __dirname + "/public/form.html")
})

app.listen(3000, function(){
    console.log("The server is running on port 3000")
})