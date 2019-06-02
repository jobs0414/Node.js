// router/join/index

let express = require('express')
let app = express()
let mysql = require('mysql')
let router = express.Router()

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'bbangul',
    password: 'minkyo',
    port: '3306',
    database: 'june02'
})
connection.connect()

router.get('/', function(req, res){
    let context = {title : 'join 페이지입니다!'}
    res.render('join.html', context)
})

router.post('/', function(req, res){
    let body = req.body
    let name = body.name
    let age = body.age
    console.log(name, age)

    let myQuery = `INSERT INTO persons (name, age) VALUES (?, ?)`

    let query = connection.query(myQuery, [name, age] ,function(err, rows){
        if (err) { throw err }
        console.log("ok db insert")
        res.render('join.ejs', {name : name, age: age})
    })

})

module.exports = router;