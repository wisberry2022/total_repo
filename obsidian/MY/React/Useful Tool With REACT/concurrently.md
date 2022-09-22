# Concurrently

concurrently는 package.json 파일의 scripts를 사용자가 커스텀하여 한 줄의 명령어 실행으로 여러 개의 명령을 실행할 수 있게 도와주는 라이브러리이다.

``` bash
npm install concurrently --save
```

package.json에 추가적인 설정을 해줘야 한다

```javascript
"scripts": {
	"start": "concurrently \"nodemon backend\\server.js\" \"react-scripts start\"",
	"build": "react-scripts buiild"
	
				...
	
}
```


string 내부에 작성하는 것이기 때문에 탈출문자를 사용하여야 한다