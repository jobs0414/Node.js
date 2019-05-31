# Express를 이용해서 Template 엔진 사용하기

템플릿 엔진을 이용하면 애플리케이션에서 정적 파일(static files)의 사용이 가능해진다.

여러가지 템플릿 엔진이 존재한다. `Pug`, `Mustache`, 그리고 `EJS` 등... 참고로 Express는 디폴트로 `Jade`를 제공한다.

템플릿 엔진을 사용하기 위해서는 두 가지 설정을 해줄 필요가 있다.

1. `views`: 템플릿 파일들이 위치할 `views`라는 이름의 디렉토리를 생성해준 후, js파일에서 설정해준다.

   ```javascript
   app.set('views', './views')
   ```

2. `view engine` : 사용할 템플릿 엔진 선언

   ```javascript
   app.set('view engine', 'ejs')
   ```

3. Django에서와 마찬가지로 특정 URL로 요청이 들어오면 해당 템플릿을 렌더시켜주면 된다.

   ```javascript
   app.get('/', function(req, res){
       res.render('index', { 제목: '어쩌구', 내용: '저쩌구'})
   })
   ```

   - 여기서 index는 `index.ejs`파일을 가리키며, 뒤의 객체는 Django에서의 context처럼 객체를 넘겨주면 된다.