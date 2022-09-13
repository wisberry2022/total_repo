# Props

React에서 Props는 Properties의 줄임말로써, 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용할 수 있는 React만의 개념이다. Props는 단방향 데이터 흐름을 가진다는 특징이 있다. Props를 사용하면 컴포넌트 내 사용해야 할 데이터를 상위 컴포넌트에 정의하여 컴포넌트 코드를 깔끔하게 정리할 수 있다는 장점이 있다. 

``` javascript

// App.js
const App = () => {

	return (
		<div className = "box">
			<Header name = "JIYOON" /> // Header 컴포넌트에 name을 props로 전달한다.
		</div>
	)
}

```

위와 같이 컴포넌트에 key와 value로 이루어진 데이터를 props로 전달할 수 있다. App 컴포넌트에서 위와 같이 선언하였다면, Header 컴포넌트에서는 아래와 같이 props를 전달받을 수 있다.

``` javascript
//Header.js
const Header = (props) => {

	return (
		<div className = "sub_box">
			<h3>{props.name}</h3>
		</div>
	)
}
```

자식 컴포넌트에는 렌더링 함수의 변수로 props를 선언하고, return 내부에 `{ }`를 활용하여 props 데이터를 활용할 수 있다. 부모 컴포넌트에서 전달한 props(name과 'JIYOON')는 자식 컴포넌트에서는 name과 JIYOON이 key와 value로 가진 Object 타입으로 들어오게 된다. 그래서 App.js에서 전달한 name을 Header.js에서 사용하기 위해서는 `props.name`과 같이 Object를 사용하는 것처럼 접근해야 한다. 

``` javascript

// App.js
const App = () => {

	return (
		<div className = "box">
			<Header name = "JIYOON" age = "21" /> 
			// Header 컴포넌트에 name을 props로 전달한다.
		</div>
	)
}

// Header.js
const Header = (props) => {

	const {name, age} = props;
	
	return (
		<div className = "sub_box">
			<h3>{name}</h3>
			<span>{age}</span>
		</div>
	)
}
```

props는 Object 타입으로 전달되기 때문에 비구조화 할당을 통해 props의 key에 직접 접근하지 않고도 value를 가져올 수 있다.  매개변수를 받을 때부터 비구조화 할당을 진행할 수 있다.

```javascript

const Header = ({name, age}) => {	
	return (
		<div className = "sub_box">
			<h3>{name}</h3>
			<span>{age}</span>
		</div>
	)
}

```

비구조화 할당 사용 시, 실제 props에 지정된 key값을 선언하여야 한다. 만약 name, age가 아닌 name2, myage와 같이 선언했다면 props에는 undefined값이 지정된다. 굳이 새로운 변수명을 사용하고 싶다면 아래와 같이 사용하면 된다.

``` javascript
const Header = ({name:myName, age:myAge}) => {	
	return (
		<div className = "sub_box">
			<h3>{myName}</h3>
			<span>{myAge}</span>
		</div>
	)
}
```
