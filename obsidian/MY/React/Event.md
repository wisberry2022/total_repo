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
- 


