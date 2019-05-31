let express = require('express')
let app = express()
let mysql = require('mysql')
let router = express.Router()

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'bbangul',
    password : 'minkyo',
    port : '3306',
    database : 'may30'
})
connection.connect()

router.get("/", function(req, res){

    console.log("Welcome to router / index.js")
    let context = {
        title : '안녕하세요, 인덱스 페이지입니당.',
        content : '하늘도 예쁘고 달도 예쁜데 너는 오죽할까',
        persons : [],
    } 

    // issue: 비동기이므로 render가 query문이 올 때 까지 기다리지 않는다.
    // 따라서 context가 비어있는 상태로 날아가게 된다.
    connection.query('SELECT * FROM Persons', function(err, rows, fields) {
        if (!err) {
            rows.forEach(person => {
                // console.log(person)
                personInfo = {
                    name : person.NAME,
                    age: person.AGE
                }
                context.persons.push(personInfo) 
                console.log("waittttttttttttttttttttttttt") 
                res.render('indexTemplate.html', context)
            })
        } else {
            console.log('Sorry, something went wrong!')
        }
    })

    console.log(context)
})

module.exports = router

