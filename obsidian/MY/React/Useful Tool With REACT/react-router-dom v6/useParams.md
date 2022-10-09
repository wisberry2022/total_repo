# useParams


리액트 라우터 돔은 편리한 라우팅을 위해 자체적인 Hook을 지원한다. 이 중, 동적인 링크 생성을 위해 사용할 수 있는 useParams에 대해 설명한다.



## 1. 동적 라우팅

프로젝트 진행 시, 무수히 많은 URL을 라우팅해야하지만, 동일하거나 비슷한 화면을 유지해야하는 경우, 동적 라우팅을 진행해야한다. 만일 100개가 넘는 컴포넌트들을 라우팅해야한다면, 100개의 Route 컴포넌트를 생성할수는 없다. 이를 위해 리액트 라우터 돔에서는 useParams를 사용할 수 있다.

단적으로, 'test/board' 링크가 게시판 화면을 라우팅하고 있다고 가정해보자. 이 때, 게시판에 각각 존재하는 개별적인 게시글을 클릭했을 때,  'test/board/post/1', 'test/board/post/2' 와 같이 URL은 항상 달라져야한다.  만약 게시글의 개수가 100개, 200개를 넘어간다면 수동으로 Route 컴포넌트를 생성하는 것은 너무 비효율적이다.

useParams를 사용하면 Route의 path에 특정 인자를 전달할 수 있으며, 라우팅된 컴포넌트에서 useParams에 접근하여 동적인 URL을 생성할 수 있게 된다. 



## 2. 사용법

### 2-1. 상위 컴포넌트

useParams 설정을 위해, 상위 컴포넌트에서 사소한 규칙을 지켜야 한다.

```javascript
//App.js
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path = "/test/board/post:id" element = {<Post />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
```

본래라면 App.js에서 최상위 URL인 `/test`만 선언하고 하위 URL인 `/board`는 board 컴포넌트에서 중첩 라우팅으로 구현하는 것이 좀 더 현실적이지만, 설명의 편의를 위해 위와 같이 작성하였다.

post/1, post/2와 같이 바뀌어야 한다면 바뀌어야 하는 URL에 `:<parameter>`와 같은 형태로 작성한다.  콜론 뒤에 작성하는 parameter는 사용자 임의로 설정할 수 있으며, 이 parameter 이름은 차후 라우팅된 컴포넌트(위에서는 Post 컴포넌트)에서 재사용할 수 있다.



### 2-2. 하위 컴포넌트

post 컴포넌트에서 useParams를 선언할 수 있다. 

```javascript
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//Post.js
const Post = () => {
	const postingData = useSelector(state => state.review);
	const params = useParams();
	const data = postingData[params.id]
	
	return (
		<div>
			data.map(it => {
				return (
					<div key = {it.id}>
						//... Rendering Code
					</div>
				)
			})
		<dlv>
	)
}
```

useParams를 선언하여 할당한 params는 객체의 key에 접근하는 방식으로 사용할 수 있다. 상위 컴포넌트(App.js)에서 작성하였던 임의의 parameter 이름을 사용할 수 있다. App.js에서 `post:id`와 같이 선언하였으니 Post.js에서는 `params.id`로 접근할 수 있다. 

만약 순회할 수 있는 데이터가 있다면 params.id를 통해 데이터에 접근하여 사용자가 접속한 URL의 id에 맞는 데이터를 출력할 수 있는 것이다. 



### 2-3. Link

Post.js 컴포넌트를 라우팅해주었으니 이를 연결해주어야 한다. Test.js의 하위 컴포넌트에 있는 'AnotherComponent'에서 Post 컴포넌트로 이동하는 코드를 작성해보자.

```javascript

//AnotherComponent.js
const AnotherComponent = () => {
	return (
		<div>
			{postingData.map(it => {
				return (
					<div key = {it.id}>
						<Link to = {'/test/board/post/${it.id}'}>{it.title}</Link>
						// ... Rendering Code
					</div>
				)
			})}
		</div>
	)
}
```

Link에는 위와 같이 작성하여 실제 URL에 들어가야하는 `:id`에 맞는 값을 넣어주어야 한다.