# Redux-Toolkit Tutorial


Redux-Toolkit은 기존 React-Redux의 단점을 보완하여 좀 더 간편하게 Redux를 사용할 수 있게 개량된 최신버전의 Redux이다. 실제 React-redux 사용 중 createStore를 사용 시, 신버전(Redux-toolkit) 사용을 권하고 있다. 

React-redux 사용 자체만으로 컴포넌트 내의 수많은 Props 전달을 위한 코드를 제거할 수 있다는 장점이 있었다. 하지만 전역상태관리를 위해 작성해야하는 보일러 플레이트 코드를 알 필요가 있으며, 프로젝트 규모가 커지면 관리해야 할 Reducer도 많아진다. 이에 따라 반복적인 코드를 계속 작성한다는 또 다른 불편함이 생겼다.

이를 해결하기 위해 Redux-Toolkit이 사용된다. 이 외에도 기존 React-Redux에서 구현할 수 없는 다양한 코드들을 Redux-Toolkit에서 사용할 수 있다.



## 1. createSlice

createSlice를 Redux-Toolkit을 시작하는 중요한 문법이다. 기존 리덕스에서는 액션타입과 액션생성함수, 초기상태 그리고 리듀서 함수를 모두 따로 작성하였다. 물론 기능 별로 모듈화하여 하나의 리듀서 파일에 작성한다하더라도 액션타입 설정과 액션생성함수, 초기상태, 그리고 리듀서 함수 작성 총 세 가지의 보일러 플레이트 코드를 작성하여야 한다.

createSlice는 이러한 불편함을 최소화시켜준다. 리덕스 툴킷에서 지원하는 해당 생성자를 통해 액션타입, 액션생성함수, 초기상태, 리듀서를 한꺼번에 작성할 수 있다. 그 중 createSlice에서 자동으로 생성해주는 것들도 있다.

``` javascript
// countSlice.js
import {createSlice} from '@reduxjs/toolkit';

const countSlice = createSlice({
	name: 'countSlice',
	initialState: {value:0},
	reducers: {
		UP: (state, action) => {
			state.value = state.value + action.payload;
		}
		DOWN: (state, action) => {
			state.value = state.value - action.payload;
		}
	}
})

export default countSlice;
```


이렇게 생성된 slice들을 configureStore를 통해 export 할 수 있다. 



## 2. configureStore

기존 Redux에서는 모든 리듀서를 combine하여 RootReducer로 만든 다음, creatStore를 통해 store를 생성할 수 있었다. 하지만 리덕스 툴킷은 combineReducer를 생략할 수 있다. configureStore를 통해 여러 개의 slice에 등록된 리듀서를 한꺼번에 combine하여 곧바로 store에 등록할 수 있다.

```javascript
// store.js
import {configureStore} from '@reduxjs/toolkit';
import countSlice from './countSlice';

const store = configureStore({
	reducer: {
		count: countSlice.reducer
	}
})

export default store;
```

위와 같이 combineReducer 과정을 생략하고 슬라이스들을 모두 통합하여 곧바로 store로 등록한다. 위와 같이 등록한 store는 일반 리덕스를 사용하여 store를 임포트 하는 것과 동일하게 사용할 수 있다.

```javascript
//index.js
import { Provider } from '@reduxjs/toolkit';
import store from './store/store';

...

root.render(
	<Provider store = {store}>
		<App />
	</Provider>

)

```



## 3. state 사용 & dispatch하기

리덕스 툴킷을 통해 작성한 상태들을 일반 컴포넌트에서 받아올 수 있으며, 액션을 디스패치 하여 그 결과를 받아올 수도 있다.

```javascript

//App.js
import {useDispatch, useSelector} from 'react-redux';
import {UP, DOWN} from './store/countSlice';

const App = () => {
	const count = useSelector(state => state.count.value)
	const dispatch = useDispatch();
	
	return (
		<div>
			<button onClick = {() => (dispatch(UP(2)))}>+</button>
			<button onClick = {() => (dispatch(DOWN(2)))}>-</button>
			{count}
		</div>
	)
}

export default App;

```

일반 Redux와 사용법이 동일하다 useState를 통해 리듀서에 접근하여 상태를 가져오고, dispatch를 통해 리듀서를 실행시킨다. slice를 작성하였을 때 별도의 액션생성함수를 생성하지 않았는데, 리덕스 툴킷은 액션생성함수를 자동으로 생성해준다. 그래서 별도의 액션생성함수를 countSlice.js에서 작성하지 않았음에도 App.js에서 액션생성함수를 import하여 디스패치 할 수 있는 것이다. 다만 이 때, countSlice.js에서 주의하여야 할 점이 있다.

```javascript

// countSlice.js
import {createSlice} from '@reduxjs/toolkit';

const countSlice = createSlice({
	name: 'countSlice',
	initialState: {value:0},
	reducers: {
		UP: (state, action) => {
			state.value = state.value + action.payload;
		},
		DOWN: (state, action) => {
			state.value = state.value - action.payload;
		}
	}
})

export default countSlice;
export const {UP, DOWN} = countSlice.actions;

```

slice의 reducers 내부에 있는 액션생성함수들을 export 해주어야 한다. 

