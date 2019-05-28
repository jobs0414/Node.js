const fs = require("fs")

fs.readFile('input.txt', function(err, data) {
    if (err) return console.log("에러입니다.")
    console.log(data.decode('UTF-8').toString()
})

console.log("프로그램이 종료되었습니다.")