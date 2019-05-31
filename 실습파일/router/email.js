let express = require('express')
let app = express()
let mysql = require('mysql')
let router = express.Router()

router.get("/", function(req, res){
    console.log("Welcome to router / email.js")
    // res.send("Welcome to router / email.js")
    res.render('mail.html')
})

router.post('/', function(req, res){
    
    let email = req.body.email
    res.send("yay!!! 제출 성공!  " + email)
})

router.post('/ajax', function(req, res) {
    let email = req.body.email
    let result = {
        email : req.body.email
    }
    res.json(result)
})

module.exports = router

