
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