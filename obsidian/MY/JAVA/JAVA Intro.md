

# 0. 자바란?

썬 마이크로시스템즈의 제임스 고슬링과 다른 연구원들이 개발한 OOP 언어이다. 91년 프로젝트를 시작하여 95년에 발표한다.

JAVA는 C/C++에서 어렵게 사용되는 포인터나 메모리 조작 등의 개념을 과감하게 제거하거나 개선한 언어이다.


## 1. Java의 사용

JAVA는 다양한 플랫폼에서의 개발 환경을 구축하기 위해 아래 3가지의 플랫폼을 제시했다.

	- 3가지 종류의 플랫폼을 제공
		- JAVA2 ME(Mobile Edition): PDA나 스마트폰 등 소형 기기를 위한 개발 환경
		- JAVA2 SE(Standard Edition): Client 중심의 일반적인 자바 응요 프로그램 개발 환경
		- JAVA2 EE(Enterprise Edition): 서버 중심의 기업용 소프트웨어 개발 환경

JDK 1.9 부터는 위와 같은 구분이 사라졌다.


## 2. JRE와 JDK

JRE는 JAVA를 실행하기 위한 환경을 마련해주기 위한 패키지이다. JDK는 자바를 이용하여 실제로 개발을 할 수 있도록 도와주는 키트를 제공해준다.

그래서 JRE는 Java Runtime Environment, JDK는 Java Development Kit인 것이다. 정리하면, Java로 프로그램을 개발하기 위해서는 JDK가 필요하며, JAVA 프로그램을 실행하기 위해서는 JRE가 필요하다.


## 3. JAVA의 특징

JAVA는 운영체제에 독립적이다. 기존 프로그래밍 언어로 만들어진 소프트웨어들은 OS 종속적이기 때문에 이식성이 매우 낮다. 하지만 JAVA는 JVM 머신을 활용하고, JAVA로 작성된 모든 코드들은 JVM 머신 위에서 동작한다. 이는 JAVA가 가진 크나큰 장점이자 치명적인 단점이다.

JVM은 가상머신으로 이것이 동작하는 것은 컴퓨터 내에 가상의 운영체제/프로그램이 실행된다는 의미이다. 이는 컴퓨터 내부에서 특정한 양의 리소스를 차지한다는 것이며 이는 성능 하락으로 연결된다.


## 4. JAVA 문법의 구조

JAVA 문법의 구조는 클래스로 구성되어있다. 클래스는 여러 개의 구성요소를 가진다. 이 때, 필수적인 구성요소는 메소드, 필드, 생성자가 있다. 이외에도 더 많은 구성요소가 있으나 전술한 세 가지가 JAVA 클래스의  필수적인 구성요소다.

```java

class Ex01 {
	public static void main(String[] args) {
		// ...logic of main
	}
}

```

위 구조가 기본이기 때문에, 위 구조에서 벗어나서 Java 파일을 작성해서는 안된다. 

JAVA의 클래스 파일은 반드시 한 개만 작성할 필요는 없다. 여러개의 class를 작성하여도 된다.

```java
class Ex01 {
	public static void main(String[] args) {
		// ...logic of main
	}
}

class Ex02 {}

```

package를 사용할 수도 있다.

```java

package my;

class Ex01{
	public static void main(String[] args){
		// ...logic of main
	}
}

```

package를 사용할 경우, javac는 자동으로 `my`라는 새로운 디렉토리를 만들고 내부에 `Ex01.class` 파일을 생성한다.  그리고 커맨드 라인에서는 package명을 명시해주어 실행하면 된다. 

```bash
java my.Ex01
```

`package`는 클래스의 이름을 동일하게 작성하면서도 서로 다른 디렉토리에 있음을 명시해주는 역할을 한다. 

package를 써주지 않더라도 기본적으로 JAVA 소스코드는 package가 자동으로 추가되어있다. 

```java

System.out.println("Hello World");

```

사실 위 코드는 아래의 코드와 동일하다.

```java

java.lang.System.out.println("Hello World");

```

`java.lang` package에 존재하는 클래스를 사용할 때는 package 명을 직접 명세하지 않아도된다. 생략 시, 컴파일 과정에서 자동으로 맞춰주는 것이다. 아래의 코드를 보자.

```java

class Ex04 {
	public static void main(String[] args) {
		func01();
	}

	public static void func01() {
		System.out.println("Ex04 class - func01 run!");
	}
}

class Ex05 {
	public static void func01() {
		System.out.println("Ex05 class - func01 run!");
	}
}

```

위 코드는  Ex04 class의 func01을 실행시킨다.  Ex05의 func01 메소드와 Ex04의 것과 이름이 동일한데 어떻게 실행이 가능한 것일까? Ex04의 main 메소드의 func01() 코드는 사실 아래의 코드와 동일하다.

```java

Ex04.func01();

```

코드를 작성할 때는 Ex04를 명세하지 않았음에도 자동으로 Ex04 클래스 내부에 존재하는 func01 메소드를 자동으로 실행시켰다. 이것이 가능한 것은 컴파일 단계에서 메소드 이전에 어느 클래스 소속인지 자동적으로 붙여주기 때문이다. 만약 Ex05 class에 있는 func01 메소드를 호출하고 싶다면 어떻게 해야할까?

```java

Ex05.func01();

```

위 코드에도 생략된 부분이 있을 것이다. 만일 개발자가 package를 설정했다면 package 경로가 암묵적으로 추가될 것이다.

```java
package com.my;

class Ex04 {
	public static void main(String[] args) {
		com.my.Ex05.func01();
		com.my.Ex04.func01();
	}

	public static void func01() {
		System.out.println("Ex04 class - func01 run!");
	}
}

class Ex05 {
	public static void func01() {
		System.out.println("Ex05 class - func01 run!");
	}
}

```


### 4-1. JAVA Class 


#### 4-1-1. Naming Convention

Java에서 class 사용을 위해서는 네이밍 컨벤션이 있다. 클래스명의 첫글자는 대문자 영문으로 시작해야하며, 영문숫자 조합에 띄어쓰기는 불가능하다.


#### 4-1-2. Class의 구성요소

##### 4-1-2-1. Method

`method`는 아래와 같은 형태로 이루어져 있다.

```java

public static <Type of return value> MethodName() { };

```

main 메소드와 달리 호출하지 않으면 실행되지 않는다. `MethodName()`을 통해 호출 가능하다.

```java

class Ex02 {
	public static void func01() {
		System.out.println("메서드 실행...");
	}
	
	public static void main(String[] args){
		System.out.println("한글...Ex02...");
		func01();
	}
}


```

`class`의 구성요소들은 위치에 구애받지 않는다. `main` 메소드보다 아래에 있어도 오류를 반환하지 않는다.

메소드는 한 번 작성한 코드를 다른 곳에서 재사용 할 수 있다는 장점이 있다. 메소드는 인자를 전달하여 수행시킬 수도 있다.

```java

public static void Method(<Type> <ParameterName>) { ... };

```

인자를 전달받는 메소드의 경우 자료형을 명시하고, 인자명을 작성해주어야한다. 인자는 여러개가 올 수 있다.

```java

public static void Method(int a, int b, int c) { ... };

```

메소드 사용 시 규칙이 있다. 선언한 메소드의 인자와, 호출한 메소드의 인자는 반드시 일치해야한다. 즉, 메소드에 인자 3개를 받기로 선언했다면, 호출 때도 반드시 세 개의 인자를 입력하여야한다. 그렇지 않을 경우 에러가 발생한다.

메소드 사용 시 에러가 발생하는 경우 중 몇가지를 정리하면 아래와 같다.

1. 메소드에 정의된 인자의 개수와, 호출 시 전달한 인자의 개수가 다를 때
2. 메소드에 정의된 인자의 자료형과, 호출 시 전달한 인자의 자료형이 다를 때
3. 이름, 전달받는 인자의 개수, 자료형이 완전히 동일한 두 개의 메소드는 선언할 수 없다.
	-  JAVA에서는 선언된 메소드 간의 우선순위가 존재하지 않는다. 그렇기에, javac는 동일한 두 메소드를 구분하지 못한다.
	-  원칙적으로 메소드의 이름은 중복 불가능하다.
	-  매개변수의 유무, 타입, 개수가 서로 다른 경우 동일한 이름의 메소드를 여러개 생성 할 수 있다.


Method는 인자를 반환하여 결과값을 return할 수도 있으며, 그러지 않을 수도 있다. Method에서의 return은 메소드를 종료한다는 의미이다. 메소드의 종료는 호출한 시점으로의 복귀를 의미하기도 한다. 

Method에서의 return 구문 생략 시, 컴파일러에서 자동으로 return을 붙여준다. 

