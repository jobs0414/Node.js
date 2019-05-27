let events = require("events")

// eventEmitter 객체 생성
const eventEmitter = new events.EventEmitter()

// eventHandler 함수 생성
let connectHandler = function connected() {
    console.log("Connection Succesfull")

    // data_received 이벤트 발생시키기
    eventEmitter.emit("data_received")
}

// data_received 이벤트와 익명 함수와 연동
eventEmitter.on('connection', connectHandler)

eventEmitter.on('data_received', function(){
    console.log("Data Received")
})

// connection 이벤트 발생시키기
eventEmitter.emit("connection")
console.log("Program has ended")