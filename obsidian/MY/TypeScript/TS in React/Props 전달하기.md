
# TypeScript로 Props 전달하기



## 1. 일반 변수 전달하기

TS + React 조합에서, 하위 컴포넌트에 Props를 전달하기 위해서는 Props에 Type을 지정해주어야 한다. 아래 코드를 보자.

```typescript

const App = ({num}) => {
	return (
		<div>
			<strong>{num}</strong>
		</div>
	)
}

```

일반 JS에서는 위와 같이 전달해도 무리가 없지만, TS에서는 App 컴포넌트에 들어오는 Props에도 하나하나 Type을 지정해주어야한다. 

``` typescript

type userProps = {
	num: number;
}

const App = ({num}:userProps) => {
	return (
		<div>
			<strong>{num}</strong>
		</div>
	)

}

```

`userProps`라는 type을 지정하여 props로 전달받을 데이터의 타입을 지정할 수 있다.


## 2. 함수 전달하기

props로 함수를 전달할 때에는 아래와 같이 작성하면 된다.

```typescript

type userProps = {
	num: number;
	setNum: (x:number) => void
}

const App = ({num, setNum}:userProps) => {
	return (
		<div onClick = {() => (setNum(num+1))}>
			<strong>{num}</strong>
		</div>
	)
}

```