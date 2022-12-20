
클래스 내에서 상수 필드를 위해 final을 선언할 수 있으나, 메소드에도 final 키워드를 붙일 수 있다. 

```java

class A {
	public final static void func01() {}
}

class B extends A {
	public void func01() {} // 오버라이딩 불가능
}

```

final 키워드를 사용한 메소드는 오버라이드가 불가능하다. 마찬가지로 final 키워드를 클래스에도 붙일 수 있다.

```java

final class A {
	//...logic of class A
}

class B extends A {   // 상속불가능
	//...logic of class BG
}

```

