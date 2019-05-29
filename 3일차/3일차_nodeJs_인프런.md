# nodeJS + Express 설정

## NPM Project 시작하기

1. 노드 패키지 설정

   ```bash
   $ ls
   $ npm init
   ```

   - 필요한 것만 써주고 다 enter로 넘긴다음에 yes!

2. `package.json` 파일 생성 (1번 작업 후 자동으로 생성된다.)

   - `package.json`은 파이썬의 `requirements.txt`와 동일하다고 보면 된다.

   - 노드 기반의 웹서버들은 어떤 것들이 있을까?

     > Express 등 다양한 게 있는데 우리는 역시 Express를 쓴다.

3. Express 설치

   ```bash
   $ npm install express --save
   ```

   - `--save` : 설치와 동시에 package.json에 자동으로 추가해주는 명령어다.

   - 설치 후 node_modeuls`(내가 해당 프로젝트에서 사용하는 프로그램들의 집합)`라는 디렉토리가 생성됨을 볼 수 있는데, 얘는 우리가 건들일은 없다.

     

## Express 기반 웹서버 구동

> Node에서는 세미콜론을 생략해서 사용기도 한다.

1. `app.js`파일 생성

```javascript
let express = require("express")
let app = express()

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})
```

- listen이라는 함수는 서버를 실행시켜주고 어떠한 요청이 올 때 까지 듣고있는다고 생각하면 된다.

- 터미널에서 다음의 명령어로 실행

  ```bash
  $ node app.js
  ```

- localhost == 127.0.0.1

- `(중요)` 노드는 __비동기__로 동작되기 때문에 서버가 동작될때까지 기다리는 것이 아니라, 서버동작 코드 밑에 있는 모든 코드들이 기다리지 않고 실행되게 된다. 다음의 코드로 확인.

  ```javascript
  let express = require("express")
  let app = express()
  
  app.listen(3000, function() {
      console.log("start! express server on port 3000")
  })
  
  console.log("end of server code ...")
  ```

  - 결과값은 "end of server code"가 먼저 뜨게 된다. 그리고나서 listen에서 사용된 콜백함수가 사용되게 된다.



2. `nodemon` 패키지 설치

> 자동으로 파일의 변화를 감지해서 node 서버를 내렸다가 올려주는 프로그램이다!

```bash
$ npm install nodemon --save -g
```

- nodemon은 글로벌로 설치해주는 것이 좋다.

- 맥이나 리눅스의 경우 오류가 나면 권한문제이므로 `sudo`명령어로 깔아주면된다.

이제부터는 node가 아닌 nodemon으로 실행을 하면된다. `js`파일을 수정하고 __저장__하는 즉시 서버를 자동으로 껐다켜준다.

```bash
$ nodemon app.js
```



## URL Routing 처리

node에서 제공되는 get요청 함수 : `get`

역시 비동기로 처리되므로 콜백함수를 넘겨줘서 할 일을 한다.

res.send 함수는 HTML형식으로 줄 수가 있다. 자세한 것은 공식문서 참조 (<https://nodejs.org/en/docs/guides/getting-started-guide/>)



`public` 폴더 설정

HTML 파일들은 public이라는 디렉토리를 생성 후 그곳에 저장해둔다.

public이라는 디렉토리를 만들어서 `index.html`파일을 하나 생성해주자.

app.js에서 이 html파일을 불러들여서 결과값으로 보내주기 위해서는 `sendFile`이라는 메서드를 사용한다.

그런데 본래는 절대경로를 넘겨주어야하는데, 상당히 귀찮은 짓이므로 `__dirname`이란 것을 사용하면 된다.



`get` 요청

```javascript
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/public/index.html")
})
```

- 이 때, 뒤의 경로는 `/`로 시작해야함을 잊지 말자.



## static 디렉토리 설정

node는 따로 설정해주지않으면 static 파일들을 읽어오지 못하므로 다음과 같이 설정해줘야한다.

```javascript
app.use(express.static('public'))
```

- 이는 `public`이라는 디렉토리를 참조해서 static파일들을 가져와달라는 뜻과도 같다.



































