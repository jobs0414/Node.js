const http = require("http")
const fs = require("fs")
const url = require("url")

// 서버 생성하기
http.createServer( function(request, response) {
    // URL 뒤에 있는 디렉토리 및 파일이름 파싱
    let pathname = url.parse(request.url).pathname

    console.log("Request for" + pathname + " received.")

    // 파일 이름이 비어있다면 index.html로 설정
    if (pathname === ""){
        pathname = "/index.html"
    }

    // 파일 읽기
    fs.readFile(pathname.substr(1), function(err, data){
        if (err) {
            console.log(err)
            // 페이지를 찾을 수 없을 때 발생할 에러
            // HTTP Status : 404 NOT FOUND...
        } else {
            // 페이지가 존재할 때
            // HTTP Status : 200 OK
            response.writeHead(200, {'content-type' : 'text/html; charset=utf-8'})

            // 파일을 읽어와서 responseBody에 작성
            response.write(data.toString())
        }

        // responseBody 전송
        response.end()

    })

}).listen(8081)

// 서버 실행중이라는 표시
console.log('Server running at http://127.0.0.1:8081/')