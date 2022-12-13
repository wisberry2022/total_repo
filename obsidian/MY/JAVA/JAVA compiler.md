
Java compiler인 javac는 다양한 옵션을 통해 소스코드 빌드가 가능하다.


## 0. 소스 코드 컴파일

```batch

javac Ex01.java

```


## 1. 소스코드 인코딩

``` java

javac -encoding utf8 Ex01.java

```

WINDOW의 기본 인코딩은 MS949이기 때문에 메모장의 기본 인코딩인 utf-8과 맞지 않게 된다. 만약 소스코드 내에 한글이 있을 경우 인코딩 충돌이 발생하여 컴파일이 진행되지 않는다. 

javac의 경우 encoding 옵션을 부여할 경우 상황에 맞게 컴파일 할 수 있다.


## 2. 클래스 파일 분리

``` java

javac -d <dirname> Ex01.java

```

클래스 파일과 소스코드를 분리하고 싶다면 javac 옵션을 통해 클래스 파일을 사용자가 지정한 디렉토리에 분리시킬 수 있다. 위 코드의 경우 `-d`  작성 후 디렉토리 이름을 작성하면 자동으로 디렉토리가 생성되고, 소스코드에 대한 클래스 파일이 디렉토리 내에 생성된다.