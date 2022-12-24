
Generic은 특정 타입을 강제함으로써 특정 자료구조의 데이터타입의 일관성을 보장하고, 제네릭을 사용하지 않았을 때 발생할 수 있는 예기치 못한 오류를 사전에 막을 수 있다. Generic은 아래와 같이 사용할 수 있다.

```java

List<String> arr = new ArrayList<String>();

```

Generic으로 선언된 ArrayList 변수 arr은 'String' 타입만 들어올 수 있게된다.  Generic 사용 시 주의할 점은, 반드시 참조변수의 타입만 들어올 수 있다. 아래와 같은 코드는 동작 할 수 없다.

```java

List<int> arr = new ArrayList<int>();

```

기본타입은 그대로 사용 할 수 없고, Wrapper 객체의 타입을 넣어야 한다.

```java

List<Integer> arr = new ArrayList<Integer>();

```

Java 1.7부터는 추론타입이 적용되어 아래와 같이 작성할 수도 있다.

```java

List<Integer> arr = new ArrayList<>();

```



## 1. extends

Generic에서도 extends를 사용할 수 있다. 원래는 class에서 상속관계를 지정할 때 사용하는 키워드이지만, Generic에서는 Generic을 제한하는 용도로 사용한다. 아래 코드를 보자.

```java

class Book<T extends Genre> {
	T genre;
	String name;

	public Book(String name) {
		this.name = name;
	}
}

```

Book의 경우 제네릭 타입으로 `Genre` 클래스와, `Genre` 클래스를 상속받는 자식 클래스만 올 수 있게 된다. 이처럼, `<T extends Type>`은, Generic 사용을 제한하기 위해 사용할 수 있다. 이 때 `extends` 키워드는 Generic으로 들어온 타입의 상한선을 지정해준다고 이해하면 편하다.