# 1. Thunk with Redux-Toolkit


Redux에서 작성하는 리듀서 함수는 반드시 순수함수여야 한다. 이것은 React-Redux를 쓰든, Redux-Toolkit을 쓰든 모두 동일한 규칙이다. 그래서 API 호출, setTimeout과 같은 비동기로직은 리듀서 함수에서 작성할 수 없다. 순수함수의 규칙에 위배되기 때문이다.

React-Redux에서는 비동기 로직을 리듀서 함수에 넣을 수 없다. 액션생성함수에도 넣을 수 없다. 디스패치 또한 동기적으로 작동되기 때문에 API를 받아오는 것과 같이 비동기 로직을 넣을 방법이 없다. 사실 이것은 Redux-Toolkit도 마찬가지다. 리듀서 함수 내에 비동기 로직을 넣을 수 없으니까. 하지만 Redux-Toolkit은 가능하다. 미들웨어인 Thunk을 활용하면, 리듀서로 액션이 전달되기 직전에 어떠한 행위를 해줄 수 있는 중간처리과정을 삽입할 수 있기 때문이다.

미들웨어의 본 의미는, 서로 다른 소프트웨어 사이에서 통신할 수 있게 해주는 소프트웨어란 의미이다. 리액트 툴킷에서 미들웨어의 의미는, 액션과 리듀서 함수 사이에 중간처리과정을 설정할 수 있는 라이브러리와 같은 의미다.



## 2. createAsyncThunk

Thunk에서 지원하는 위 메소드를 활용하면 리덕스 툴킷 내에서 비동기 로직을 작성할 수 있다. 그리고 그 결과를 리듀서 함수 내에 전달받아 적절히 처리할 수 있다.

``` javascript
// dataSlice.js

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getData = createAsyncThunk(
	'dataSlice/getData',
	async () => {
		let data = await axios.get(url);
		return data;
	}
)
```

createAsyncThunk는 두 개의 인자를 받는다. 첫 번째 인자는 액션타입을, 두 번째 인자는 콜백함수로써 비동기 로직을 작성할 수 있다. 

이후, createAsyncThunk 를 위한 Reducer를 작성한다

```javascript

// dataSlice.js

const dataSlice = createSlice({
	name: 'dataSlice',
	initialState: {state:'welcome', data: []},
	reducers: {
		// ... 일반 Reducer
	},
	extraReducers: (builder) => {
		builder.addCase(getData.pending, (state,action) => {
			state.status = 'wait a minute';
		})
		builder.addCase(getData.fulfilled, (state, action) => {
			state.status = 'complete';
			state.data = action.payload.map((it,idx) => {
				return {
					// ... 데이터 처리
				}
			})
		})
		builder.addCase(getData.rejected, (state, action) => {
			state.status = 'failed';
		})
	}
	
})

export default dataSlice;
export {getData};
```

Thunk를 활용하여 작성한 함수는, extraReducers에 별도로 작성해주어야 한다. reducers와의 차이는, 액션생성함수를 자동으로 생성해주지 않는다는 점이다. 

또한 Thunk를 통해 작성된 함수에는 세 가지의 상태를 가진다. promise 객체가 상시 보유하고 있는 상태와도 동일한데, `pending`, `fulfilled`, `rejected`의 세 가지 상태를 가지며, 그 의미는 Promise 객체의 것과 동일하다. extraReducers 에서는 각 상태에 따라 처리해야 할 행위를 작성할 수 있으며, pending과 rejected의 경우 반드시 작성해주어야 하는 것은 아니다.

createAsyncThunk에서 return한 데이터는 action.payload로 받을 수 있다. 이를 활용하여 데이터를 처리하여 상태 변경을 시도하거나 특정 값을 return 할 수 있다.



## 3. dispatch 하기

dispatch 또한 일반적인 방법과 다르지 않다.

``` javascript

//App.js
import {useSelector, useDispatch} from 'react-redux';
import {getData} from './store/dataSlice';

const App = () => {
	const data = useSelector(state => state.data.data);
	const dispatch = useDispatch();
	
	return (
		<div>
			<button onClick = {() => (dispatch(getData()))}>CLICK</button>
			<ul>
				{data.map((it,idx) => {
					return (
						<li key = {idx}>{it}</li>
					)
				})}
			</ul>
		</div>
	
	)

}

```

만일, dispatch 시 여러 개의 데이터를 전달해야 하는 경우, 아래와 같이 작성하는 것이 좋다.

``` javascript

dispatch(getData({url, key, data}));

```

만일 하나의 객체로 감싸지 않을 경우, seriallize 할 수 없다며 오류를 뱉어낸다.