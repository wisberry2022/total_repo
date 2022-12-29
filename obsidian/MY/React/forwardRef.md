# forwardRef


리액트에서는 직접 DOM을 선택하는 것은 권장되지 않지만, 가끔은 직접 DOM을 선택하여 처리를 해주어야 하는 경우가 있다. 이를 위해 useRef라는 Hook을 사용할 수 있다. 아래는 useRef를 사용하여 DOM에 직접 접근하는 코드이다.

```javascript

//App.js
import {useRef} from 'react';

const Test = () => {
	const nameRef = useRef();
	
	return (
		<div>
			<form>
				<input type = "text" ref = {nameRef} />
				<button type = "submit"></button>
			</form>
		</div>
	)
}


```

input 태그에 nameRef를 참조하게 하여 특정 이벤트 발생 시, 혹은 함수 실행 시 input 태그의 값을 가져오거나 어떤 행위를 추가할 수 있다. 이것이 useRef()를 통해 직접 DOM에 접근하는 방식이다. 그렇다면 아래 코드를 보자.

```javascript

//App.js
import {useRef} from 'react';

const Test = () => {
	const nameRef = useRef();
	
	return (
		<div>
			<FormBox ref = {nameRef} />
		</div>
	)
}

```

위 코드는 작동할까? 결론은 아니다. ref는 컴포넌트에는 작성할 수 없다. 위처럼 작성하면 FormBox 컴포넌트는 prop으로 인식하는데, prop으로 받았다 하더라도 해당 컴포넌트에서 사용할 수 없다. 컴포넌트에 접근하고 싶은데... 정녕 useRef를 사용할 방법이 없단 말인가?

이를 위해 사용할 수 있는 것이 `forwardRef`이다. 참조할 컴포넌트 함수를 forwardRef로 감싸주면 ref를 props로 전달받을 수 있다. 아래는 forwardRef를 사용한 코드이다.

```javascript
//App.js
import {forwardRef, userRef} from 'react';

//FormBox 컴포넌트
const FormBox = forwardRef((props, ref) => {
	return (
		<>
			<input type = {`${props.type}`} placeholder = {${props.placeholder} 
            을 입력해주세요!} ref = {ref} />
			<button type = "submit"></button>
		</>
	)
})

//Test 컴포넌트
const Test = () => {
	const nameRef = useRef();

	return (
		<div>
			<FormBox type = {"text"} placeholder = {"이름"} ref = {nameRef}/>
		</div>
	)
}

```

ref를 받는 컴포넌트에는 forwardRef로 감싸주고, ref를 전달하는 컴포넌트에서는 HTML 태그에 ref를 설정하는 것과 동일하게 작성하면 된다. 하지만 주의할 점이 있는데, forwardRef를 통해 ref를 전달받는 컴포넌트는 props와 ref로 반드시 두 개의 인자만을 받을 수 있다. 아래와 같은 코드를 작성할 시 오류가 발생한다.

```javascript

//App.js
import {forwardRef, userRef} from 'react';

//FormBox 컴포넌트
const FormBox = forwardRef(({type, placeholder, ref}) => {
	return (
		<>
			<input type = {`${props.type}``} ref = {ref} />
			<button type = "submit"></button>
		</>
	)
})


```

위 처럼 인자를 받는 레벨에서 바로 비구조할당을 사용할 시 오류가 발생한다. props로 받아 key에 접근하여 사용하던지, 함수 내부에서 비구조할당을 사용하여야 한다.