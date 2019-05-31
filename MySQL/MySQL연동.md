# MySQL - Express 연동

## 기본 설정

0. `mysql` 패키지 설치

   ```bash
   $ npm install mysql --save
   ```

1. `index.js` 생성

   ```javascript
   var mysql      = require('mysql');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'bbangul',
     password : 'minkyo',
     port     : '3306',
     database : 'may30'
   });
   
   connection.connect();
   
   connection.query('SELECT * from Persons', function(err, rows, fields) {
     if (!err)
       console.log('The solution is: ', rows);
     else
       console.log('Error while performing Query.', err);
   });
   
   connection.end();
   ```

   - mysql 패키지 호출
   - connection 생성 후 필요한 정보들 객체로 넘기기
   - connection 변수에 `connect()` 메서드 사용해서 연결
   - `query` 메서드로 필요한 쿼리문 날리기
   - `end` 메서드로 연결 종료시키기



2. `Trouble Shotting`

   - 위의 코드 실행 시 에러 발생하면 권한 문제일 가능성이 큼.

   - 이럴 때는 다음과 같은 절차로 해결하면 됨.

     ```mysql
     CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL PRIVILEGES ON 데이터베이스이름.* TO 'username'@'localhost;
     ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
     ```



## Node와 연동시키기

nodejs Express 공식홈페이지에 가면 자세한 내용이 나와있다.



1. mysql과 express 연결시키기

   ```javascript
   var connection = mysql.createConnection({
       host : 'localhost',
       port : 3306,
       user : 'bbangul',
       password: 'minkyo',
       database : 'may30'
   })
   
   connection.connect()
   ```

2. 필요한 query문 날리기

   ```javascript
   let query = connection.query('SELECT * FROM Persons', function(err, rows){
           if (rows[0]) {
               responseData.result = "ok"
               responseData.NAME = rows[0].NAME
           } else {
               responseData.result = "none"
               responseData.name = ""
           }
           res.json(responseData)
       })
   ```

   





















