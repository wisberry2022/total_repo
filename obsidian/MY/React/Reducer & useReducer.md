# Reducer


`reducer`란, 현재 상태와 액션 객체를 파라미터로 받아와 새로운 상태를 반환해주는 함수이다.  주로 리덕스나, useReducer Hook을 사용할 때 많이 사용하는 함수로, state의 수정방법을 미리 정의하는 함수로써 사용된다. state 초기값과 데이터 수정방법을 인자로 받는다. 즉, state의 이전 상태와 Action을 합쳐, 새로운 state를 만드는 조작을 할 수 있는 것이다.

```javascript
function reducer(state, action) {
	// 새로운 상태를 만드는 로직
	// const nextState = ...
	return nextState;
}
```

`reducer`에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다. `action`은 업데이트를 위한 정보를 가지고 있는데, 주로 `type`값을 지닌 객체 형태로 사용하지만, 따라야 할 규칙은 없다.


# useReducer


`useReducer`는 `useState`를 대체할 수 있는 함수로써, 복잡한 상태관리를 위한 `reducer`를 사용할 수 있다.  useReducer의 사용 목적은 상태 업데이트 로직과 컴포넌트의 분리이다. state가 많아질 수록 컴포넌트 내부의 코드도 복잡하게 되고 그에 따른 state 관리도 힘들어진다. 

useReducer 사용을 위해서는 `action`과  `dispatch`  개념이 새롭게 추가되었기 때문에 이에 대한 이해가 선행되어야 한다

## action

useReducer에서 action은 업데이트를 위한 정보를 가지고 있는데, state가 변경될 동작의 유형을 담고 있다고 이해하면 편하다.  `action`은 state 변경을 위한 일종의 명세서라고 설명 할 수 있는데, `action`는 객체로 표현될 수 있으며 `dispatch`를 통해 `reducer` 함수로 전달된다.

## dispatch

dispatch의 경우, `useState`의 `setter`함수와 동일한 역할을 한다. 다만, dispatch는 state를 변경하기 위한 명세, `action`을 전달한다. state의 변경은 dispatch를 통해 action과 함께 reducer 함수로 전달된 뒤에 이루어진다.


## 사용법


```javascript

import { useReducer } from 'react';

...

const [data, dispatch] = useReducer(reducer, initialState);

```

`useState`와 선언방식이 유사하다. state를 의미하는 data와, action을 전달해줄 함수 `dispatch`, 그리고 `useReducer`를 통해 `state`를 변경하는 함수인 `reducer` 함수와 `state`의 초기값인 `initialState`를 인자로 받는다. 여기서 `initialState`는 숫자가 될 수도 있으며 객체 배열일수도 있다. 0을 넣어도 되고, 배열을 넣어도 된다.


### reducer 함수


Reducer 함수는 상술한 형태로 작성해야 한다. state와 action을 인자로 받을 수 있으며, 이 함수의 역할은 현재 상태와 액션 객체를 파라미터로 받아와 새로운 상태를 반환해준다. reducer 함수를 작성할 때는 아래와 같은 사항을 반드시 준수하여야 한다.

- 인자로 받은 state는 불변성을 지켜야한다.
	- state가 삽입, 수정, 삭제와 같은 상태변경이 발생하더라도 state가 가지고 있던 이전값들은 그대로 보존하고 있어야 한다
- reducer 함수는 순수함수여야 한다
	- 동일한 인자가 주어졌을 때 항상 동일한 결과를 반환하며 외부의 상태를 변경하지 않아야 한다.

아래는 reducer 함수를 구현한 코드이다.

``` javascript

const Reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_DATA':
			return state += 1;
		case 'DELETE_DATA':
			return state -= 1;
		default: 
			return state;
	}
}

```

switch문을 사용하여 `action`의 type을 검사하여 각 조건에 해당하는 state를 반환한다. action은 어떻게 전달할 수 있을까?

``` javascript

const App = () => {
	const [num, dispatch] = useReducer(Reducer, 5);

	const addNum = () => {
		dispatch({type: 'ADD_DATA'});
	}

	const deleteNum = () => {
		dispatch({type: 'DELETE_DATA'});
	}
	
	return (
		<div>
			<h1>{num}</h1>
			<button onClick = {() => (addNum())}>+1</button>
			<button onClick = {() => (deleteNum())}>-1</button>
		</div>
	)
}

```

`dispatch`를 통해 `action`객체를 생성하여 `Reducer`  함수에 전달할 수 있다. `action`객체는 기본적으로 state 변경 동작인 type을 선언하여 전달하여야 한다. 관습적으로 대문자를 사용하여 입력하고 어절간 의미구분은 언더바로 이루어진다. 정해진 규칙은 아니므로 사용자 입맛에 맞게 구성하면 된다.

위와 같이 작성된 코드는 `useState`를 통해 작성한 상태 관리/변경과 동일한 기능을 가지고 있다. 


# useReducer를 사용하는 이유


`useReducer`와 `useState`는 상태 관리/변경을 위한 Hook이다. 동일한 기능을 구현할 수 있다면 어떤 상황에 어떤 것을 써야 할까?

1. useState를 사용해야 하는 경우
	1. 관리해야 할 state가 1개일 경우
	2. state가 단순한 숫자, 문자열 또는 Boolean 값일 경우

2. useReducer를 사용해야 하는 경우
	1. 관리해야 할 state가 1개 이상, 복수일 경우
	2. 현재는 단일 state값만 관리하지만, 추후 state의 구조가 복잡해질 가능성이 있는 경우
	3. 스케일이 큰 프로젝트의 경우