const http = require("http")

// HTTPrequest의 옵션 설정
let options = {
    host: 'localhost',
    port: '8081',
    path: '/index.html'
}

// 콜백 함수로 Response를 받아온다.
let callback = function(response) {
    let body = ''
    response.on('data', function(data) {
        body += data
    })

    // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다.
    response.on('end', function() {
        console.log(body)
    })
}

// 서버에 HTTP Request를 날린다!
const req = http.request(options, callback)
req.end()