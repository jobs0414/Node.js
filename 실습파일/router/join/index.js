// router/join/index
let express = require('express')
let app = express()
let mysql = require('mysql')
let passport = require('passport')
let localStrategy = require('passport-local').Strategy
let router = express.Router()

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'bbangul',
    password: 'minkyo',
    port: '3306',
    database: 'users'
})
connection.connect()

// 회원가입 GET 요청
router.get('/', function(req, res){
    let msg = ''
    let errMsg = req.flash('error')
    if(errMsg) msg = errMsg

    res.render('join', {'message' : msg})
})

passport.serializeUser(function(user, done) {
    console.log('passport session save:', user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    // 
    done(null, id);
})

passport.use('local-join', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    }, function(req, email, password, done) {
        // 실제로는 이 콜백함수에서 많은 처리들을 하게 됩니다!
        console.log('local-join callback called!')
        let query = connection.query('SELECT * FROM users where userid=?', [email], function(err, rows){
            if (err) return done(err)
            if (rows.length) { // 결과값이 있다면
                console.log('existing user')
                return done(null, false, {message : 'your email is already used'})
            } else {
                let sql = {userid: email, passwrd: password}
                console.log(sql)
                let query = connection.query('insert into users set ?', sql, function(err, rows) {
                    if (err) throw err
                    console.log(rows)
                    return done(null, {'email' : email, 'id' : rows.insertId})
                })
            }
        })
    }
))

// 회원가입 POST 요청
router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true }), function(res, req) {
        console.log("segs")
    }
)

// router.post('/', function(req, res){
//     let body = req.body
//     let name = body.name
//     let age = body.age
//     console.log(name, age)

//     let myQuery = `INSERT INTO persons (name, age) VALUES (?, ?)`

//     let query = connection.query(myQuery, [name, age] ,function(err, rows){
//         if (err) { throw err }
//         console.log("ok db insert")
//         res.render('join.ejs', {name : name, age: age})
//     })

// })

module.exports = router;