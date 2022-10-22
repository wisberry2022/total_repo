# Event in React

리액트에서 이벤트를 다루는 방법은 바닐라 JS와는 다르다. 바닐라 JS에서는 DOM API를 통해 직접 HTML 요소에 접근하여 addEventListener라는 메소드를 사용하였지만, 리액트에서는 DOM API에 직접 접근하는 일이 없기에, 요소에 이벤트를 조작하기 위해서는 다른 방법이 필요하다.

리액트에서는 HTML 요소에 인라인으로 이벤트를 붙일 수 있다. 사실 이 것 말고 방법이 있는지 모르겠다. 바닐라 JS에서는 `document.querySelector('click', () => {})`과 같이 썼겠지만, 리액트에서는 아래와 같이 작성해야 한다.

``` javascript

const App = () => {
	return (
		<div className = "box">
			<button onClick = {() => (console.log('hello'))}>확인</button>
		</div>
	)
}

```


React에서 Event를 작성할 때 주의해야 할 점이 몇 가지가 있다. 그 사항은 아래와 같다.

- React의 Event는 DOM 요소에만 붙일 수 있다. 리액트 컴포넌트에는 이벤트를 추가할 수 없다.
- camelCase를 활용하여 이벤트를 작성한다  *onclick => onClick*



## 1. JSX에 Event 붙이기

Event를 붙일 때에는 상술한 것과 같이 작성하면 된다. 만일 이벤트 발생시 동작하는 로직을 JSX에 직접적으로 붙일 때는 상관없지만, 만일 기존에 만들어놓은 함수를 붙인다면, 주의해야할 점이 있다. 아래 코드를 보자.

```javascript

const App = () => {

	const testFunc() => {
		console.log('hello Event!');
	}

	return (
		<div>
			<button type = "button" onClick={() => (testFunc())}>확인</button>
		</div>
	)

}

```

위 코드는 기존에 작성한 함수를 이벤트로 등록하는 방법 중 가장 일반적인 방법이며, 표준이다. `testFunc`함수는 인자를 받지 않기 때문에, 아래와 같이 작성할 수도 있다.

```javascript

const App = () => {

	const testFunc() => {
		console.log('hello Event!');
	}

	return (
		<div>
			<button type = "button" onClick={testFunc)}>확인</button>
		</div>
	)
}

```

인자가 없기 때문에, arrow function을 작성하지않고 곧바로 함수명을 작성하여 이벤트로 등록할 수 있다.  하지만 만약 함수에 파라미터가 들어가야한다면 어떻게 해야할까?

```javascript

const App = () => {

	const testFunc(num1, num2) => {
		console.log('hello Event!', num1 + num2)
	}

	return (
		<div>
			<button type = "button" onClick={testFunc(1,2)}>확인</button>
		</div>
	)
}

```

인자가 없을 땐 함수명만 작성하였으니, 이번엔 인자를 포함하여 위와 같이 작성하면 될까? 결론은 '안된다'.  위와 같이 작성할 경우 버튼을 클릭하여도 함수가 제대로 동작하지 않는다. 개발자 도구를 열어 콘솔창을 열면 아무것도 클릭하지 않았는데 함수가 실행된 것을 확인할 수 있다. 

위와 같이 작성할 경우, 컴포넌트가 렌더링 될 때 이벤트로 등록한 함수가 곧바로 실행되어버린다. 상황에 따라선 컴포넌트가 무한 루프에 빠질 수도 있다. 만일 state를 변경하는 함수가 포함된 함수라면, 컴포넌트가 렌더링되었을 때 state 변경을 시도하는 함수가 실행된다. state 변경이 일어나면 컴포넌트는 재렌더링되고 컴포넌트가 렌더링됨에 따라 또 다시 state 변경 시도하는 함수가 실행되고... 

인자가 있는 함수의 경우 arrow function을 사용하여야 한다.

```javascript

const App = () => {

	const testFunc(num1, num2) => {
		console.log('hello Event!', num1 + num2)
	}

	return (
		<div>
			<button type = "button" onClick={() => (testFunc(1,2))}>확인</button>
		</div>
	)
}

```

인자를 받는 함수 중 예외적으로 이벤트 등록 시 arrow function을 작성하지 않아도 되는 경우가 있다.

``` javascript

const App = () => {

	const testFunc(e) => {
		e.preventDefault();
	}

	return (
		<div>
			<button type = "button" onClick={testFunc}>확인</button>
		</div>
	)

}
```

인자로 DOM 요소의 event 자체를 받는 함수라면, 인자를 표기하지 않고 이벤트에 그대로 등록할 수 있다. 위와 같은 형태의 함수는 컴포넌트 렌더링이 되어도 곧바로 실행되지 않고 버튼을 클릭하였을 때 함수가 실행된다.