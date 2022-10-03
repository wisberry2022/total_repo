# POST 요청 처리


프론트단에서 POST 요청을 할 경우, express.js에서 처리를 해줄 수 있다. POST 요청은 GET 요청과 달리 민감한 정보를 전달할 때 사용되며, 대용량의 데이터를 요청할 때 주로 사용한다. 그래서 POST 요청에 데이터를 포함시킬 경우, 쿼리스트링으로 전달하지 않고 Message Body에 포함시켜 서버로 전송하게 된다. 민감한 정보를 숨겨 악성사용자가 데이터를 가로채지 못하는 보안 조치를 취할 수 있는 셈이다.

node.js에서 GET 요청을 처리 할 때는 라우터의 콜백함수에서 요청에 접근하여 query 메소드로 접근할 수 있었지만, POST 요청은 아래와 같이 요청한다.

``` javascript

router.get('/getData', (req, res) => {
	const { name, comment } = req.query;
	res.send('OK!')''
})

```

req.query에 곧바로 접근하여 데이터를 처리할 수 있다. 하지만 POST 요청은 다르다. 쿼리스트링으로 데이터가 전달되지 않기 때문에 req.query는 사용할 수 없고, req.body를 사용하여야 한다. POST 요청은 데이터가 Message Body에 포함되기 때문이다.

``` javascript

router.post('/getData', (req, res) => {
	const {name, comment} = req.body;
	res.send('OK!')''
})

```

위 코드를 실행하면, 터미널에는 `undefined`가 출력된다. 왜? POST 요청으로 전달된 데이터는 body에 들어가고 body에 접근했는데. 왜...

Express.js에서는 POST 요청의 body를 곧바로 신뢰하지 않는다. 그래서 default 값을 undefined로 설정해두었다. 만일 개발자가 body에 접근하고 싶다면 message body를 파싱하는 별도의 미들웨어를 사용하여야 한다.



## 1. body-parser

`body-parser`는 POST 요청의 body를 다양한 인코딩으로 파싱할 수 있게 해주는 대표적인 미들웨어이다. 이를 활용하면 POST 요청을 적절히 처리할 수 있다. 별도의 라이브러리이기 때문에 npm install이 필요하다.

```bash
npm install body-parser
```

그 후 서버 파일에 미들웨어를 app에서 사용하겠다는 코드를 작성하여야 한다. 그 코드는 아래와 같다.

```javascript
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

 //... another code

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false }));

app.post('/getData', (req, res) => {
	const { name, comment } = req.body;
	res.send('OK!');
})


```

body-parse는 반드시 route 세팅 전 선언을 해야한다. 그렇지 않고 bodyParser.json() 코드와 bodyParser.urlencoded 코드를 라우팅 세팅 코드 이후에 작성하면 req.body를 제대로 파싱하지 못하고 계속하여 undefined가 출력된다. 

app.use(bodyParser.json())은 POST 요청으로 들어온 데이터를 오로지 JSON 형태의 데이터로 파싱하겠다는 의미이다. body-parser 라이브러리는 json이외에도 .raw, .text, .urlendoced 형태의 데이터를 파싱할 수 있으며 필요에 따라 파서를 골라 사용할 수 있다.

app.use(bodyParser.urlencoded( {extended: false })); 이 코드의 의미는, 서버와 프론트단에서 주고받는 객체 데이터에서 중첩 객체 허용 설정을 담당한다. extended: false의 경우 node.js에 기본으로 내장된 queryString 객체를 사용하며, true값일 시 따로 설치가 필요한 qs 라이브러리를 사용한다.

내장 객체인 queryString을 사용(extended: false) 시에는 객체 내에 존재하는 중첩 객체를 인코딩 할 때, 키 값에 depth를 모두 포함한다.

반대로, qs 모듈 사용(extended: true) 시에는 객체 내에 존재하는 중첩 객체를 인코딩 할 때, depth를 구분하여 나눠준다.  기본 설정이 true이지만 deprecated되었다.

