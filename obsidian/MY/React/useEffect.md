# useEffect


## 1. useEffect 란?

useEffect는 React가 화면을 렌더링하고 난 뒤 동작해야 하는 일부 동작을 설정할 수 있도록 해준다. 변형, 구독, 타이머와 같은 부작용(side-effect)을 함수형 컴포넌트 내부에 사용할 수 있도록 도와준다. 

```javascript
import { useEffect } from 'react';

const App = () => {
	useEffect(() => {
		// side Effect		
	}, [])

	return (
		<>
			...
		</>
	)
}
```

useEffect는 컴포넌트 내부의 top level에서 작성할 수 있다. 


## 2. useEffect의 clean-up

useEffect가 실행되었다는 것은, 리액트가 DOM을 완전히 구성했음을 보장해준다. 이 말은, useEffect는 화면이 완전히 렌더링되고 난 뒤에 최초로 실행된다는 의미다. useEffect를 사용하면  렌더링 이후 최초로 실행해야하는 작업을 설정할 수 있다. 하지만 그 반대도 가능하다. 컴포넌트가 언마운트 되었을 때 컴포넌트 내부의 state를 특정 값으로 초기화 시킨다던지, 리소스를 잡아먹지 않도록 하는 어떤 행위를 동작시킬 수 있다.

useEffect에서 컴포넌트가 언마운트 되었을 때 정리하는 것을 `Clean-up`이라고 한다. clean-up 함수는 아래와 같이 작성할 수 있다.

```javascript

useEffect(() => {
	return () => {
		// Logic for clean-up in react
	}
}, [])
```

비어있는 의존성 배열과, useEffect 내부에 들어가는 콜백 함수의 return을 활용하여 clean-up 함수를 작성할 수 있다.
