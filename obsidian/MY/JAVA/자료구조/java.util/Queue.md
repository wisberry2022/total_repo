
Queue는 java.util에서 사용할 수 있는 자료구조로써 선입선출이 가능한 자료구조이다. 먼저 삽입된 데이터가 먼저 나오는 형식이다. 자바에서 Queue는 Class가 아닌 interface이기 때문에 Queue 그 자체를 인스턴스로 생성할 수 없다.

```java

import java.util.*;

class Ex01 {
	public static void main(String[] args){
		Queue que;
		que = new LinkedList();
		que = new Queue(); // 선언 불가
	}
}

```

Queue는 interface이기 때문에 그 자체를 인스턴스화시켜 사용하는 것이 아닌, LinkedList에 덧붙여 사용할 수 있는 것이다. 따라서 생성자로써 Queue()가 아닌 LinkedList가 되는 것이다.

Queue의 기능은 크게 세가지로 구성되어있다. 큐의 최상단 데이터를 바라보는 기능과 맨 앞의 데이터를 꺼내는 기능, 그리고 데이터를 삽입하는 기능이 있다. 이 기능은 Queue Interface에 구현되어있으며, 예외가 발생하였을 때 어떻게 처리하였는지에 따라서 다른 메소드를 사용 할 수 있다.


| 기능 | method that throw exception | method that return special value |
| --- | --- | --- |
| Insert | add(e) | offer(e) |
| Remove | remove() | poll() |
| Examine | element() | peek() |


