# Axios

## Axios란?

node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트이다. Axios를 통해 작성한 코드는 브라우저와 node.js에서 동일하게 실행된다는 특징이 있다. 서버사이드에서는 네이티브 node.js의 http 모듈을 사용하고, 클라이언트(브라우저)에서는 XMLHttpRequests를 사용한다.


Axios는 JS의 built-in 라이브러리인 fetch API와 동일한 기능을 제공한다. 하지만 fetch 는 Chrome 42+, Firefox 39+ 등과 같은 한정된 브라우저에서만 사용이 가능하며 요청의 응답으로 받은 데이터를 자동으로 JSON으로 변환해주지 못하기 때문에 Axios를 사용하는 장점이 더 크다고 볼 수 있다.


#### 설치


```bash

npm install axios

```


### Request API in Axios

Axios에서 요청을 보내기 위한 API로는 아래와 같다.

- GET :  `axios.get(url[, config])`
- POST: `axios.post(url,data[, config])`
- PUT: `axios.put(url, data[, config])`
- DELETE: `axios.delete(url[, config])`

위 메소드들의 파라미터에는 API의 주소를 넣을 수 있다. 혹은 config를 통해 객체 형태의 option을 직접 넣어줄 수 있다.

##### Example

``` javascript
axios({
	method: "get",
	url: "http://localhost:5000/test",
	responseType: "type"
}).then((res) => { 
	// response Action
	})
```

위 코드는 axios를 사용하는 가장 기본적인 방법이다. POST 메소드에서는 url 밑에 data Object를 추가하여 데이터를 전송할 수 있다.


### Axios Shorthand Method


위에서 작성한 코드를 조금 더 간략하게 작성할 수 있다.  위에서 작성한 코드는 get 요청을 위한 axios 코드였는데, 단축된 메소드를 사용하면 더욱 쉽게 작성할 수 있다.


#### 단순 URL을 통해 get 요청을 보내는 경우


``` javascript
axios.get('http://localhost:5000/test')
	.then((res) => {
		// response Action
	})

```


#### Parameter Data를 함께 보내는 경우


``` javascript

axios.get('http://localhost:5000/test', {
	params: {
		id: 123,
		name: 'park-jiyoon',
		age: 23
	}
})

```

파라미더 데이터를 함께 보내는 경우는 url 뒤에 config 객체를 생성하여 params 라는 객체를 생성해 데이터를 전달 할 수 있다. get 요청으로 전송하는 것이기에, 웹 브라우저에서 서버에게 전송할 때 params 데이터가 쿼리스트링 형태로 URL이 전달된다. 

주의할 점은,  프론트단에서 위 코드를 통해 서버로 GET 요청을 보내게 되었을 때, Node.js에서는 req.query로 받을 수 있다.

``` javascript

// Node.js 
app.get("/test", (req, res) => {
  currentPut(req.query).then((response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  })
})

```


