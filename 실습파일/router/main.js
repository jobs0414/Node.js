let express = require('express')
let app = express()
let router = express.Router()

router.get("/", function(req, res){
    console.log("Welcome to router / main.js")
    res.send("Welcome to router / main.js")
})

module.exports = router

