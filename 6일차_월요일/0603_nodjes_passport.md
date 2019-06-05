# June 03

## Passport 기반 router/ session/ login logic

> 요청이 들어온 사용자 정보에 대해 해당 정보가 DB에 있을 시 로그인 세션을 만들어주는 기능을 구현해보자.



아래의 방식은 __Username과 Password만을 이용하여 authenticate하는 local strategy방법입니다.

1. `localStrategy` 생성자를 사용하여 configure (기본 설정)을 해줍니다.

   ```javascript
   // router/index.js
   passport.use('local-join', new localStrategy({
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback : true
       }, function(req, email, password, done) {
           // 실제로는 이 콜백함수에서 많은 처리들을 하게 됩니다!
           console.log('local-join callback called!')
       }
   ))
   ```

   - `local-join`은 내가 후에 `authenticate` 메서드에서 사용하게 될 이름이므로 필요한 형태로 지어주면 된다.
   - `passReqtoCallback`: 해당 유저의 아이디와 패스워드를 입력받고 콜백함수로 넘겨주겠음을 나타내는 옵션입니다. `true`라고 설정하면 뒤에 콜백함수를 작성해주는데, 이 때 이 콜백함수에서 하고자 하는 일들으 해주면 됩니다.
   - `usernameField`, `passwordField` : 이 두 가지 필드에 정하는 이름들은 `form` 태그 내의 `input` 태그들의 name들과 __똑같아야__합니다. 

2. `post`요청으로 회원가입 처리하기

   ```javascript
   // router/index.js
   router.post('/', passport.authenticate('local-join', {
       successRedirect: '/main',
       failureRedirect: '/join',
       failureFlash: true }), function(res, req) {
           console.log("okayyyyy")
       }
   )
   ```

   - `authenticate()`와 `local-join` 메서드를 사용하여 회원가입 (실제로는 login request)을 처리해주면 됩니다. 
   - `successRedirect`: 성공시 보낼 주소
   - `failtureRedirect` : 실패시 보낼 주소
   - `failureFlash` : 유저가 잘못된 정보를 입력했을 시 에러메시지가 뜨는데, 이 때 이 옵션을 true로 설정하면 해당 에러메시지를 자동으로 지워줍니다. 

3. `callback` 함수로 query문 날리기

   1. 먼저 이미 가입이 되어있는 유저에 대한 처리

   ```javascript
   // router/index.js
   passport.use('local-join', new localStrategy({
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback : true
       }, function(req, email, password, done) {
           let query = connection.query('SELECT * FROM users where userid=?', [email], function(err, rows){
               if (err) return done(err)
               if (rows.length) { // 결과값이 있다면
                   console.log('existing user')
                   return done(null, false, {message : 'your email is already used'})
               } else {
                   ... 중략
                   })
               }
           })
       }
   ))
   ```

   - 항상 에러처리를 해주는 것이 바람직합니다.
   - passport의 `done` 메서드는 authenticate 과정을 마치고나서 어떠한 정보를 넘겨줄 것인지를 결정하는 메서드입니다. 이 때, 메세지를 포함하여 여러가지 추가 정보를 같이 넘겨줄 수가 있습니다!

   2. 정상적으로 회원가입(로그인) 이 되었을 때

      ```javascript
      // router/index.js
      passport.use('local-join', new localStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback : true
          }, function(req, email, password, done) {
              // 실제로는 이 콜백함수에서 많은 처리들을 하게 됩니다!
              console.log('local-join callback called!')
              let query = connection.query('SELECT * FROM users where userid=?', [email], function(err, rows){
                  ... 중략
                  } else {
                      let sql = {email: email, pw: password}
                      let query = connection.query('insert into user set ?', sql, function(req, res) {
                          if (err) throw err
                          return done(null, {'email' : email, 'id' : rows.insertId})
                      })
                  }
              })
          }
      ))
      ```

      - 에러 처리 해주고,
      - `done` 메서드에 유저 정보를 넘겨줍니다. __위에서 유저 정보가 valid하지 않을 경우에는 done 메서드에 반드시 false를 넘겨줘야합니다.__

   3. `done` 메서드를 통해 같이 넘긴 정보를 어떻게 받아올까요?

      - 우선 failtureRedirect로 가는 경우를 보면, 위의 코드에서 실패시 `your email is already used`라는 메시지를 같이 넘겨주게 됩니다. 그리고 이 메세지는 아래에 `Redirect`시 설정된 주소로 가게 될 때 같이 넘어가게 됩니다. 

      ```javascript
      // router/index.js
      router.post('/', passport.authenticate('local-join', {
          successRedirect: '/main',
          failureRedirect: '/join',
          failureFlash: true }), function(res, req) {
              console.log("segs")
          }
      )
      ```

      - 여기서 중요한 것은 `flash`라는 모듈을 사용해서 메세지를 띄워주게 되는데, `/join`이라는 경로로 인증이 실패됐을 때 요청이 들어오게 된다면 다음의 방식으로 넘어온 메시지를 띄워줄 수 있습니다.

        ```javascript
        // router/index.js
        router.get('/', function(req, res){
            let msg = ''
            let errMsg = req.flash('error')
            if(errMsg) msg = errMsg
        
            res.render('join', {'message' : msg})
        })
        ```

        - `req.flash()`: 타입과 메세지라는 두 가지 인자를 매개변수로 갖습니다. `error` , 'success' 또는 `info` 와 같은 타입이 존재합니다. 

      - 그 다음으로 `successRedirect`로 가는 경우를 봅시다. 이 때 위의 코드 그대로 실행하게되면 `serialize`관련 에러가 발생하게 됩니다. 다음과 같이 passport의 `serializer` 메서드를 사용해서 세션을 생성하여 해결해주면 됩니다.

        ```javascript
        // router/index.js
        passport.serializeUser(function(user, done) {
            console.log('passport session save:', user.id)
            done(null, user.id)
        })
        
        passport.deserializeUser(function(id, done) {
            done(null, id)
        })
        ```

        > 위의 두 메서드를 사용해주면 세션이 생성됩니다!
        >
        > 만약 이 부분에서 오류가 발생한다면 우선 오타를 확인하고 그래도 멀쩡하다면 query문을 확인해주세요. 

      

4. 로그인 성공 시 `main.js`에서 유저 정보 가져오기

   앞서 로그인이 성공했을 때 우리는 유저를 `main.js`으로 보내버리도록 설정했습니다. 이 때, `main.js`에서는 로그인된 유저정보를 다음과 같이 가져올 수 있습니다. 정확히말하면 `deserialzeUser` 메서드에서 넘겨진 정보를 받는 것입니다. 

   ```javascript
   // router/main.js
   let express = require('express')
   let app = express()
   let router = express.Router()
   
   router.get("/", function(req, res){
       let id = req.user
       res.render('main.ejs', {'id' : id})
   })
   
   module.exports = router
   ```

   ```html
   <!-- views/main.ejs -->
   
   <h1>main page!</h1>
   <h3>welcome, <%= id %>!!</h3>
   ```

   - 이런식으로 id값을 넘겨받아서 main의 템플릿인 main.ejs에서 바로 출력해줄 수가 있습니다.
   - 만약 유저의 이메일이나 닉네임을 넘겨주고자 한다면 위의 `deserialzeUser` 부분에서 넘겨받은 유저의 `id`값을 통해 더 다양한 정보를 보여줄 수 있겠죠.



## Troubleshooting (MySQL 에러 관련)

매번 git pull하면 mysql 에러가 발생한다.

무조건 무조건 무조건 권한 문제다. 현재 생성한 유저들이 __내가 사용하고자 하는 DB__ 에 해당 유저들이 __권한__을 가지고 있는지 확인할 것.



