# useState

리액트에서 지속적으로 변경이 일어나야 하는 값을 관리하는 React Hook이다. useState를 이용하면 웹 페이지 내에 존재하는 값의 상태를 변경, 삭제, 추가 할 수 있다.

``` javascript

import { useState } from 'react';

const App = () => {

	const [num, setNum] = useState(5);
	
	return (
		<>
			...	
		</>
	)
}

```


useState로 선언된 변수는, 비구조 할당을 통해 선언한 값과, 그 값의 상태를 변경할 수 있는 함수(Setter 함수)를  함께 사용할 수 있다. useState의 변수로는 일반 숫자뿐만이 아니라, 문자열, 배열, 객체 심지어 함수까지도 사용될 수 있다.

상태관리를 위한 함수(setNum)은 간단한 식부터, 콜백함수까지 작성할 수 있다. setNum 함수 내에 작성하는 콜백 함수에서 이전 state의 값을 매개변수로 받을 수 있는데, 아래와 같다.

```javascript

const [num, setNum] = useState(5);

const Test = () => (
	setNum((prev) => (
		console.log(prev);
	))
}
```

prev 매개변수는 state의 이전값을 받는다. 만약 어떤 이벤트가 발생했을 시 num의 숫자가 1씩 증가하는 코드를 작성했다면, 위 코드의 prev에는 num+1 이 실행되기 이전의 값을 받을 수 있다.