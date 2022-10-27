
emotion은 styled-component와 마찬가지로, CSS-in-JS를 도와주는 리액트 라이브러리이다.  React 생태계에서 styled-components와 양대산맥을 이루는 대표적인 CSS-in-JS 라이브러리이다.

## 0. install

```bash

npm install @emotion/react;

```


## 1. styled in Emotion

emotion jsx를 사용하면 자체적으로 제공하는 css 속성 활용 시, 인라인 스타일로 css를 작성한다하더라도 자동으로 클래스 변환이 이루어져 스타일 우선순위, 재활용이 가능해지게 된다.

하지만 Styled-component에서 지원하는 styled 함수도 지원한다. style 함수를 사용하기 위해서는 아래와 같이 install 하여야 한다.

```bash

npm install @emotion/styled

```

사용법은 styled-components와 동일하다.

```javascript
import styled from '@emotion/styled';

const Button = styled.button`
	padding: 1rem 2rem;
	background-color: #000;
	color: #fff;
	font-size: 1.5rem;
`;

const App = () => {
	return (
		<Button>
			hello
		</Button>
	)
}

```


## 2. CSS

emotion에서 본래 적용할 수 있는 CSS-in-JS 스타일이다. styled 함수는 styled-component의 것을 그대로 가져온 것이다. 마찬가지로 styled-component에서도 emotion의 css 기능을 추가했다.

```javascript
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const divStyle = css`
	padding: 5rem;
	background-color: #000;
	color: #fff;
	font-size: 1.3rem;
`;

const App = () => {
	return (
		<div css={divStyle}>
			hello
		</div>
	)
}

```

emotion에서 css를 임포트하여 위와 같이 작성한다. emotion은 style-component와 마찬가지로 sass를 지원하기 때문에 자식요소에 대한 스타일도 지정할 수 있다. emotion은 styled-components와 마찬가지로 랜덤하게 클래스네임이 부여되기 때문에, 클래스네임 중복의 문제에서 벗어날 수 있다.


## 2-1. CSS 재사용

재사용이 가능한 CSS 코드도 작성가능하다.

```javascript
/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react';

const P = props => (
	<p 
		css={
			{
				padding: '10px 20px',
				fontSize: '15px',
			}
		}
		{...props}
	/>
)

const App = () => {
	return (
		<>
			<P>hello</P>
		</>
	)
}
```

재사용을 위한 CSS는, 컴포넌트처럼 생성할 수 있다는 점이 다른데, css를 객체형태와 같이 작성한다. 이 때, 객체 내부에서는 CSS를 작성하는 것과 같이 작성해서는 안되고, 세미콜론 대신 ','를,  property는 camelCase로 작성해야한다.

그리고 {...Props}는 컴포넌트 내부에 들어가는 텍스트 노드이다. 따라서 {...props}를 제거하면 App 컴포넌트의 hello가 출력되지 않는다.

CSS 재사용으로 활용한 컴포넌트에도 css 인라인을 작성할 수 있다.

```javascript

const App = () => {
	return (
		<>
			<P css={phaseStyle}>hello</P>
		</>
	)

}

```