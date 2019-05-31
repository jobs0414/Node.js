# 5일차 Router 개선

# 모듈화 (1)

Express에서는 클라이언트가 날린 요청을 처리할 URL들을 세분화할 수 있다.

Django의 include와 같은 기능이라고 보면 된다.



일반적으로 nodejs의 Express에서 어떠한 get 요청에 대한 처리는 다음과 같이 한다.

```javascript
app.get('/', function(req, res){
    res.sned("hello world!")
})
```

이 때 Express의 `router`를 이용하면 Django에서의 include처럼 어떠한 경로로 들어왔을 때 __그 경로의 세부 경로들__을 따로 관리할 수 있게 된다.

```javascript
// router/main.js
var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/main.html'))
})

module.exports = router
```

위의 모듈화된 라우터는 `main`이라는 주소로 들어오는 모든 요청을 처리하게 될 파일이라고 보면된다.

그리고 이 파일을 사용하기 위해서는 서버를 켜는 메인 파일에서 이 파일을 불러와서 사용해주기만 하면 된다.

```javascript
// app.js
var express = require('express')
var app = express()
var main = require('./router/main')

app.use('/main', main)

app.listen(3000, function(){
    console.log("The server is running on port 3000")
})
```

- require로 `router` 디렉토리 내의 `main.js` 파일을 불러오고 (.js 생략 가능)나서 사용자가 `/main`이라는 경로로 접근했을 시 `main.js`에 존재하는 함수를 쓰겠다고 선언해주면 된다.

  ```javascript
  app.use(/main, main)
  ```



# 모듈화 (2)

이러한 모듈화를 하는 것은 메인파일이라고 할 수 있는 `app.js`를 가볍게 하기 위해서다.

Router 폴더 안에 새로운 파일을 생성해보자.



# Routing 리팩토링

router 디렉토리 내의 파일들을 다음과 같이 조금 더 명시적으로 구성할 수 있다.

```
Router
	- email
		- email.js
	- main
		- main.js
```

- 모듈화와 프로젝트 관리를 이런식으로 해놓으면, MVC 패턴에서 컨트롤러에 해당하는 친구들을 좀 더 효율적으로 관리할 수 있게 된다.









































