
React의 Functional Component에서는 Hook을 사용할 수 있다. useState, useEffect, useRef와 같은.. 하지만 이외에도 사용자가 지정한 Hook을 사용할 수 있다. 이를 Custom Hook이라고 부른다. 별도의 컴포넌트에서 Custom Hook을 생성하여 사용하고자 하는 컴포넌트에서 import 하여 사용할 수 있다.

```javascript

import {useState} from 'react';

// usePlus.js
const usePlus = (num) => {
	const [num, setPlus] = useState(num);

	// ... 특정 로직

	return [num, setPlus];
}

export default usePlus;

```

위 코드는 custom Hook을 사용할 수 있는 전체적인 로직이다. useState를 예시로 사용하였지만, useEffect를 활용할 수도 있으며 다양한 Hook을 활용할 수 있다. 

위 코드는 인자로 받은 수를 useState에 담아 특정 로직을 수행한 뒤, 숫자와 setter 함수를 반환한다. 위 코드는 다른 컴포넌트에서 사용하고 싶다면 아래와 같이 사용하면 된다.

```javascript

//App.js
import usePlus from './usePlus';

const App = () => {
	const [num, setPlus] = usePlus(0);
	return (
		<div>
			...
		</div>
	)

}

```

사실 위 코드는 useState가 반환하는 것과 동일하다. 그렇지만 Custom Hook을 활용하면 다양한 변수를 받아, 이를 적절히 처리할 수 있다. 


## 1. Custom Hook과 UseCallback

Custom Hook을 작성할 때 주의할 점이 있다. 컴포넌트를 생성하진 않지만, state가 변경될 시 렌더링 된다는 점은 동일하게 적용된다. 따라서, Custom Hook을 작성하는 js 파일을 작성할 때에도, JSX 렌더링 컴포넌트를 작성하는 것과 동일하게, state에 따른 컴포넌트 변동성을 예의주시하여야 한다.
예를 들어 아래와 같은 코드는 무한 렌더링을 발생시킨다.

```javascript

//usePlus.js
const usePlus = (num) => {
	const [cnt, setPlus] = useState(num);

	const plusOne = (
		setPlus(prev => prev += 1);
	)

	return [cnt, plusOne];
}

export default usePlus;
```

`usePlus` 컴포넌트 내에서 `plusOne` 함수를 실행시키는 것은 아니지만, `App.js`에서 `usePlus`가 import 되고,  setPlus 함수로 인해 state가 자꾸 변경되어 무한 렌더링이 일어난다. 이를 방지하기 위해서는 useCallback을 사용하여야 한다.

```javascript

// usePlus.js
const usePlus = (num) => {
	const [cnt, setPlus] = useState(num);

	const plusOne = useCallback(() => {
		setPlus(prev => prev += 1);
	}, [])

	return [cnt, plusOne];
}

export default usePlus;

```

위와 같이 작성할 경우, useCallback을 통해 plusOne 함수가 참조하는 메모리 주소값이 state 변경에 따라 종속적으로 변동되지 않음으로 무한 렌더링을 일으키지 않게 된다.