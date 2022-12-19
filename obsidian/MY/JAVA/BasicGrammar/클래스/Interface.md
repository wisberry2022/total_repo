
추상 클래스 사용을 위해 abstract class를 사용하였다. abstract class에서는 추상 메서드를 작성할 수도 있고, 그러지 않을 수도 있었다. 하지만 추상 메소드만 있다면, 이때는 더 이상 abstract class보다는 Interface를 사용한다.

```java

interface Lec02 {
	public abstract void func01();
	public abstract void func02();
}

```

interface의 상속은 extends가 아닌 implements로 해야한다.

```java

interface Lec02 {
	public abstract void func01();
	public abstract void func02();
}

class Ex01 implements Lec02 {
	public void func01() { 
		// ...logic of func01
	}
	public void func02() {
		// ...logic of fun02
	}
}

```

interface의 특징은, 추상 메소드만 존재하고, 생성자, 필드는 존재하지 않는다.  그렇기 때문에 interface 내부에 작성하는 추상메서드에서는 abstract keyword를 생략할 수 있다.

```java

interface Lec02 {
	public abstract void func01();
	public void func02();
}

```

위와 같이 선언해도 Lec02 함수를 오버라이드해야 한다. 

Interface에서는 abstract 키워드 말고, 많은 것을 생략할 수 있다. 접근제어자, abstract, 그리고 상수를 넣고 싶다면 final, static까지도 생략 가능하다.

```java

interface Lec02 {
	int num = 1111;
	void func01();
}

class Prm01 implements Lec02 {
	public void func01() {
		//...logic of func01
	}
	public static void main(String[] args) {
		System.out.print(Lec02.num);
	}
}

```

interface에서 func01() 메서드를 포함한, 이후 추가 될 수 있는 메서드들은 public 접근제어자를 기본으로 가진다. 때문에 interface 내 추상메서드의 접근제어자를 생략한다한들, `default` 접근제어자가 아닌 `public` 접근제어가 적용된다. 인터페이스를 상속받는 클래스 또한 public 미만의 접근제어자를 사용할 수 없게된다.

Lec02 인터페이스의 상수 num은 얼핏 보기엔 필드라고 생각할 수 있으나 그렇지 않다.  사실 위 변수는 static이라 선언하지 않았으나 static으로 선언되어있고, 인스턴스 필드/클래스 필드처럼 보이나, num을 증감하거나 수정하려고 하면 오류가 뜬다. 이는 final이 붙어있기 때문이다.

Lec02의 num이 static이라는 것은, 이를 인터페이스에 직접 접근하여 사용할 수 있다는 것이다. Prm01 클래스의 main 메소드에서, Lec02.num을 통해 num을 출력하였다. 즉, Lec02의 num은 static 상수인 것이다.

```java

interface Lec02 {
	public final static int num = 1111;
}

```

`int num = 1111`은 사실 위 코드의 많은 키워드들이 생략되어 있는 것이다. 위 코드의 num은 결국 interface의 필드가 아니라, 상수인 셈이다.

interface 간 상속도 가능하다.  단, 이 때는 implements가 아닌 extends를 통하여 상속을 한다. 또한 implements와 같이 다중 상속이 가능하다.

```java

interface A {
	void func01();
}

interface B {
	void func02();
}

interface C extends A,B {
	void func03();
}

```