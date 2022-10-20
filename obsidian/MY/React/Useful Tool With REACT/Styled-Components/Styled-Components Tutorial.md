# Styled-Components

Styled-Components는 리액트에서 제공하는 라이브러리로, CSS in JS를 위한 라이브러리다. CSS 파일을 별도로 작성하지 않고 컴포넌트 내에서 CSS를 작성하여 이를 바로 컴포넌트에 적용할 수 있다. Styled-Components를 활용하면, 일반적인 CSS를 작성하였을 때 발생하는 className 중복 문제로부터 벗어날 수 있다. CSS를 통한 class 선언 없이 component에 css를 직접 장착하는 방식을 사용하면 각 components간의 중복이 발생할 필요도 없고, 따라서 class 이름이 중복되는 일도 막을 수 있다.



## 1. 설치방법

```bash

npm install styled-components

```



## 2. 사용법

기본 사용법은 아래와 같다.

```javascript
import styled from 'styled-components';

let StyledDiv = styled.div`
	border: 1px solid #ddd;
	background-color: #d9d9d9;
`;

```

styled의 속성으로 작성하는 요소는 실제 존재하는 HTML 태그를 작성해야한다. 그리고 그 뒤에 반드시 백틱을 사용하여 내부에 CSS 코드를 작성하도록 한다.

```javascript

const App = () => {
	return (
		<StyledDiv>
			helllo
		</StyledDiv>
	)

}

```

주의해야 할 점은, styled-components를 활용하여 HTML 요소를 생성하는 것 역시 React-Component를 생성하는 것이므로, 변수의 이름 또한 대문자로 시작해야한다(StyledDiv(O) / styledDiv(x))


### 2-1. Props 전달

Styled-Component로 생성한 컴포넌트는 일반 컴포넌트와 마찬가지로 props 전달이 가능하다. props로 CSS 요소를 전달받기 위해서는 아래와 같이 사용할 수 있다.

```javascript

let StyledTitle = styled.h1`
	width: ${props => props.width};
	font-size: ${props => props.fontSize};
`;

```

위 코드를 보면, 일반적인 Component와 동일하게 props는 객체의 형태로 전달됨을 알 수 있다. prop을 설정하면, 하위 컴포넌트(StyledTitle)에서는 전달받은 prop을 key로 받을 수 있다.


### 2-2. Extending Styles


기존에 존재하는 Styled-component를 바탕으로 디자인을 확장할 수 있다. 기존에 선언된 Styled-Component를 Styled-component로 다시 선언한다.

```javascript

import * as Styled from './Styled';

const CustomDiv = styled(Styled.GreatDiv)`
	background-color: ${props => props.color || '10rem 0'};
`;


```

보통의 Styled-Component의 경우 styled.<HTML Tag> 와 같은 형태로 사용하나, Extend의 경우 괄호를 사용한다.