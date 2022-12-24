
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

자료구조 Map은 List와 Set과는 다르게 Collection 인터페이스를 상속받지 않는다. 또한 Iterable 인터페이스도 상속받지 않기 때문에 Iterator 객체를 활용하여 순회를 할 수는 없다. 하지만 다른 방법으로는 가능하다.


### 1-1. keySet

```java

Map<String, Integer> DataMap = new HashMap<>();

DataMap.put("key1", 10);
DataMap.put("key2", 10);
DataMap.put("key3", 10);
DataMap.put("key4", 10);
DataMap.put("key5", 10);

Set<String> keys = DataMap.keySet();
Iterator<String> ite = keys.iterator();

while(ite.hasNext()) {
	System.out.println(ite.next());
}

```

`keySet`은 Map에 존재하는 `key`들을 모아 `Set<K>` 형태로 반환한다. 여기서 Generic `<K>`는 Key의 자료형을 삽입할 수 있다.  `Set<K>` 형태로 받은 keys는 이후 순회를 할 수 있는 Iterator 객체로 다시 받을 수 있다. 


### 1-2. values

```java

Collection<Integer> values = DataMap.values();
Iterator<Integer> vite = values.iterator();
while(vite.hasNext()) {
	System.out.println(vite.next());
}

```

keySet()이 Map의 key들만을 모아서 Set으로 반환했다면, values는 Map의 value만을 모아서 `Collection<E>` 타입으로 반환한다. 

keySet과 values 메소드를 통해 자료구조 Map은 key들은 Set으로 관리하고, value들은 Collection으로 관리할 수 있음을 알 수 있다. 특히 values의 경우 아래와 같은 코드도 가능하다.

```java

Collection<Integer> values = new ArrayList<Integer>(DataMap.values());

```

Collection interface는 자료구조 List와 Set의 super interface이기 때문에, 위와 같이 선언할 수 있다. ArrayList의 생성자에 `Collection`을 인자로 전달하였을 경우, 해당 Collection에서 생성된 iterator가 return하는 순서와 동일한 리스트를 생성하게 된다. 즉, 위 코드는, values를 통해 Iterator를 받아 순회했던 것과 동일한 순서를 가진 리스트를 출력하게된다.


### 1-3. entrySet

자료구조 Map은 Entry라는 별도의 interface를 반환할 수 있도록 .entrySet() 이라는 메소드를 만들었다. Map.Entry는 key-value 쌍을 가지며, Map내에서 key 개수만큼의 `Map.Entry<K,V>`를 가진다.

```java

Set<Map.Entry<String, Integer>> entries = DataMap.entrySet();
Iterator<Map.Entry<String, Integer> ite = entries.iterator();
while(ite.hasNext()){
	System.out.println(ite.next());
}

```

Set의 Generic으로, 최초 Map을 선언했을 시 사용했던 것과 동일한 형태의 Generic을 사용하였다. Map을 선언했을 때, key와 value의 자료형을 넣었던 것과 동일하게, Map.Entry 또한 key-value를 한쌍으로 가지기 때문에 구조가 동일한 것이다.

마찬가지로 Set Interface로 받았기 때문에 iterator를 생성할 수 있다.

