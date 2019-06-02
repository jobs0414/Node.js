# June 02

## Troubleshooting related to MySQL

1. git pull해서 로컬에서 작업할 때 mysql 에러가 뜨면 유저 권한에 대해 의심해봐야합니다. 우선 다음의 사항들을 확인해보면서 오류를 해결해나가면 될 겁니다.

   - 데이터베이스가 로컬에 존재하는지 확인

   - 루트 계정 외 코드에서 사용된 다른 계정들이 존재하는지 확인

   - 위의 두 개가 있음에도 안되면 다음의 명령어 실행

     ```mysql
     ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
     ```

     - mysql_native_password는 그대로 치고
     - 'password' 부분에는 실제 패스워드를 써주면 됩니다.



## Router Refactoring

App.js 라는 서버를 실행시키는 파일 아래에 `index.js`라는 라우터를 하나 두고,

이 `index.js`를 라우팅만 해주는 녀석으로 사용할 수 있어요. 

다시 말해, `index.js`를 Django의 `urls.py`처럼 사용하면서 클라이언트로부터 받는 요청에 대해 처리해줄 경로를 지정해놓는거죠.

이 때 절대 까먹지 말아야하는 점은 각각의 경로에 대해 새로운 파일을 만들어주고 이것들을 `require`로 불러와야 한다는 것입니다.

따라서 다음의 두 줄은 필수적으로 써줘야합니다.

```javascript
// router/index.js
let join = require('join')

router.use('/join', join)
```

- join이라는 파일을 가져올게!
- 만약 사용자가 "/join"이라는 경로로 들어오면 join이라는 파일에 정의해놓은 코드로 처리할게!



아직 join이라는 애가 없으니까 join을 만들어줍시다.

router 디렉토리 내에 join이라는 폴더를 만들고 그 안에 `index.js` 파일을 만들어줍시다!

index.js에는 필요한 내용들을 넣어줍시다.



## sendFile vs. render

요청에 대한 응답으로 사용자에게 `HTML` 파일을 보여줄 때 두 가지 방법이 있습니다.

하나는 `public` 폴더에 HTML파일을 두고 `sendFile` 메서드를 사용하는 것과

다른 하나는 `views`폴더에 HTML파일을 두고 `render` 메서드를 사용하는 것입니다.

둘의 가장 큰 차이는 후자는 ejs와 같은 template engine을 사용할 수 있다는 것입니다. 후자를 사용합시다. 

(중요) ejs를 사용할려면 `.ejs`파일을 views 폴더에 넣어줘야해요. html 형식이 아니구요.



## CRUD Operations

## INSERT

express에서 mysql의 쿼리문을 사용하여 DB에 insert시킬려면 다음과 같이 해주면 돼요.

예를 들어 POST방식으로 어떠한 데이터를 넘겨받는 상황에서 그 데이터를 DB의 한 테이블에 넣는다고 가정해볼게요.

```javascript
// router/join/index.js

router.post('/', function(req, res) {
    let body = req.body
    let name = body.name
    let age = body.age
    
    let myQuery = `INSERT INTO persons (name, age) VALUES (?, ?)`
    
    let query = connection.query(myQuery, [name, age], function(err, rows){
        if (err) { throw err }
        // res.할일해주기
    })
})
```

- express에서 post로 오는 요청에 댛나 데이터는 `.body`와 같은 방식으로 가져오죠. 이러한 행위는 `body-parser`라는 패키지가 있어서 가능한것이구요.
- query문을 따로 작성해주는 것이 편한데, 그 이유는 위처럼 쿼리문에 넘겨줄 변수를 템플릿 리터럴( `template literals`)로 표현 가능하기 때문이에요.  따라서, 전체 쿼리문을 먼저 작성하고 그 안에 넘겨줄 변수들을 `.query` 메서드 안에서 배열로 넘겨주면 간단히 처리할 수 있게돼요.



# Session

로그인 정보를 서버에서 유저의 상태값을 계속 유지함으로써, 서버가 사용자의 status를 계속 확인 가능.

최근에는 token 방식의 인증 방식도 있다!

여태까지는 전통적으로 post방식으로 사용자로부터 정보를 입력받아 처리했는데, 이제는 `passport`라는 것을 이용한다. 

설치 목록



# .gitignore

github에 올릴 때 추가해줍시다.





