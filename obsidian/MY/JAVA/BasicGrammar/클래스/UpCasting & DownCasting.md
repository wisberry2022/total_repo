

자료형 사이에서 캐스팅을 진행할 수 있듯, 클래스 사이에서도 캐스팅이 가능하다. 상속 관계를 가지는 부모, 자식 클래스 사이에서 캐스팅을 진행할 수 있다.

```java

class Parent {
	public void pFunc01() {
		System.out.println("parent func!");
	}
	
	public void pFunc02() {
		System.out.println("parent func2!");
	}
}

class Child extends Parent {
	
	public void pFunc01() {
		System.out.println("child func! with parent");
	}
	
	public void pFunc02() {
		System.out.println("child func2! with parent");
	}
	
	public void cFunc01() {
		System.out.println("this is only child func!");
	}
}


```

위와 같은 코드가 있을 때, Child는 Parent를 상속받는다. 만약 Child 객체를 생성한다면 부모 객체의 메소드를 오버라이드한 pFunc01과 pFunc02를 사용할 수 있으며, cFunc01 함수를 사용할 수 있을 것이다. 아래 코드를 보자.

```java

public class Ex01 {
	public static void main(String[] args) {
		Child c = new Child();
		Parent d = c;
		d.pFunc01(); // Child 클래스의 pFunc01() 메소드 실행
		d.pFunc01(); // Child 클래스의 pFunc02() 메소드 실행
		d.cFunc01(); // 에러 발생
	}
}

```

위 코드의 경우, Child로 c를 선언했으나, 아래쪽에서 Parent 객체로 재정의하였다. 이 경우, 객체 c는 부모타입으로 '업캐스팅'된 것이다. 위 코드에서 볼 수 있듯, 자식 객체를 부모 타입의 객체로 형변환을 진행하는 것을 '업캐스팅'이라고 한다. 

c 객체가 업캐스팅 되어 Parent d가 새로 생성되었다. d에서 pFunc01() 메소드를 호출하면, Parent의 메서드가 등장하는 것이 아닌, Child의 메서드가 등장한다. Parent 메소드에서 오버라이드된 Child의 메소드를 호출하게 된다.

d는 이제 Parent 객체이기 때문에, 더 이상 Child 객체에서 선언된 cFunc01 메소드는 사용 할 수 없다. 이는 업캐스팅되면서 사용할 수 있는 메소드의 범위가 줄어든 것이다. 자식 클래스는 부모 클래스의 메소드를 모두 상속받을 수 있지만, 역은 성립하지 않는다. 따라서 업캐스팅은 기존 객체의 권한/범위를 축소시키는 행위라고도 볼 수 있다.

아래 코드를 보자.

```java

public class Ex01 {
	public static void main(String[] args) {
		Parent c = new Parent();

		Child d = c; // 오류 발생(Type mismatch: cannot convert from Parent to Child)
		Child e = (Child)c; // 오류 발생(Parent cannot be cast to Child)
	}
}

```

다운캐스팅을 시도하기 위해 Parent 클래스를 선언한 c를 대상으로 Child d로 할당을 시도하였다. 이 경우, 다운 캐스팅이 자동으로 되지 않고, 오류가 발생한다. 그러면 명시적으로 변환할 경우에도 오류는 역시 발생한다. 다운캐스팅은 생각보다 자유롭지 않다. 하지만 아래와 같은 경우는 가능하다.

```java

public class Ex01 {
	public static void main(String[] args) {
		Parent c = new Child();

		((Child)(c)).cFunc01();
	}
}

```

타입은 Parent로 하되, Child 생성자를 통해 객체를 생성하였다. 이 경우 `c`는 결론적으로 Parent 타입을 가지게 된다. 이 경우 아래 줄과 같은 형태로 다운캐스팅을 진행 할 수 있다.


일반적으로 객체를 생성할 때는 `<클래스이름> 변수명 = new <클래스생성자>`로 작성한다. 이 때 '클래스이름'과 '클래스생성자'는 동일하게 작성하는 것이 원칙이지만, 상속 관계에 있을 경우 부모타입 => 자식타입과 같은 형태로 객체를 생성할 수도 있다.

```java

Parent a = new Child();

```

객체 'a'는 Child 생성자를 통해 생성되었으나 그 타입은 `Parent`다. Parent에서 생성한 메소드만 호출 할 수 있다. 하지만, Child 생성자로 생성되었기 때문에, 만일 부모로 부터 상속받은 메소드를 그대로 사용하지 않고 오버라이드된 메소드가 존재한다면, 자식 클래스에서 오버라이드된 메소드를 호출한다. 그리고, 객체 `a`는 Child에서만 선언된 메소드는 사용할 수 없다는 특징이 있다. 즉 아래와 같은 코드는 에러가 발생한다.

```java

a.cFunc01();

```

객체 a는 Parent이기 때문에, 자식 클래스에서만 존재하는 cFunc01()은 호출 할 수 없다.