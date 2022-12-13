

# 1. this

class에서 this는 class 내부에서, 자기 자신을 호출하고자 할 때 사용하는 키워드다. this의 역할은 생성된 객체 자신의 참조변수 역할을 한다.

```java

class Sample {
	public void func01(Sample A) {
		System.out.println("func01 run");
		A.func02();
	}

	public void func02() {
		System.out.println("func02 run");
	}
}

// ...main method
Sample A = new Sample();
A.func01(A);

```

위 코드의 경우, func01 메소드에서 인자로 받은 A는 자기자신을 의미하게 되는데, 이 때, A는 this와 동일한 역할을 한다. 즉 func01 메소드는 아래의 것과 동일하다.

```java
	public void func01() {
		System.out.println("func01 run");
		this.func02();
	}

	// ...main method
	Sample A = new Sample();
	A.func01();
```

func01의 매개변수로 자기 자신을 전달할 필요가 없으며, 메소드 내부에서도 인자를 받을 필요 없이 this를 활용하여 자기 자신의 필드, 메소드에 접근할 수 있다.

this의 경우, non-static메소드에서 non-static한 어떤 것을 호출 할 때 주로 사용하게 된다. static의 경우 프로그램 실행 시 메모리 내 특정 영역에 위치하기 때문에 this와 같은 특별한 참조변수값을 통해 접근하지 않아도 된다. 하지만, non-static한 영역의 경우 언제 생성되고 소멸될지 모르기에, 자신을 호출하기 위해서는 어떠한 방법이 필요한 것이다. 그 역할을 수행하는 것이 this이다. 



## 2. this in Constructor Overloading

클래스에서 생성자는 오버로딩이 가능하다. 클래스 내에서 각 생성자는 오버로딩 된 다른 생성자를 사용할 수 있는데, 이 때 this를 사용할 수 있다.

```java

class Car {
	public String model;
	public int maxSpeed;

	public Car() {
		this("스파크", 120);
	}

	public Car(String model, int maxSpeed) {
		this.model = model;
		this.maxSpeed = maxSpeed;
	}
}

```

생성자 내부에서 쓴 this() 는 생성자 내에서만 사용할 수 있다. 주의해야 할 점은, this()와 this. 는 엄연히 다른 기능을 하는 문법이라는 점이다.