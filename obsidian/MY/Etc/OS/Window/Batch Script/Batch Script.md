
## 0. OS 제어를 위한 언어

Batch Script는 Windows OS를 제어하기 위한 스크립트 언어이다. Windows 이외의 다양한 OS(리눅스, 유닉스, 매킨토시 ...)들도 자신의 운영체제를 제어하기 위한 그들만의 스크립트 언어를 제공한다. Windows에서는 Batch Script, 리눅스 계열에서는 Shell Script(리눅스 종류에 따라 다양한 쉘 스크립트가 있다)라고 한다.


## 1. Batch in Windows

Window OS에서 활용할 수 있는 OS 스크립트 언어이다. 가장 기본적인 명령어로는 `echo`가 있다.

``` bash

echo Hello World

```


echo는 프롬프트 화면에 메세지를 출력하는 명령어다. 일반 프로그래밍 언어의 `print` 와 같은 기능을 수행한다.

만약 지역변수나 프롬프트 내 선언했던 변수를 가지고 오고 싶다면 아래와 같이 작성하면 된다.

``` shell

echo %path%
echo %JAVA_HOME%

```

`%`를 변수명 앞뒤로 붙여주면 실제 해당 변수의 데이터를 출력한다. 만약 위와 같이 작성하지 않고 아래와 같이 작성할 경우를 보자.

```shell

echo path
echo java_home

```

프롬프트창에 path와 java_home이라는 문자열만 출력된다.
