
JAVA에서는 기존 for문을 제외하고도 좀 더 간편하게 반복문을 사용할 수 있다. forEach문이 그렇다. 아래는 기존 for문이다.

``` java

int[] iArr = {1,2,3,4};

for(int i = 0; i<iArr.length; i++) {
	System.out.println(i);
}

```

기존 for문은 초기변수선언, 조건문, 증감문을 모두 작성해야한다. 아래는 forEach문이다.

``` java

int[] iArr = {1,2,3,4};

for(int number:iArr) {
	System.out.println(number);
}

```

forEach문의 구조는 아래와 같이 정리할 수 있다.

```java
for(type var: iterator) {
	// loop of iterator
}
```

