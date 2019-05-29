let express = require("express")
let app = express()
let bodyParser = require("body-parser")


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
    console.log(req.body.email)
    // check validation about input value => select DB (DB조회해서 유효성 검사)
    let responseData = {'result' : 'ok', 'email' : req.body.email}
    res.json(responseData)
    // let email = req.body.email
})

console.log("end of server code ...!!!")

