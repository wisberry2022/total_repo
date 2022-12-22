

ArrayList는 자바에서 제공하는, 배열과 비슷한 자료구조이다. 하지만 기존 배열보다 편리한 기능을 많이 가지고 있다.  형태는 배열과 비슷하며 그 기능 또한 유사하다. 배열과 ArrayList의 차이점을 꼽으라면 아래와 같다.

1. ArrayList는 동적 크기를 가진다.
	- 일반 배열의 경우, 크기가 정해져있어 선언 시 지정해두었던 size 이상의 값을 담을 수는 없지만, ArrayList는 크기가 정해져있지 않다.
2. ArrayList는 Array에 비해 속도가 느리다.
	-  일반 배열은 초기화 시 곧바로 메모리에 값들이 할당되기 때문에 ArrayList보다 빠르다.
	-  ArrayList는 데이터 추가 및 삭제 시 메모리를 재할당하기 때문에 속도가 Array보다 느리다.
3. ArrayList는 다차원 배열이 불가능하다.
	-  일반 배열은 2차원, 3차원 배열을 생성할 수 있으나, ArrayList의 경우 다차원 배열을 제작할 수 없다.
4. ArrayList에 삽입되는 데이터의 자료형은 Object타입이다.
	- ArrayList에는 다양한 자료형을 담을 수 있도록 Object 타입으로 데이터를 저장한다. int형의 경우 Integer 래퍼객체를, float의 경우 Float 래퍼객체가 담기게 되는 것이다.


ArrayList를 사용하기 위해선 java.util에서 ArrayList를 import해야한다.  

```java
import java.util.ArrayList;
```


## 1. ArrayList 선언

JAVA는 J2SE5.0 버전 이후 부터 제네릭스를 반드시 표기하여 리스트에 포함될 자료형을 명확히 표기해야한다.  

```java

ArrayList<String> strList = new ArrayList<String>();
ArrayList<String> strList = new ArrayList<>();

```

제네릭스를 선언부에 삽입했을 때, 할당하는 곳에는 두 번 작성하지 않아도 된다.


## 2. add

ArrayList에서 데이터 추가는 add로 진행한다. add는 데이터를 직접 입력하여 추가하는 방식도 있고, 특정 인덱스에 데이터를 삽입하는 형식도 가능하다.

```java

ArrayList<String> strList = new ArrayList<String>();
strList.add("밥 먹기");
strList.add(0, "집 가기");

```

데이터만 삽입하였을 시 리스트의 가장 맨 마지막에 추가되고, 인덱스를 넣을 시 인덱스에 데이터가 추가된다. 


## 3. remove

remove의 경우, 리스트에 있는 데이터를 삭제할 수 있다. 인덱스를 넣을 경우 리스트의 인덱스에 해당하는 데이터를 지울수도 있으며, 실제 리스트에 존재하는 값을 인자로 전달하여 삭제할 수도 있다.

```java

ArrayList<String> strList = new ArrayList<String>();
strList.remove("밥 먹기");
strList.remove(1);
```


## 4. size()

리스트의 크기를 반환하는 메소드이다.

```java

int size = strList.size();

```

해당 메소드는 int를 반환한다.


## 5. indexOf()

ArrayList에서 인자로 들어온 값을 반환한다. 단 원소가 중복될 경우, 처음으로 등장한 인자의 인덱스만 return한다. 만약 일치하는 원소가 없을 경우 -1을 반환한다.

```java

ArrayList test = new ArrayList();
// ...
test.indexOf(3333);

```