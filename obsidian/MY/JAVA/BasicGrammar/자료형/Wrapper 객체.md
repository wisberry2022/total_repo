
java에서는 wrapper 객체가 존재한다. 아래 코드를 보자.

```java

public class Ex01 {

	public static void func01(Object num){
		//...logic of func01
	}

	public static void main(String[] args){
		func01(123);
	}
}

```

func01 메소드는 파라미터의 타입으로 Object를 받으나, main 메소드에서 func01 함수의 인자로 기본 자료형인 123인 전달해주었다. 그럼 오류가 날까? 결과는 그렇지 않다. 해당 함수에 파라미터로 전달될 때 자동으로 그 파라미터를 Wrapper 클래스로 감싸준뒤 전달한다.

main 메소드에서 호출한 func01 메소드는 아래의 코드와 동일하다.

```java

func01(new Integer(123));

```

각 기본자료형들은 각각에 대응되는 Wrapper 클래스가 존재한다. 그 형태는 기본 자료형의 첫 글자를 모두 대문자로 바꾼 것이다. `byte`의 경우 `Byte`, `short`의 경우 `Short`의 Wrapper 클래스가 존재한다. 다만, int와 char의 경우 `Integer`, `Character`가 존재한다.

기본 자료형을 Wrapper 클래스로 변환하는 것을 Boxing, Wrapper 클래스를 기본 자료형으로 변경하는 것을 Unboxing이라고 한다.



## 1. 생성자로 Wrapper 객체 생성하기

Wrapper 객체도 객체기 때문에 생성자가 존재하고, 생성자를 통해 인스턴스 생성이 가능하다.

```java

Integer a = new Integer("2");

```

Integer 이외의 다른 Wrapper 객체에서 생성자를 통해 Wrapper 객체를 생성할 때, 생성자의 인자에는 반드시 boxing 해주고자 하는 값의 자료형 형태로 넣어주어야한다.

```java

Byte b = new Byte(10); // 에러 발생
Byte c = new Byte((byte)10);
byte num = 10;
Byte d = new Byte(num);

```

기본 자료형이 아니기 때문에 타입추론이 적용되지 않는다. 
