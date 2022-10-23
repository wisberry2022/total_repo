

# 1. Route

Next.js는 SSR 지원을 위한 자체 내장 서버를 지원하기도 하지만 그 외에도 유용한 기능을 제공한다. 이는 Next.js가 클라이언트+서버를 모두 제공하는 올인원 솔루션이기에 그렇다. Next.js에서 제공하는 유용한 기능 중 하나 인 Route에 대해 알아보고자 한다.



## 1-1. 기본 Route

루트 페이지에서 다른 곳으로 이동해야 할 때, Next.js는 별도의 라이브러리 도움없이 js 파일 생성만으로 Routing이 가능하다.  React에서는 react-router-dom을 통해 라우팅을 진행했던 것과는 다르다.

```javascript

//index.js
export default function Home() {
	return (
		<div>
			<h1>Main Page</h1>
			<ul>
				<li><a href = "/sub/mainMenu">메인메뉴</a></li>
				<li><a href = "/sub/introduce">회사소개</a></li>
				<li><a href = "/sub/recruit">인재채용</a></li>
				<li><a href = "/sub/cs">고객센터</a></li>
			</ul>
		</div>
	)
}

```

Next.js 프로젝트로 개발환경을 실행하였을 때 가장 먼저 나오는 스크립트 파일인 index.js의 Home() 함수를 수정하였다. 일반 HTML에서 링크를 준 것처럼, `<a>` 태그를 활용하여 이동하고자 하는 목표 URL을 입력한다.  

사용자가 링크를 눌렀을 때 목적 URL이 정상적으로 동작하기 위해서는 해당 URL에 대응하는 컴포넌트가 존재해야한다. react-router-dom의 경우, Routes라는 컴포넌트 내부에 Route 컴포넌트를 생성한 뒤 elements로 렌더링할 컴포넌트를 변수로 주고, 사용자 임의 경로를 path로 전달하였다. 하지만 Next.js를 이용하면 별도로 컴포넌트를 임포트하지 않고도, 라우팅이 가능하다.

우선 위에서 설정한 경로들에 대응하는 컴포넌트를 만들 필요가 있다. sub 폴더를 만든 뒤 mainMenu, introduce, recruit, cs js파일을 만들자. 이 때 주의할 점은, 라우팅을 위한 컴포넌트 파일의 이름은 index.js에서 작성하였던 URL과 동일해야한다. 예를 들어 '/sub/mainMenu'라는 URL은, sub라는 폴더 아래에 'mainMenu.js'라는 컴포넌트가 존재해야한다. 만일 이를 무시하고 'MainMenu.js'로 작성할 경우 라우팅이 되지 않는다.

``` javascript

//sub/mainMenu.js
export default function mainMenu() {
	return (
		<div>
			<h1>메인메뉴</h1>
			<a href = "/">홈으로</a>
		</div>
	)

}

```

위와 같이 작성하면 알아서 라우팅이 이루어진다. 이 때, 반드시 export default를 통해 작성하여야한다는 점이 특징이다.



## 1-2. 동적 라우팅

만일 동일 페이지 아래 하위 페이지를 생성해야한다면 어떻게 할까? 예를 들어 /mainMenu/1, /mainMenu/2와 같이 말이다. 아래 코드를 보자.

```javascript

//sub/mainMenu.js
export default function mainMenu() {
	return (
		<div>
			<h1>메인메뉴</h1>
			<ul>
				<li><a href = "mainMenu/1">1번 상품</a></li>
				<li><a href = "mainMenu/2">2번 상품</a></li>
				<li><a href = "mainMenu/3">3번 상품</a></li>
			</ul>
			<a href = "/">홈으로</a>
		</div>
	)

}

```

기존에 알고있는 방법대로라면, 1.js, 2.js, 3.js ... 이런식으로 계속 생성해야하는걸까? 그렇지 않다. Next.js에서는 이 또한 컴포넌트 생성으로 라우팅을 진행할 수 있다. /1, /2, /3과 같이 일정한 숫자나 규칙, 값으로 하위 URL을 부여할 경우, 이들을 공통적으로 묶을 수 있다. 

위 코드를 예로 들자면, mainMenu 폴더를 생성한 뒤, 그 아래에 `[id].js`라는 컴포넌트를 생성한다. 그러면, mainMenu 컴포넌트 하위에 존재하는 /1, /2, /3 링크들이 자동으로 `[id].js` 컴포넌트로 라우팅된다.

```javascript
//sub/mainMenu/[id].js
import {useRouter} from 'next/router';

export default function id() {
	const router = useRouter();
	const id = router.query.id;

	return (
		<div>
			<h1>{id}번 상품</h1>
			<a href = "/">홈으로</a>
		</div>
	)

}
```

react-router-dom의 useParams()와 동일한 기능을 한다. 다만 useRouter는 next.js에서 자체적으로 제공한다는 점이 조금 다르다.  

useRoute를 선언하여 쿼리에 접근하여 컴포넌트 생성 시 작성했던 브라켓 내부의 이름을 입력한다. id라면 `router.query.id`를, key일 경우 `router.query.router`로 작성한다.

그렇게 받은 인자( 위 코드의 경우 id )를 컴포넌트 내에 활용할 수 있다.