# Nested Routing


리액트 라우터 돔을 사용하여 개발자가 제작한 컴포넌트를 링크로 만들어 라우팅을 시도할 수 있다. 보통 App.js에서 아래와 같이 사용한다.

```javascript

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Total />} />
          <Route element={<Layout />}>
            <Route path="/sangha" element={<Sangha />} />
            <Route path="/mm_intro" element={<Intro />} />
            <Route path="/mm_college" element={<College />} />
            <Route path="/mm_train" element={<TrainCenter />} />
            <Route path="/mm_practice" element={<Practice />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

```

하지만 만일 프로젝트의 규모가 커져 라우팅 해야 할 컴포넌트들이 많아진다면 어떻게 해야할까? 위 코드처럼 Route를 무한정 추가해줄 수는 없다. 관리하기도 힘들뿐더러 유지보수에도 어려움이 생긴다. 

리액트 라우터 돔은 이를 위해 `Nested Routing`, 중첩라우팅을 지원한다. 컴포넌트 내부에 라우팅을 시도하여 같은 링크의 하위 링크를 설정할 수 있다. 리액트 라우터는 중첩 라우팅을 위해 몇 가지 지켜야 할 사항이 있다.



## 1. 최상위 컴포넌트

/test 라는 링크가 있고, 해당 링크에 들어갔을 때, /test/user 라는 링크를 만들고, /test/board라는 링크를 라우팅해주고 싶다고 가정하자. /test 링크는 App.js에서 라우팅한다고 가정한다면 코드는 아래와 같다.

```javascript

//App.js
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path = "/test/*" element = {<Test />} />
				</Routes>
			</BrowserRouter>
		</>
	)

}

```

위 코드는 중첩 라우팅을 위해 최상위 컴포넌트에서 설정해주어야 할 사소한 규칙이다.  메인 링크 뒤에 `/`를 넣어준 뒤 `*`을 추가하여 /test 링크 뒤에 하위 링크들이 들어올 수 있음을 명시해주는 것이다.



## 2. 해당 컴포넌트

<Test /> 컴포넌트를 보자. 

```javascript

//Test.js
const Test = () => {
	return (
		<div>
			<AnotherComponent />
			<Routes>
				<Route path = "user" element={<User />} />
				<Route path = "board" element={<Board />} />
			</Routes>
		</div>
	)
}

```

App.js에서 중첩 라우팅을 설정했던 컴포넌트에서는 Routes와 Route를 활용하여 본격적인 라우팅을 진행하면 된다.  다른 컴포넌트들을 라우팅 할 때에는, 상위 레벨에서 라우팅해주었던 것과는 달리 `path`에 `/`를 쓰지 않아도 된다. 



## 3. 링크 걸기

위 코드 중  `AnotherComponent`에서 /test/user, /test/board에 접근하고 싶다면 어떻게 해야할까? Link을 사용하여 연결해주면 된다.

```javascript

//AnotherComponent.js
const AnotherComponent = () => {
	return (
		<div>
			// ...Other Code
			<Link to = "/test/user"></Link>
			<Link to = "/test/board"></Link>
		</div>
	)
}
```

위와 같이 설정하면 /test/user, /test/board에 접근할 수 있는 중첩 라우팅을 구현한 것이다.