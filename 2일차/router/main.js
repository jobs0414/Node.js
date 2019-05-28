module.exports = function (app, fs) {

    app.get('/', function (req, res) {
        res.render('index', {
            title: "what is this?",
            length: 5
        })
    })
    
    // API 코드
    app.get('/list', function (req, res) {
        fs.readFile(__dirname + "/../data/" + "user.json",
            'utf8', function (err, data) {
                console.log("--------req---------")
                console.log(req)
                console.log("--------req---------")

                console.log("--------res---------")
                console.log(res)
                console.log("--------res---------")

                console.log("--------data---------")
                console.log(data)
                console.log("--------data---------")

                res.end(data)
            })
    })

    app.get('/getUser/:username', function (req, res) {
        fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
            let users = JSON.parse(data)
            res.json(users[req.params.username])
        })
    })

    // API POST 방식
    app.post('/addUser/:username', function (req, res) {
        let result = {}
        let username = req.params.username
        // 요청 유효성 검증
        if (!req.body["password"] || !req.body["name"]) {
            result["success"] = 0
            result["error"] = "invalid request!!!"
            res.json(result)
            return
        }

        // 데이터 불러오기 + 복사 체크
        fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
            let users = JSON.parse(data)
            if (users[username]) {
                // 복제가 발견되면
                result["success"] = 0
                result["error"] = "duplicated man..."
                res.json(result)
                return
            }

            // 데이터에 추가하기
            users[username] = req.body

            // 데이터 저장하기
            fs.writeFile(__dirname + "/../data/user.json",
                JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
                    result = { "success": 1 }
                    res.json(result)
                })
        })
    })
}

