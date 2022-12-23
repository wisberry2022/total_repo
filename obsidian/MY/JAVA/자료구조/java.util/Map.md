
Map 자료구조는 key-value로 이루어진 자료구조다. 보통 `HashMap`클래스 생성자를 통해 생성한다. 

```java

Map map = new HashMap();

```

Map 자료구조는 다른 PL에서는 딕셔너리, Object와 동일하다. Map 자료구조에서는 데이터를 넣기 위해 아래와 같이 사용할 수 있다.

```java

Map.put("key", "value");
Map.put("key2", "value2");
Map.put("key3", "value3");

```

key와 value에는 다양한 Object들이 들어갈 수 있다. value는 중복하여 작성할 수 있으며, key는 중복이 불가능하다. 하지만 이전에 삽입한 key값을 다시 넣는다고 하여 오류가 발생하진 않는다.

```java

Map.put("key1", "value");
Map.put("key1", "1234");

```

만약 key1을 꺼내서 본다면, "value"가 아닌, "1234"가 나타난다. 이는, 같은 key가 있을 경우 덮어씌우게 되는데 이를 활용하여 수정의 기능을 구현할 수 있다. 하지만, 어떤 객체가 들어오느냐에 따라 에러가 발생할 수 있으니 Map에 내장된 수정 메소드를 이용하는 것이 좋다.

```java

Map.get("key1");
Map.get("key2");
Map.get("key3");

```

Map에 있는 데이터들은 get을 통해 value를 얻어낼 수 있다. 


## 1. Map의 순회

자료구조 Map은 List와 Set과는 다르게 Collection 인터페이스를 상속받지 않는다. 또한 Iterable 인터페이스도 상속받지 않기 때문에 사실 순서는 