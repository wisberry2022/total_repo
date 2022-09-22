# Express.js Tutorial

## Node.js와 Express.js

### Node.js

구글의 크롬 V8 자바스크립트 엔진을 기반으로 한 비동기 IO를 지원하는 고성능 네트워크 서버이다.
프로그래밍 언어로 Javascript를 사용하며, Javascript의 강력함과 단순함을 활용한 이벤트 기반의 논블로킹 I/O를 주 컨셉으로 만든 Back-end 자바스크립트 기반 서버이다


### Node.js 사용 시 주의사항

- CPU를 많이 사용하지 않는 작업 위주로 개발되어야 한다
- Javascript 코드의 가독성이 떨어져 유지보수가 어려워진다.
- 컴파일 시 에러 확인이 불가능하다
- 짧은 시간에 대량의 클라이언트 요청을 처리하는 웹 어플리케이션을 개발하기엔 적합하지만, CPU의 사용이 높게 필요한 어플리케이션의 경우(하나의 작업처리 시간이 길게 필요한 경우)에는 오히려 성능이 좋지 않을 수 있다
- Node.js는 간단하지만 많은 양의 처리를 요하는 서버를 구축할 때 효율이 좋다


### Express.js

Node.js를 위한 빠르고 간편한 웹 프레임워크이다.
Express.js는 Node.js의 핵심 모듈인 http와 Connect 컴포넌트를 기반으로 하는 웹 프레임워크다. Node.js 개발 시 개발을 빠르고 손쉽게 할 수 있도록 도와주는 역할을 한다. 이는 미들웨어(Middleware)구조 덕분에 가능한 것이다.

`Middleware`란?
- 서로 다른 애플리케이션이 서로 통신하는데 사용되는 소프트웨어이다. 


#### 기본적인 서버 구축

Node.js와 Express.js를 통해 가장 기본적인 서버를 구축해볼 것이다. server.js라는 파일을 만들고 아래와 같이 작성하자.

```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();
const test = require('./Router/router');

app.use(express.static(path.join(__dirname, '../build')));
app.get('/test', test);

app.listen(5000, () => { console.log('Listening 5000 PORT!')});
```

 5000번 포트를 사용하여 서버를 구축하는데, 이 때 웹 페이지에 가장 먼저 접속하였을 때는 그 링크가 '/'와 같이 표기되는데 이는 루트라는 의미이다. 사용자가 맨 처음 웹 페이지에  접속하였을 때 뿌려줘야 할 파일을 지정할 수 있는데, express.static을 이용하여 이를 처리할 수 있다. 

`express.static()` 은 디렉토리 이름을 인자로 받아, 인자로 받은 디렉토리의 파일을 정적 파일로써 웹 브라우저 화면에 뿌려준다.

express.static() 메소드는 node 프로세스가 실행되는 디렉토리에 상대적이기 때문에 절대경로를 사용하는 것이 권장된다. 이를 위해 `__dirname` 을  사용하는데, 이는 현재 작성하고 있는 파일의 경로를 절대경로로 제공해준다.  `server.js` 의 위치와 브라우저에 뿌려줘야하는 파일의 위치가 다를 경우 상대경로에 사용하는 경로를 추가하여 해결할 수 있다.

 test의 경우 라우팅을 위해 별도로 모듈화한 .js 파일이다. test 변수는 `router.js` 파일을 임포트 한 것이다. 라우팅이란, 프론트단에서 서버 쪽으로 요청을 보낼 때 URL을 함께 보내게 되는데, 이 때 서버에서 URL을 받아 클라이언트(프론트단)의 요청에 애플리케이션이 응답하는 방법을 결정하는 것이라고 볼 수 있다.

*Express 없이 라우터를 만들면 요청 메소드와 주소별로 분기 처리하여야 하기 때문에 가독성이 떨어지는 코드를 작성하여야 한다. 라우팅에 Express를 사용하는 이유 중 하나는 깔끔한 라우팅 관리도 포함된다*

그렇다면 라우팅 파일을 살펴보자

```javascript
//router.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/test', (req, res) => {
	res.send( { test: 'hello world!' });
});
```

`router.get`을 사용하여 클라이언트로 부터 요청받은 URL을 전달받아 적절한 처리를 해주고 그 응답을 다시 클라이언트에게 보낼 수 있다. router.get의 인자로 첫 번째는 클라이언트가 요청한 URL과 동일한 URL을, 그리고 두 번째 인자로는 응답(response)과 요청(request)를 처리하는 콜백함수를 받는다