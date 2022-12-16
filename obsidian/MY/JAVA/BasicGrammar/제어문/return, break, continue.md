


# 0. return

return은 일반적으로 메소드의 말단부분에  위치하며, 사용자가 명시하던, 그렇지 않던 항상 사용된다. return의 의미는 JVM 메모리 내 스택 영역에 올라온 작업을 즉시 종료하고 메소드가 호출되었던 위치로 곧바로 돌아간다.

하지만 return은 사용자가 원하는 어느 곳에서든 작성 할 수 있다. 

```java

public void func01(){
	for(int i = 0; i < 5; i++) {
		System.out.print(i);
		if(i == 3) return;
	}
}

```

위 코드에서 i가 3이 되면 return문을 만나 JVM 메모리 내 스택 영역에서 func01 함수를 지워버리고 main 메소드로 돌아간다.



# 1. break

break는 반복문을 탈출 할 수 있다. break가 사용 될 수 있는 영역은 switch와 break이다. break는 이전에 존재하던 문법에서 빠져나갈 수 있다.

break의 특징으로는,  break가 선언되어있는 영역만 탈출 할 수 있다.

```java

for(int i = 0; i<5; i++) {
	for(int j = 0; j<10; j++) {
		if(i>5) {
			break;
		}
	}
}

```

위 코드에서 탈출하는 영역은 안쪽 for문 뿐이다.



# 2. continue

continue는 반복문 안에서만 사용할 수 있다. 특정 조건을 만나면 continue가 선언된 아래쪽 코드는 수행하지 않는다. 

```java

for(int i = 0; i < 10; i++){
	if(i>5) continue;
	System.out.println(i);
}

```

i가 6이 될 때, 아래 코드는 더 이상 진행되지 않는다. 다만 break와의 차이점은, break는 특정 조건을 만나면 반복문을 완전히 빠져나가지만, continue는 for문을 반복하면서 continue문 아래 코드를 실행하지 않는 것뿐이다.