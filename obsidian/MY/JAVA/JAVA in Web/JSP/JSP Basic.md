
Web Front 영역에서 JAVA의 역할은 JSP를 통한 동적인 HTML 태그 생성이다. Web Server는 기본적으로 정적인 자원들을 다루지만, WAS의 경우 동적인 화면을 다뤄야 한다. JAVA로 이를 실현한 것이 JSP이다. JSP를 활용하면 HTML 페이지 내에서 JAVA를 활용 할 수 있다.

Web에서 쓰이는 JSP는 Compile 언어를 스크립트 코드 방식으로 작성할 수 있다. Servlet의 경우 실행 코드 방식의 특징을 가진다. 그렇기 때문에 웹 서버에 직접적으로 코드를 올리지 않기 때문에 보안적인 측면에서 유리하다는 장점이 있다.


# 0. 사용법

```jsp

<html>
	<body>
		<% 
			for(int i = 0; i<5; i++) {
				out.println("hello jsp!");
			}
		%>
		<% for(int i = 0; i<5; i++) {%>
			<p>hello jsp!</p>{%out.println(i) %}
		<%} %>
	</body>
</html>

```



## 0-1. 디렉티브(Directive)

JSP 페이지에 대한 설정 정보를 지정한다. 디렉티브 구문은 아래와 같이 사용한다.

```jsp

<%@ page %>
<%@ taglib %>
<%@ include %>

```

디렉티브 구문은 page, taglib, include 총 세 개로 나뉘어지며 각 역할이 존재한다.


### 0-1-1. page

JSP 페이지를 어떻게 처리할 것인지에 대한 문서 정보를 입력할 수 있다.  흔히 사용하는 옵션은 아래와 같다.

```jsp

<%@ page language = "java" %>
<%@ page contentType = "text/html; charset=UTF-8" %>
<%@ page pageEncoding = "utf-8" %>
<%@ page import = "java.util.Date" %>

```

사용하는 문서에 대한 정보를 설정할 수 있다. contentType의 경우 페이지에서 출력할 문서의 타입을 지정한다. text/html, text/plain과 같은 형식으로 쓸 수 있다.

추가로 contentType에 명세되는 charset은 서버에서 브라우저에게 요청을 보낼 때 사용하는 인코딩이며, pageEncoding의 경우 java 자체에서 활용하는 encoding 설정을 명세하는 것이다. jdk1.8의 경우 ms949를 기본 인코딩으로 사용하기 때문에 자바 내에서 한글 사용 시에는 디렉티브 구문에 pageEncoding 옵션을 명세해야한다.

import 옵션의 경우 JAVA의 빌트인 객체들을 임포트 할 수 있게 해준다. 일반 자바 코드에서 내장 객체들을 import 하는 것과 동일한 효과를 가진다.


### 0-1-2. taglib

사용자가 제작한 태그를 사용할 때 사용하는 디렉티브다. 기본적으로 HTML에서 태그를 제공하나, JAVA를 활용하여 커스텀 태그를 제작할 수 있는데, 이를 위한 디렉티브 구문이다.

### 0-1-3. include

다른 문서를 참조할 때 사용하는 디렉티브 구문이다.



## 0-2. 스크립트릿

HTML 문서 내에서 자바 문법을 사용할 수 있는 구문이다.  가장 큰 특징으로는 내장 객체의 지원이 가능하다는 점이다. 이 외에 선언부나 

```jsp

<%
	for(int i = 0; i<5; i++) {
		out.println("hello world! <br>");
	}
%>

```


## 0-3. 표현식

표현식은 스크립트릿에서 웹브라우저에 출력시키기 위한 명령어인 out.println()을 생략하고 내용물만 입력할 수 있도록 도와준다.

```jsp

<p> 날짜 = <%=new java.util.Date() %> </p>

```

위 코드는 온전한 자바 문장이 아니기 때문에 세미콜론을 찍으면 오류가 난다.


## 0-4. 선언부

선언부에서는 함수의 선언이 가능하다.

```jsp

<%!
	public void fun() {
		System.out.print("Hello World!");
	}
%>

```

선언부에서 조심할 점은, 내장 객체를 사용할 수 없다는 점이다. 즉 위 예시에서 System.out은 가능해도 out.print의 사용은 불가능하다는 점이다.

