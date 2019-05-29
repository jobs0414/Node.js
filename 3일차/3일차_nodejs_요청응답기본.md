# Request / Response 처리 기본

## POST 요청처리

1. public디렉토리에 `form.html` 파일을 하나 생성한다.

```html
<form action="email_post" method="POST">
    email : <input type="text" name="email"><br>
    submit: <input type="text" name="submit">
</form>
```

`app.js`에서 POST요청을 처리하기 위한 코드를 작성해준다.

```javascript
app.post('/email_post', function(req, res) {
    res.send("post response")
})
```

- 여기서 request의 body에 담긴 내용을 가져올려면 bodyParser라는 별도의 모듈이 필요하다
- *(참고로 get의 경우에는 `req.param('email')` 이런식으로 그냥 가져올 수 있다!)
  - 얘는 장고에서 request.GET.get("email")과 같다고 보면 된다.



2. `body-parser 설치`

```bash
$ npm install body-parser --save
```

- 당연히 `app.js`에서 불러와서 써줘야한다.

  ```javascript
  let bodyParser = require("body-parser")
  ```

또한 express에 내가 body-parser를 쓰겠다고 알려줘야한다.

그런데 여기서 두 가지 방식이 있다.

1. 넘어오는 파일이 JSON형식으로 올 때

   ```javascr
   app.use(bodyParser.json())
   ```

2. 일반적인 POST 형태로 올 때 (일반적으로 클라이언트로부터 POST로 요청이 올때는 인코딩해서 온다고 한다. 얘는 아스키코드나 다른 특수한 값으로 치환해서 온다고 한다. 자세한 것은 찾아볼 것)

   ```node
   app.use(bodyParser.urlencoded())
   ```

일반적으로는 둘 다 코드에 작성해주고 사용하면 된다.

사용법은 다음과 같이 req.body 이런 식으로 쓰는데, 이 body에는 오브젝트가 담기게 된다.

```javascript
app.post('/email_post', function(req, res) {
    console.log(req.body)
})
```

- 따라서 일반적으로 자바스크립트에서 객체에 접근하듯이 req.body.email 이런식으로 접근해서 값을 가져올 수 있다.



## View Engine을 활용한 응답처리 (EJS 활용)

> EJS는 Embedded Javascript Templates를 뜻함. (Jade, Pug 등 다양하게 많다.)

1. EJS 모듈 설치하기

   Express와 결합해서 동작하는 여러 템플릿 중 하나이다.

   ```bash
   $ npm install ejs --save
   ```

2. `app.js`에서 `view engine` 설정해주기

   require로 불러올 필요 없이 set만 해주면 된다.

   ```javascript
   app.set('view engine', 'ejs')
   ```

   - `view engine으로 ejs를 사용할래` 라고 말하는것과 같다.

3. `views`라는 디렉토리를 생성한다. `.ejs`파일들은 보통 여기에 넣어놓는다.

   ```ejs
   // email.ejs
   <h1> Welcome !!! <%= email %> </h1>
   ```

   - <%= > 이런 식으로 변수를 써주면 된다.

4. app.js` 수정

   ```javascript
   app.post('/email_post', function(req, res) {
       res.render('email.ejs', {'email' : req.body.email})
   })
   ```

   - render라는 함수를 통해 `email.ejs`파일을 불러온다. 
   - 여기서부터는 sendFile을 쓰지 말고 render를 써준다.

   

5. 마치기 전...

   node_modules는 너무 큰 파일이기 때문에 github에 올리지 않게 된다.

   그런데 우리는 NPM으로 패키지를 인스톨할 때  `--save`명령어를 통해 자동으로 `package.json`에 dependency들을 추가해주었다. 따라서, 다른 환경에서 똑같은 패키지들을 설치하기 위해서는 `package.json`파일을 갖고서 다음의 명령어 한 줄만 쳐주면 모든 dependency들이 자동으로 설치가 된다.

   ```bash
   $ npm install
   ```

   

## JSON을 활용한 Ajax 처리

> 이 강의에서는 XMLHttpRequest 인스턴스를 생성함으로써 고전적인 Ajax요청을 보내는 식으로 수업했다.
>
> 그러나, 우리는 Axios를 사용해야 한다. 더 편하고 쉽고 좋으니까.

`form.html`에서 버튼을 하나 만들어주고, 필요한 script문을 작성하자.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>email form</title>
</head>

<body>
    <form action="email_post" method="POST">
        email : <input type="text" name="email"><br>
        <input type="submit">
    </form>

    // ajaxsend라는 버튼과 클래스를 만들어준다. 
    <button class="ajaxsend">ajaxsend</button>
    <div class="result"></div>
    
    <script>
        document.querySelector('.ajaxsend').addEventListener('click', function(){
            var inputData = document.forms[0].elements[0].value
            sendAjax('http://127.0.0.1:3000/ajax_send_email', inputData)
        })

        function sendAjax(url, data){
            var data = {'email' : data}
            data = JSON.stringify(data)

            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            xhr.setRequestHeader('Content-Type', "application/json")
            xhr.send(data)
            
            xhr.addEventListener('load', function() {
                let result = JSON.parse(xhr.responseText)

                if (result.result !== "ok") return
                document.querySelector(".result").innerHTML = result.email
            })
        }
    </script>
</body>

</html>
```

- 버튼을 클릭했을 때 click이라는 이벤트리스너를 추가해준다. 콜백함수로써 `sendAjax`라는 함수를 따로 정의해준다.

- `sendAjax`함수는 url과 data를 매개변수로 받는다. 여기서 data는 form에서의 email이라는 name을 가진 input 태그의 value값이다.

- Ajax 요청을 보낼 때는 기본적으로 JSON형태로 바꿔서 보내줘야하므로 `stringify`를 써서 변환해준다.

- XMLHttpRequest() === Ajax 요청을 위한 XML 요청 객체 생성

  - `open` : 내가 어떠한 요청방식으로 보낼지 정한다.

  - `setRequestHeader` : 헤더의 타입을 정해줘야한다. json의 경우 명시적으로 표기해준다.

  - `send`: 데이터 전송

    > 이 부분에서 app.js에 ajax_send_email이라는 URL을 처리하기 위한 코드를 작성해준다.
    >
    > ```javascript
    > app.post('/ajax_send_email', function(req, res){
    >     // check validation about input value => select DB (DB조회해서 유효성 검사)
    >     let responseData = {'result' : 'ok', 'email' : req.body.email}
    >     res.json(responseData)
    > })
    > ```
    >
    > 넘어온 데이터는 request의 body에 담겨져 있는데, 얘를 다시 response로 보내줘야하므로 JSON형태로 바꿔준 후 response에 담아서 보내준다.

  - `addEventListener` : 얘를 추가해줌으로써 요청이 왔을 때 (load) 콜백함수를 실행해준다. 

    마지막으로 넘어온 JSON 형태의 데이터를 `parse` 메서드를 통해 파싱 후, 내가 원하는 부분에 출력해주기만 하면 된다.

    



















































