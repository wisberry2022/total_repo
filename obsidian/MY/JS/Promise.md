# Promise


Promise는 JS에서 비동기를 적절히 처리할 수 있게 도와준다. Promise는 해당 프로세스가 작업을 수행하고 있는지, 수행 후 작업에 성공실패 여부를 알 수 있는 State(상태)와, 데이터를 제공하는 Producer와 생산한 데이터를 소비하는 Consumer의 차이를 아는 것이 중요하다

## State

Promise 객체가 반환하는 현재의 상태를 의미한다.

### pending

promise의 상태는 promise 생성 후 개발자가 지정한 연산이 수행 중일때를 의미한다.

### fulfilled

promise 객체가 연산에 성공했을 경우 반환하는 상태를 의미한다

### rejected

promise 객체가 연산에 실패하였을 경우 반환하는 상태를 의미한다.



## Promise 객체의 생성


### 1. Producer

```javascript

const promise = new Promise((resolve, reject)) => {
	console.log('doing something...');
}
```

promise 객체는 위와 같이 클래스 생성자를 통해 생성할 수 있다. resolve와 reject를 인자로 받을 수 있는데, resolve의 경우 데이터를 전달하는 함수이며, reject는 Promise 객체가 연산을 수행하지 못하였을 경우 실행하는 예외처리 코드라고 할 수 있다.

Promise 객체는 위와 같이 생성할 경우, 생성 동시에 콜백함수가 실행되기 때문에, 곧바로 코드를 실행해야 하는 경우가 아니라면 사용하지 않는다. 

```javascript

const promise = new Promise((resolve, reject) => {
	console.log('doing something...');
	setTimeout(() => {
		resolve('data');
	}, 2000)
})
```

setTimeout을 사용하여 promise 객체가 생성되고 2초 뒤에 resolve 콜백함수를 통해 'data'를 전달한다. 이는 Promise 객체를 생성하고 데이터를 실질적으로 제공하는 Producer의 역할인 것이다.


## 2. Consumer

```javascript
promise
	.then(value => console.log(value))
	.catch(error => console.log(error))
	.finally(() => console.log('end!'))
```

Producer에서 제공한 데이터는 위와 같은 형태로 가공할 수 있다.  Promise 객체 생성 시 resolve 콜백함수를 통해 전달했던 데이터를 Consumer 단계에서는, promise의 메소드인 then을 통해서 받을 수 있다. 

.catch 메소드를 통해 Promise 객체가 정상적으로 작업을 수행하지 못했을 때 동작할 수 있는 코드를 생성할 수 있다. Producer 단계에서 reject라는 함수를 사용하여 오류를 일으킨 것을, Consumer 단계에서 .catch 메소드를 통해 적절한 처리를 할 수 있다.

.finally 메소드는 Promise 객체의 작업 성공 여부에 상관없이 마지막에 반드시 실행되는 동작을 정의 할 수 있다.


## 3. Promise Chaining

``` javascript

const fetchNumber = new Promise((resolve, reject) => {
	setTimeout(() => resolve(1), 1000)
});

fetchNumber
	.then(num => num * 2)
	.then(num => num * 3)
	.then(num => {
		retrun new Promise((resolve, reject) => {
			setTimeout(() => resolve(num - 1), 1000)
		})
	})
	.then(num => console.log(num));
	
```


Promise 객체는 한 번 생성한 뒤, then 메소드를 활용하여 전달받은 값을 계속해서 가공한 뒤 또 다른 Promise 객체를 생성하여 데이터를 전달할 수 있다
