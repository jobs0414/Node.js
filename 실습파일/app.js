let express = require('express')
let mysql = require('mysql')
let app = express()
let bodyParser = require('body-parser')
let passport = require('passport')
let localStrategy = require('passport-local').Strategy
let session = require('express-session')
let flash = require('connect-flash')

// mysql DB 연동
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'bbangul',
    password : 'minkyo',
    port : '3306',
    database : 'june02'
})
connection.connect()

// temlate engine 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

// static 파일 사용
app.use(express.static('public'))

// post 요청 데이터 파싱을 위한 설정
app.use(express.json())
app.use(bodyParser.urlencoded())

// 각 경로 처리할 router 불러오기 (.js 생략가능)
let index = require('./router/index')
let main = require('./router/main')
let email = require('./router/email')

// passport 관련 middleware 불러오기
app.use(session({
    secret : 'keyboard secret!',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// router 모듈화
app.use(index)
app.use('/main', main)
app.use('/email', email)

app.listen(3000, function(){
    console.log("the server is running on port 3000!")
})