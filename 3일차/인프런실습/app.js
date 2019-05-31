var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'bbangul',
    password: 'minkyo',
    database : 'may30'
})

connection.connect()


app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.sendFile( __dirname + "/public/index.html")
})

app.get('/main', function(req, res) {
    res.sendFile( __dirname + "/public/index.html")
})

app.get('/email', function(req, res) {
    res.sendFile( __dirname + "/public/form.html")
})

// POST 요청에 처리 위한 함수
app.post('/email_post', function(req, res) {
    // res.send("post response")
    console.log(req.body)
    res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res){

    let email = req.body.email
    let responseData = {}

    let query = connection.query('SELECT * FROM Persons', function(err, rows){
        if (rows[0]) {
            responseData.result = "ok"
            responseData.NAME = rows[0].NAME
        } else {
            responseData.result = "none"
            responseData.name = ""
        }
        res.json(responseData)
    })
})

console.log("end of server code ...!!!")