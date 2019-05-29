# MySQL 연동 설정

# MySQL 설치

> 참고: <https://all-record.tistory.com/93>
>
> MySQL 공식 홈페이지: <https://dev.mysql.com/downloads/file/?id=486088>
>
> MySQL Version: 8.0.16



### Windows 환경변수 등록

1. mysql 설치 경로 복사

   > C:\Program Files\MySQL\MySQL Server 8.0\bin

2. 윈도우 환경변수 `path`에 새로 추가!

3. 다음의 명령어를 수행했을 때 버전정보가 뜨면 성공!

   ```bash
   $ mysql -V
   ```



### 설치 후 터미널 창에서 mysql 커맨드로 접속

```bash
$ winpty mysql -u root -p
```

- winpty를 붙여줘야한다. 이게 귀찮으면 alias로 설정해줘야함.
- winpty == "Windows Software Package"



# (Node로 넘어가기 전!) MySQL 기본

## 1. Database 생성

```mysql
CREATE DATABASE node_practice default CHARACTER SET UTF8;
show databases;
```

- node_practice라는 DB를 생성
- 데이터베이스 목록보기
  - 우리가 만든 것 이외의 것들도 보이는데 얘는 mysql 시스템에서 사용하는 db이므로 신경쓰지 않아도 됨.
- DB의 모든 이름(데이터베이스, 테이블 등)의 Column에는 소문자를 사용하고 공백 대신 `_`를 사용한다.



## 2. Database 사용자 추가

```mysql
# 사용자 추가
create user 'minkyo'@'localhost' identified by 'minkyo';
GRANT ALL privileges ON node_practice.* TO 'minkyo'@'localhost';
EXIT;
winpty mysql -u minkyo -p
USE node_practice
```

- `ALL PRIVILLEGES` : 데이터베이스에 대한 모든 권한주기
- `ON node_practice.*` : 권한 대상은 node_practice이고, `noce_practice.*`은 noce_practice 테이블의 모든 테이블을 의미
- `TO minkyo@localhost` : 사용 권한을 받는 사용자는 `minkyo`이고, localhost는 말 그대로 로컬에서만 사용 가능 (로컬호스트가 아닌 외부에서 접근하려면 접근 권한을 따로 줘야한다.)
- `IDENTIFIED BY` : 해당 사용자의 비밀번호
- `EXIT `: 현재 연결된 mysql 닫기 (현재 ROOT권한으로 접속되어 있으므로)
- `mysql -u minknyo -p` : 방금 생성한 사용자로 로그인하기

- `use node_practice` : 해당 사용자가 node_practice라는 데이터베이스를 사용하겠다고 선언.



## 3. Database 사용자 제거

```mysql
drop user '사용자'@localhost;
```



## 4. 테이블 생성

```mysql
# 테이블 생성
CREATE TABLE node_first (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32),
    age INT
);

# 테이블 목록 조회
SHOW TABLES:
```

- `DESCRIBE 테이블명;` 으로 해당 테이블의 컬럼 조회가 가능하다.

- 모든 컬럼의 default값은 NULL.



## 5. 데이터 삽입 (INSERT)

```mysql
# 데이터 삽입
INSERT INTO node_first 
(name, age)
VALUES('이빵글', '5');

INSERT INTO node_first
(name, age)
VALUES('유중위', '5');
```

- ID는 직접 입력도 가능하지만, auto_increment를 줬기 때문에 자동으로 증가한다.



## 6. 데이터 조회 (SELECT)

```mysql
# 데이터 조회
SELECT _id, age, name FROM node_first;
SELECT * FROM node_first
```



## 7. 데이터 변경, 삭제 (ALTER, SELECT, DROP, DELETE)

```mysql
# DB 및 테이블 삭제
DROP DATABASE db_name;
DROP TABLE table_name;

# 컬럼 삭제 
DELETE FROM table_name;
DELETE FROM table_name WHERE _id = 2;
```



테이블 변경에서는 다음의 일을 할 수 있다.

1. 테이블 이름 변경 (RENAME)
2. 테이블 칼럼, 제약조건 추가 (ADD)
3. 테이블 변경 (CHANGE, MODIFY)
4. 테이블 제약 조건 제거 (DROP)

```mysql
# 테이블 이름 변경 (RENAME)
ALTER TABLE table_name RENAME TO new_table_name;
DESC new_table_name;
```

- `DESC` == DESCRIBE



테이블 칼럼, 제약조건 추가 (ADD)

```mysql
# 테이블 칼럼, 제약조건 추가 (ADD)
ALTER TABLE new_table_name ADD COLUMN new_column_name INT NOT NULL AFTER _id;
ADD PRIMARY KEY (_id);
DESC new_table_name;
```

- new_column_name이라는 새로운 칼럼이 추가되었고, _id가 기본키로 변경됨. 



테이블 변경 (MODIFY, CHANGE)

> CHANGE는 칼럼의 이름도 변경이 가능하다.

```mysql
# MODIFY
ALTER TABLE new_table_name MODIFY COLUMN new_column_name BIGINT DEFAULT 10000;

CHANGE
ALTER TABLE new_table_name CHANGE COLUMN new_column_name another_column_name INT DEFAULT 100;
```



테이블 제약조건 제거 (DROP)

```mysql
ALTER TABLE table_name DROP COLUMN column_name, DROP PRIMARY KEY;
```

- column_name을 제거하고, 프라이머리 키도 제거한다.



__데이터 변경 (UPDATE)__

```mysql
UPDATE table_name SET some_column = 'WOW' WHERE id = 2;
```





