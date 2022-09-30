# Import와 Export


ES6에서는 Common JS에서 사용되는 모듈 수/출입 키워드인 module.exports 대신에 새로운 키워드를 도입했다. `Import`와 `Export`를 통해 JS로 작성한 파일 중 일부 함수나 변수, 클래스 등을 수출할 수 있다. 이 새로운 키워드들을 사용하면 버전 및 상태관리에 용이하고 모듈 내에서  사용하고자 하는 요소들만 선택하여 가져올 수 있기 때문에 성능과 메모리 점유 부분에서 이점이 있다.

Import 키워드와 Export 키워드를 사용할 때 몇 가지 지켜야 하는 사항이 있다. 우선 export코드부터 보도록 하자.


## 1. Export

``` javascript

const a = 10;
	  
export { a };
export const b = 20;
export default function Test() {
	console.log('hello');
}

```

export의 경우, 일정한 규칙이 있다. `export` 단독 사용 시 중괄호를 반드시 사용하여야 한다. 그렇지 않을 경우 오류가 발생한다.  

`export`를 사용한 수출은 다양한 형태를 제공하는데, 중괄호를 사용하면 여러개의 변수 및 함수, 클래스 등을 수출할 수 있다.  

``` javascript

const a = 10;
const b = 20;
const c = 30;

export { a, b, c };
```

`export` 키워드 바로 옆에 함수, 클래스, 변수를 선언하여 수출 할 수도 있다.

```javascript

export const b = 20;
export const test = (a,b) => {return a+b}

```

`export`를 활용하여 작성된 모듈 내에서 기본값으로 수출되는 요소를 지정할 수도 있다. 이 때 사용되는 키워드가 `default`이다.

```javascript

export default function test(a, b) {
	return a + b;
}

```

`default` 키워드는 단 한 번만 사용할 수 있으며, 2개 이상 사용 시 오류가 발생한다. 


## 2. Import

`export`를 통해 요소들을 수출했다면 다른 모듈에서 `export`한 요소들을 불러들일 수 있다. `import`은 이를 위한 키워드이다. `import`는 `export`의 형태에 따라 다르게 선언할 수 있다.

### 2-1. 반드시 중괄호를 사용하여 Import 해야 할 경우

``` javascript
// Output.js
let a = 10;

export { a };

// Input.js

import { a } from './Output';
```

중괄호로 export한 요소는 import 시에도 중괄호로 감싸주어 import 해야한다. 중괄호를 사용하지 않는다면 오류가 발생한다. 만약, 중괄호에 여러 요소를 export하였다면 import 시에도 사용하고자 하는 요소들을 추가하여 import 할 수 있다.

```javascript

// Output.js
export const const b = 10;

// Input.js
import { b } from './Output' 

```

`export` 키워드 바로 옆에 변수/클래스/함수를 선언한 경우, Import 할 때에도 중괄호를 사용하여야 한다.

### 2-2. `export default`를 사용하여 수출한 경우

`export default`를 사용하여 수출한 경우에는 ,  중괄호 없이 Import해야 한다. 만일 중괄호를 써준다면 오류가 난다.

``` javascript

// Output.js
export default const a = 10;

// Input.js
import a from './Output'
```

`export default`를 사용하여 수출한 경우, 위와 같이 Import 할 수 있다.
