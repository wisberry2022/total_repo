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

