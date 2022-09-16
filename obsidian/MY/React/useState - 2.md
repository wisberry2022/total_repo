# useState 2 - 응용


useState에는 primitive type의 데이터들을 담을 수 있지만, 객체, 배열과 같은 type들의 데이터도 저장할 수 있다. useState에 배열을 선언하였을 때에, 이를 동적으로 관리하는 법에 대해 서술한다.


## 배열 선언


useState를 사용하여 배열을 선언하는 것은 간단하다. useState( )의 인자에 배열을 저장하면 된다.

```javascript
import { useState } from 'react';


const App = () => {
	const [arr, setArr] = useState([1,2,3,4,5]); // 배열 선언

	return (
		// ... App 함수 코드
	)
}
```


## 배열에 원소 추가하기


HTML에 arr 배열의 원소들을 리스트로 나열하고, 버튼을 누를 때마다 원소 끝 번호에 +1을 추가한 값을 새롭게 리스트에 추가하여 HTML에 출력시키는 코드를 작성해보았다. 아래 코드를 보자

```javascript

import { useState } from 'react';


const App = () => {
	const [arr, setArr] = useState([1,2,3,4,5]);
	const [num, setNum] = useState(arr[arr.length-1]+1);

	const arrHandler() => {
		setNum(num+1);
		setArr((prev) => (
			[...prev, num] 
		))
	}


	return (
		<div className = "container">
			<button onClick = {() => (arrHandler())}>ADD</button>
			<ul className = "arr_list">
				{
					arr.map((el, idx) => {
						return <li key = {idx}>{el}</li>
					})
				}
			</ul>
		</div>
	)
}
```

`num`  state는 항상 배열의 마지막 원소값을  참조하기 위해 선언하였다. ADD 버튼을 누를 때, `arrHandler`  함수가 실행되어 arr_list라는 ul 태그에 배열의 마지막 값에 +1을 한 숫자가 li 태그에 매핑되게 설정하였다. 

`arrHandler`의 `setArr` setter 함수를 보자. 함수형 업데이트를 통해 버튼을 누를 때마다 이전값을 받아와, spread 연산자를 통해 +1을 한 num과 함께 배열로 만들어준다. 그 결과, `arr`  state는 `[1,2,3,4,5,6]` 이 된다.


## 배열의 원소 삭제하기


배열의 원소를 추가하는 작업을 했다면, 이번에는 배열의 원소를 제거하는 작업을 추가할 것이다. delete라는 버튼을 하나 더 만들어, 버튼 클릭 시 배열의 마지막값을 제거하고 남은 배열을 화면에 출력한다. 아래 코드를 보자.

```javascript

import { useState } from 'react';


const App = () => {
	const [arr, setArr] = useState([1,2,3,4,5]);
	const [num, setNum] = useState(arr[arr.length-1]+1);

	const arrHandler() => {
		setNum(num+1);
		setArr((prev) => (
			[...prev, num] 
		))
	}

	const deleteHandler() => {
		setArr(arr.filter((it, idx, arr2) => idx < arr2.length-1))
	}

	return (
		<div className = "container">
			<button onClick = {() => (arrHandler())}>ADD</button>
			<button onClick = {() => (deleteHandler())}>DELETE</button>
			<ul className = "arr_list">
				{
					arr.map((el, idx) => {
						return <li key = {idx}>{el}</li>
					})
				}
			</ul>
		</div>
	)
}


```

`deleteHandler`  함수에서는 `arr` state에 filter를 사용하여 배열의 마지막 인덱스 이전까지의 값만 보존하도록 하였다. 이렇게 하면 배열의 마지막 값을 제거할 수 있다. `filter`  메소드는 배열을 순회하면서 각 원소에 콜백함수로 이루어진 테스트를 진행한다. 테스트의 결과가 `true`인 경우 원소 보존, `false`인 경우 배열에서 제거하여 테스트를 통과한 원소들로 이루어진 배열을 반환한다. `filter` 함수를 활용하면 useState로 선언한 배열을 삭제할 수 있다.