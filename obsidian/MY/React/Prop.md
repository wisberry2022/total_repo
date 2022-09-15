# Props

React에서 Props는 Properties의 줄임말로써, 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용할 수 있는 React만의 개념이다. Props는 단방향 데이터 흐름을 가진다는 특징이 있다. Props를 사용하면 컴포넌트 내 사용해야 할 데이터를 상위 컴포넌트에 정의하여 컴포넌트 코드를 깔끔하게 정리할 수 있다는 장점이 있다. 


## Props로 Data 주고 받기 (1) - Basic


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


## Props로 Data 주고 받기 (2) - 함수 전달하기


Props를 이용하여 텍스트, 배열, 객체 배열들을 전달할 수 있지만, 함수 또한 전달할 수 있다. 아래와 같은 코드가 있다고 가정하자.

``` javascript
// Test01.js
const Test01 = ({ func }) => {
  return (
    <section className="test">
      <div onClick={() => (func())}>
        TEST
      </div>
    </section>
  )

}


// App.js
import Test01 from './Test01'; 

  
function App() {
  const tf = () => {
    console.log('hello');
  }

  return (
    <div className="App">
      <Test01 func={tf} />
    </div>
  );

}
```

App.js에서 선언한 tf 함수를, Test01 컴포넌트의 props으로 전달해주었다. Test01.js에서 비구조화 할당을 통해서 func를 받아오고, `div`의 이벤트로 tf 함수를 호출할 수 있다.  하지만 함수를 props를 통해 전달할 때에 아래와 같이 코드를 작성해서는 안된다.

```javascript
//App.js
import Test01 from './Test01'; 

  
function App() {
  const tf = () => {
    console.log('hello');
  }

  return (
    <div className="App">
      <Test01 func={tf()} />
    </div>
  );

}

```

func의 value로 tf()와 같이 실제 함수를 호출하는 형식을 넣으면 Test01 컴포넌트에서 전달받은 props 함수를 실행할 때에 문제가 생긴다. 함수에서 아무것도 반환하지 않았기 때문에 props의 value는 undefined가 된다. 만약, tf 함수에 return 값이 존재한다면 Test01 컴포넌트에 props로 전달할 때에 tf 함수의 return 값이 전달되게 된다.


## Props로 Data 주고 받기 (3) - useState와 함께 사용하기


useState를 통해 동적으로 값이 변경되는 state 변수도 props로 넘길 수 있다. 마찬가지로 상태 관리를 해주는 함수도 props로 전달할 수 있다. 아래 코드를 보자.

```javascript

//App.js
import { useState } from 'react';
import Test01 from './Test01';

function App() {
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <Test01 state={num} stateFunc={setNum} />
    </div>
  );
}

//Test01.js
const Test01 = ({ state, stateFunc }) => {
  const stateHandler = (num, func) => {
    func(num + 1);
    console.log(num)
  }

  return (
    <section className="test">
      <div onClick={() => (stateHandler(state, stateFunc))}>
        TEST
      </div>
    </section>
  )
}
```

`App.js`에서 선언한 useState를 Test01 컴포넌트에 props로 전달하였다. `Test01.js`에서 이를 props로 전달받아 div를 클릭할 때마다 state(num)이 1로 늘어나는 함수를 실행하고 그 결과를 `console`에 출력한다.


