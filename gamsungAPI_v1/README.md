# RESTful API : GamsungAPI-V1

> 보안상의 이유로 서버는 기본적으로 같은 서버가 아닌 다른 곳에서 오는 요청들을 기본적으로 차단합니다. 그러나 API는 클라이언트를 위한 프로그램이므로 같은 서버가 아닌 다른 곳에서 오는 요청들을 허가해야 하는데, 이것을 __HTTP 접근제어__ 혹은 __CORS(Cross-Origin Resource Sharing, 출처가 다른 곳끼리 자원 공유)__라고 합니다.

- `Access-Control-Allow-Origin`: 요청이 허용되는 url을 route을 제외하고 적습니다. 이외의 url로 부터 오는 요청은 거절됩니다. 단, `*`은 모든 요청을 허가시킵니다.
- `Access-Control-Allow-Methods`: 요청이 허용되는 HTTP verb 목록을 적습니다. 여기에 포함되지 않은 HTTP Verb 요청은 거절됩니다. `*`을 사용할 수 없습니다.
- `Access-Control-Allow-Headers`: 요청이 허용되는 HTTP header 목록을 적습니다. 여기에 포함되지 않은 HTTP header는 사용할 수 없습니다. 



# API Design Pattern

- 복수명사를 사용합니다. (/movies)
- 필요하면 URL에 하위 자원을 표현합니다. (/movies/23)
- 필터조건을 허용할 수 있습니다. (/movies?state=active)







