

stringBuffer는 String 클래스와 마찬가지로 문자열을 다룰 수 있는 JAVA에서 제공하는 하나의 자료형이다. 다만 String 클래스와의 사용법이 다르고, 제공하는 메소드 또한 조금씩 다르다. StringBuffer의 사용은 아래와 같다.

```java

StringBuffer str = new StringBuffer();

```

생성자를 이용하여 생성할 수 있는데, 괄호 안에 문자열을 삽입하여 사용할 수 있다. 문자열을 생성자에 넣으면 String 클래스에서 사용하는 것과 동일하게 문자열을 StringBuffer 변수에 넣을 수 있다.

StringBuffer는 동적으로 할당이 이루어진다. 초기에 할당된 Size가 존재하고, Size를 초과하여 문자열이 추가될 경우, 기존 Size에서 +1을 증가한 값의 두 배만큼 Size가 자동으로 증가한다. 그래서 사용자가 StringBuffer를 생성할 때, 초기 Size를 지정할 수도 있다. 이때는 정수를 인자로 넣어주면 된다.

```java

StringBuffer str = new StringBuffer(5);

System.out.println(str.capacity());

```

StringBuffer의 변수에는 .capacity라는 메서드가 있다. 해당 메서드를 통해 버퍼 사이즈를 확인할 수 있다. 위 코드는 정수 5를 출력하게 될 것이다.



## 1. StringBuffer의 편리한 기능

StringBuffer도 String 클래스처럼 문자열 제어를 위한 메소드를 제공하고 있다. 대표적인 것들을 설명해보자.

### 1-1. append

```java

StringBuffer str = new StringBuffer("java");
str.append("web");

System.out.println(str);

```

append 기능을 통해 기존 문자열에서 새로운 문자열을 추가할 수 있다. String 클래스에서는 concat이 해당 기능을 담당했다면, StringBuffer에서는 append가 담당한다.

StringBuffer에서는 String 클래스와는 달리 문자열 변경이 이루어지면 원본 객체의 것이 수정된다. 따라서 StringBuffer에서는 문자열 제어 시 새로운 객체/변수를 찍어낼 필요가 없게 된다. StringBuffer를 사용하면 불필요하게 메모리를 사용할 일이 없어진다.


### 1-2. insert

```java

StringBuffer str = new StringBuffer("java");
str.append("web");

str.insert(4, "database");

```

