# JS에서 API 호출하기

바닐라 JS에서 외부 라이브러리 사용 없이, fetch 함수를 통해 백엔드의 API를 호출할 수 있다. ``fetch()`` 함수를 사용하면 언제 어디서든, GET 요청이든 POST 요청이든 API를 손쉽게 호출할 수 있다. 기본적인 사용법은 아래와 같다.

```javascript
fetch(url, option)
	.then(res => res.json())
	.then(res => {
		// api 호출 이후의 로직
	})
	.catch((error) => console.log(error));
```

