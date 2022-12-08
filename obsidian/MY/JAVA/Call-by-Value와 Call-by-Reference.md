

## 0. Intro

Call-by-Value와 Call-by-Reference는 프로그래밍 언어에서 함수를 호출 할 때 값을 전달하는 여러가지 방식들 중 일부이다. C계열의 언어에서는 위 종류의 함수 호출 방식을 모두 사용하나, 특정 언어에 따라 일부만 지원할 수도, 혹은 다른 방식을 채용하는 경우도 있다. 본 문서에서는 Call-by-Value와 Call-by-Reference에 대한 개념적인 부분을 살펴보고, Java에서의 Call-by-Value와 Call-by-Reference(줄여서 CbV, CbR이라고 하겠다.)에 대해 알아보고자 한다.


## 1. Call-by-Value

CbV는 값을 전달한다는 의미다. 함수 호출 시 argument로 전달되는 변수를, 단순히 value만 전달한다는 의미이다. 아래 코드를 보자.

```c

#include<stdio.h>

void swap(int a, int b) {
	int temp;

	temp = a;
	a = b;
	b = temp;
}

int main() {
	int a = 1;
	int b = 2;
	swap(a,b);
	printf("swap 이후 %d, %d", a, b);
	return 0;
}

```

위는 C로 작성된 예시다. main 함수 내에서 선언된 a와 b는 swap 함수 내에서 재할당되어 a와 b값을 바꾼다. 그리고 다시 main 함수로 들어와 a와 b 값을 확인했을 때, swap 함수의 결과가 제대로 반영되었을까? 결과는 그렇지 않다. swap 함수 실행 이후 a와 b를 확인해도 여전히 a는 1, b는 2다.

이는 위 코드의 swap 함수에서 동작한 변수들의 메모리 주소가, caller 함수에서 선언한 변수들의 메모리 주소와는 다름을 방증한다. 즉, callee 함수에 전달된 인자들은 값(value)만 전달되고, 내부에서 새로운 메모리 영역을 가진 변수를 선언했음을 알 수 있다. 이러한 동작은 Call-by-Value라고 한다.


## 2. Call by Reference

CbV가 값을 전달하는 방식이었다면, CbR은 Reference를 전달하는 방식이다. 즉 메모리의 주소값을 전달한다는 의미다. 아래 코드를 보자.

``` c

void swap(int *a, int*b) {
	int temp;
	temp = *a;
	*a = *b;
	*b = temp;
}

int main() {
	int a, b;
	a=10;
	b=20;
	printf("swap 이전: %d %d", a, b);
	swap(&a, &b);
	printf("swap 이후: %d %d", a, b);

	return 0;

}

```

위 코드를 실행하면 실제로 원하던 결과가 나온다. swap 함수를 실행하고나면  a와 b의 값이 뒤바뀐다. 이것이 가능한 이유는, 포인터를 사용했기 때문이다. swap 함수에 `&`를 붙여 main 함수 내에 선언된 a와 b 변수의 메모리주소값을 전달한다.

그렇기 때문에 swap 함수에서 return하는 값이 없다하더라도 main 함수 내에 선언된 변수 a와 b는 서로의 값이 바뀌게 되는 것이다.

하지만 C언어의 경우, 위와 같은 코드를 메모리 주소를 전달함으로써 swap 기능을 구현했으니 CbR이라고 설명했지만, 엄밀히 말한다면 C언어에서 CbR은 지원하지 않는다. 주소값 자체를 넘기는 것처럼 보이나, 실질적으로는 주소값 자체를 '복사'해서 넘겨주는 것이니 이는 엄밀히 말하면 CbV이다.  이렇듯 value긴 하나, 메모리 주소값(value)를 넘기는 것을 CbV와 구분하기 위해 Call-by-Address 방식이라고 한다. 

해당 문서는 C언어에 대한 설명이 아니니 위 코드를 CbR이라고 간주하여 설명하였다.


## 3. Call-by-Value & Call-by-Reference in JAVA

JAVA에서도 CbV를 지원한다. Pointer를 지원하지 않는 JAVA로써는 데이터 값을 넘길 때 Value를 넘기게된다. 이는 당연한 이야기다. 아래 코드를 보자.

```java

class CbV {
	public static void Swap(int a, int b) {
		int temp = a;
		a = b;
		b = temp;
	}

	public static void main(String[] args) {
		int a = 1, b = 2;
		System.out.printf("함수 실행 전 변수 a 값: %d b값: %d \n", a, b);
		Swap(a,b);
		System.out.printf("함수 실행 후 변수 a 값: %d b값: %d \n", a, b);
	}
}

```

위 코드는 C언어의 것과 동일하다. main 메소드 내부에 선언한 a와 b 변수를 선언하고, swap 메소드에 a와 b값을 전달한 뒤 서로의 값을 바꾼다. 그리고 main 메소드에서 다시 a와 b를 호출하였을 때 그 값을 확인한다.

결과는 함수 실행 전, 함수 실행 후 결과가 모두 같다. 즉 위 코드에서도 CbV가 일어난 것이다. 

C언어에서는 포인터를 활용하여 CbR(엄밀히 말하면 CbA)를 구현할 수 있었는데, JAVA에는 포인터가 존재하지 않는다. 그렇다면 두 값을 바꿔주고 싶다면 어떻게 해야 할까?

```java
class cbv2 {
	static class intNum {
		private int num;
		
		intNum(int num){
			this.num = num;
		}

		public int getNum(){
			return this.num;
		}

		public void setNum(int num){
			this.num = num;
		}
	}

	public static void Swap(intNum a, intNum b){
		int temp = a.getNum();
		a.setNum(b.getNum());
		b.setNum(temp);		
	}

	public static void main(String[] args){
		intNum a = new intNum(1);	
		intNum b = new intNum(2);

		System.out.printf("%d %d", a.getNum(), b.getNum());
		System.out.println();

		Swap(a, b);
		
		System.out.printf("%d %d", a.getNum(), b.getNum());
	}
}
```

int 자료형을 사용하여 선언하지 않고, 객체를 선언하여 값을 반환할 수 있는 메소드를 구현하고, Swap이라는 메소드에서 intNum 객체를 전달받아 swap을 진행한다. 그 결과 정상적으로 값을 바꿀 수 있다.

그렇다면 위와 같이 구현한 JAVA 코드는 CbR이라고 부를 수 있을까? 결론부터 말하면 아니다. 위 JAVA 코드도 객체로 선언했을 뿐, 사실상 객체의 주소값을 주고받아 처리했기 때문에 이는 결국 CbR인셈이다.

Swap 메소드 내부에서는 main 메소드 내에 존재하는 a와 b 객체 그 자체를 두고 동작하는 것이 아닌, a와 b 객체의 주소값만을 이용하여 넘기게 된다. 그렇기 Swap 메소드 내부에 존재하는 a와 b 객체는 main 메소드에 존재하는 실제 a,b 객체의 주소값을 참조함으로써 값을 변경하고 있는 것이다. 그렇기 때문에 Swap 메소드를 벗어나더라도 main 메소드에서 a와 b 객체를 접근하였을 때 바뀐 결과값이 남아있을 수 있게 된다.  