const http = require("http")
const express = require("express")
// const urlencode = require('urlencode');

http.createServer(function(request, response) {
    response.writeHead(200, {'content-type' : 'text/plain; charset=utf-8'})
    response.end("성공인가요?")
}).listen(8081)

console.log("Server running at http://127.0.0.1:8081");
