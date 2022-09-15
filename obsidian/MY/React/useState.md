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


##  state는 컴포넌트 내에서 전역적이다


useState로 선언된 변수는 컴포넌트 내에서 전역적으로 사용될 수 있다. 아래 코드를 보자.

```javascript
import { useState } from "react";

const Test01 = ({ state, stateFunc }) => {
  const [bool, setBool] = useState(true);
  const stateHandler = (num, func) => {
    bool ? func(num + 1) : func(num - 1);
  }  

  return (
    <section className="test">
      <button 
	      onClick={() => (stateHandler(state, stateFunc))} 
	      style={{ display: 'block' }}>
        INCREASE
      </button>
      <button onClick={() => (setBool(!bool))}>
        FLAG CHANGE
      </button>
      <strong>{state}</strong>
    </section >
  )

```

`bool`  state의 경우, `stateHandler` 함수의 파라미터로 들어오지 않았음에도 함수 내부의 삼항연산자가 정상적으로 동작한다. 이는 useState로 선언된 state 변수는 컴포넌트 내에서 전역적으로 적용된다는 의미이다.


## useState는 비동기적이다


useState는 리액트 내에서 동적으로 변하는 값들을 관리해주는 유용한 Hook이다. 그렇지만,  state의 특징 때문에 조금 곤란한 부분이 있다.

useState는 비동기적으로 처리된다. 하나의 이벤트 핸들러 함수 내에서 같은 setter 함수가 실행되면, 마지막에 실행된 setter 함수가 실행되어 렌더링 된다. 아래 코드를 보자

```javascript

const App = () => {
	const [num, setNum] = useState(0);

	return (
		<>
			const numHandler = () => {
				setNum(num+1);
				setNum(num+2);
			}
			<button onClick = {() => (numHandler())}>Click</button>
			<strong>{num}</strong>
		</>
	)
}

```

