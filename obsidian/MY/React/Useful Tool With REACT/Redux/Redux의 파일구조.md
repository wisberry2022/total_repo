# Redux의 파일구조


Redux는 효율적인 상태관리를 위해 프로젝트 내에 별도의 폴더를 생성한다. Redux 뿐만 아니라, Redux와 연계된 컴포넌트들과 그렇지 않은 컴포넌트들을 분리하여 관리하는 것이 Redux를 더욱 효율적으로 사용할 수 있게 해준다.


## Container Component & Presentational Component

### Container Component

리덕스와 연동된 컴포넌트를 의미한다.

### Presentational Component

뷰만을 보여주기 위하여 만들어진 컴포넌트


## Code Splitting

코드 분할(Code Splitting)이라고 하는데, 코드 분할은 스크립트를 하나의 큰 파일로 로드하는 대신 더 작은 부분으로 나누고 해당 페이지에 필요한 것만 로드하는 기술이다. 프로젝트 내에 존재하는 컴포넌트 파일(.js)들을 기능별로 구분하여 여러개의 폴더로 나누어 관리하는 것이라고 할 수 있다. 예를 들어 Redux를 도입한 리액트 프로젝트의 `src`폴더 내부를, `actions`, `reducers`, `store`, `components`, `pages`  폴더로 분할 할 수 있다.

이 때, `component` 폴더는 Presentational Component로, `page` 폴더는 Container Component들을 넣는 것이다.


## Store 폴더 구조

Redux를 도입하게 되면, 리액트 프로젝트 내에 Redux를 위한 폴더를 별도로 생성하게 된다.  보통 store라고 이름 짓는데, store라는 폴더를 만들었다면 하위 파일의 구조는 다음과 같이 설정할 수 있다.

 - store
	 - modules
		 - module_01.js
		 - module_02.js
		 - index.js
	- configure.js
	- index.js
	- actionCreators.js

위 폴더구조의 경우, `action`과 `reducer`를 기능별로 분류하여 하나의 파일에 작성하게 되는데 이를 `module`이라고 부른다.


### modules/index.js

`store/modules/index.js`는 module 폴더 내에 생성한 `reducer`들을 합병해주는 파일이다. 여러 개의 Reducer를 생성했을 경우 이를 `combineReducers`를 사용하여 하나의 Reducer로 합병해줘야 한다. 이렇게 합쳐진 Reducer를 `Root Reducer`라고 부른다.

``` javascript
// src/modules/index.js

import { combineReducers } from 'redux';
import module_01 from './module_01';

export default combineReducers({
	module_01
})

```

### configure.js

`configure.js`는 Redux Store를 생성하는 함수를 모듈화하여 내보낸다.  이는 하나의 어플리케이션에 하나의 스토어라는 원칙의 예외를 둔 상황을 대비하기 위함이다. 만일 서버사이드 렌더링을 하게 된다면 서버 측 요청에 따라 다른 스토어를 생성해야 할 경우가 생긴다. 이런 상황이 발생하였을 때 스토어를 생성하는 함수를 모듈화하여 관리한다.

``` javascript

// src/store/configure.js
import {createStore} from 'redux';
import modules from './modules';

const configure = () => {
	const store = createStore(modules);
	return store;
}

export default configure;
```

### store/index.js

`store/index.js`는  스토어를 생성한 다음 내보내주는 역할을 한다. `configure.js` 함수에서 만들어주었던 `configure`  함수를 사용하여 스토어를 만들고, 내보내준다.

``` javascript

import configure from './configure';

export default configure();
```

`actionCreators.js`에서는 스토어를 불러오고, 각 모듈들에서 선언했던 액션 생성함수들을 불러와서 store의 dispatch와 바인딩 작업을 진행해준다.


## React App에 Redux 적용하기

리액트 앱에 Redux를 적용할 때에는, react-redux에 들어있는 Provider를 사용한다. 

``` javascript

//src/Root.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

const Root = () => {
	return (
		<Provider store = {store}>
			<App />
		</Provider>
	)
}

export default Root
```


## 정리

Redux를 제대로 활용하기 위해서는 Action과 Reducer에 대한 이해와 그리고 이것들을 작성하여 모듈화하여 하나로 합치는 과정, 이후 store로 불러들여 다른 컴포넌트에서 store의 state를 가지고 와 dispatch로 state를 변경하는 법에 대한 이해가 있어야 한다.

### Action과 Reducer 작성

state 변경을 위한 명세인 Action과, state를 직접 변경하는 함수인 Reducer는 기능별로 묶어 하나의 모듈로 생성한다. 만약 숫자를 증가하고 감소하는 컴포넌트를 계획했다면, 해당 컴포넌트에서 사용하는 state를 관리할 Action,Reducer 함수를 `counter.js`라는 모듈에 정리한다. 컴포넌트 개수가 늘어나고, 관리해야 하는 state가 늘어난다면 `counter.js` 외에도 각 컴포넌트에 해당하는 Action과 Reducer를 포함하는 모듈들은 만들고, 이후 여러개로 분할된 Reducer 모듈들을 하나로 합쳐 `RootReducer`로 `export`해야한다.

## Store 생성

이렇게 생성된 `RootReducer`, 혹은 단일 `Reducer`는 `store` API를 통해 어느 컴포넌트에서든지 state를 불러 올 수 있는 store로 변환된다. 그리고 `react-redux`에서 지원하는 `Provider` API를 통해 store를 사용할 컴포넌트에 props로 전달해줄 수 있다.

``` javascript

//App.js
import Counter from './components/Counter';
import Reducer from './store/modules/counterReducer';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(Reducer);

function App() {
	return (
		<div className = "App">
			<Provider store = {store}>
				<Counter />
			<Provider />
		</div>
	
	)
}

```

`Counter` 컴포넌트에 포함된 하위 컴포넌트에서는 자유롭게 store를 불러올 수 있다. 

## State 불러오기 / 변경

state를 불러오기 위해서는 Redux에서 제공하는 전용 Hook을 사용해야 한다. 전용 Hook을 통해 개발자가 작성한 Reducer들 중 원하는 Reducer를 선택하여 state를 끌고 올 수 있으며, dispatch를 통해 Action을 전달하여 state 변경을 시도할 수 있다.

Reducer 모듈의 state를 가져올 수 있는 Hook은 `useSelector`, Dispatch를 할 수 있는 Hook은 `useDispatch`이다.

### useSelector

```javascript

// Counter.js
import {useSelector} from 'react-redux';

const Counter = () => {
	return (
		const number = useSelector(state => state)
	)
	
}
```

useSelector의 인자인 `state`는 store.getState()가 반환하는 값과 동일하다. 만약, 사용자가 여러 개의 Reducer를 작성했다면, state 뒤에 사용자가 작성한 Reducer의 모듈이름을 적어주면 해당 Reducer에서 선언한 state를 불러올 수 있다.

### useDispatch

```javascript

//Counter.js
import {useDispatch} from 'react-redux';
import {numberUp, numberDown} from '../store/modules/counterReducer';

const Counter = () => {

	const dispatch = useDispatch();

	const increase = () => dispatch(numberUp());
	const decrease = () => dispatch(numberDown());
	
	return (
		<>
			...
		</>
	)
}
```

useDispatch를 dispatch라는 변수에 담아서 사용한다. 그리고 reducer 모듈에서 가지고 온 액션 생성 함수들을, dispatch를 통해 별도의 함수를 생성한다. 

## State 전달

만일, 프레젠테셔널 컴포넌트와 컨테이너 컴포넌트를 분리하여 프로젝트를 설계했다면, 컨테이너 컴포넌트에서 프레젠테셔널 컴포넌트를 불러와 Redux를 통해 불러온 state와 dispatch 함수들을 프레젠테셔널 컴포넌트로 전달해야 한다.

아래 코드는 컨테이너 컴포넌트인 Counter.js와 프레젠테셔널 컴포넌트인 CounterPage.js의 코드이다.

```javascript

// Counter.js
import CounterPage from '../pages/CounterPage';
import { useSelector, useDispatch } from 'react-redux';
import { numberUp, numberDown } from '../store/modules/counterReducer';

const Counter = () => {

  const number = useSelector(state => state);
  
  const dispatch = useDispatch();
  
  const increase = () => dispatch(numberUp());
  const decrease = () => dispatch(numberDown());

  return (
    <>
      {console.log(number)}
      <CounterPage
        state={number}
        numberUp={increase}
        numberDown={decrease}
      />
    </>
  )
}

export default Counter;
```

```javascript

// CounterPage.js
const CounterPage = ({ state, numberUp, numberDown }) => {

  return (
    <div className="btnBox">
      <button onClick={numberUp}>UP</button>
      <button onClick={numberDown}>DOWN</button>
      <h1>{state}</h1>
    </div>
  )
}

export default CounterPage;

```