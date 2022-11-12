
Next.js는 SSR을 지원하기 때문에 api 서버 혹은 그 외의 서버 구축을 위한 자체 내장 서버를 제공한다. 프로젝트의 pages 폴더 내에 api라는 폴더 내부에 파일을 만들어 생성할 수 있다. 프론트단에서 api 엔드포인트에 접근하기 위해서는 해당 경로를 작성하면 된다.

```javascript

const App = () => {
useEffect(() => {
	axios.get('/api/hello').then((res) => (console.log(res)))
}, [])

return (
	<div>
		...
	</div>
	)
}

```

실제 nextjs 프로젝트의 api 폴더에 들어가면 기본적으로 생성되는 `hello.js` 파일이 존재한다. 해당 파일의 이름을 작성해주면 된다.