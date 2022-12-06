

## 0. What is Apache Ant ?
  
자바 어플리케이션 빌드를 위한 커맨드 라인 툴로써, 자바 어플리케이션 빌드를 위해 컴파일, 어셈블, 테스트, 그리고 자바 앱 구동을 위한 내장 기능(built-in)이 존재한다. 자바 어플리케이션에만 국한되지 않고, C나 C++ 어플리케이션 빌드도 가능하다.
Ant는 자바로 작성되었으며, 해당 라이브러리 사용을 위해 폴더의 레이아웃이나 특정 코딩 컨벤션을 요구하지 않아 사용에 있어 매우 유연하다.
 

## 1. 왜 Ant를 사용하는가?

Ant는, 다른 프로그래밍 언어 빌드툴인 make, gnumake, gnumake, nmake, jam과 비슷한 프로그램이다. 하지만 기존 빌드 툴들은 쉘 기반으로 동작하기 때문에 어디까지나 OS 종속적일 수 밖에 없다는 문제가 발생한다. 하지만 Ant는 이러한 문제를 극복하기 위해 쉘 기반이 아닌 다른 방식으로 어플리케이션을 빌드할 수 있도록 구성하였다. 이러한 특징 때문에, Ant를 활용하면 다른 플랫폼에서도 어플리케이션을 빌드할 수 있다.

Ant는 쉘 커맨드를 입력하는 대신, xml 기반의 configuration file을 생성하여 사용한다. 이러한 방법은, 기존 쉘 커맨드 방식의 빌드툴이 가지고 있는 표현력은 상실했으나, 어느 플랫폼에서든 동일한 방법으로 어플리케이션을 빌드할 수 있는 장점을 얻었다.



## 2. Ant 시작하기

### 2-1. Ant 설치의 과정

1. 자바 환경이 설치되어있는지 우선적으로 확인한다.(JDK, JRE)
2. 바이너리 파일(.zip or .tar.gz)을 다운받은 뒤 디렉토리에 압축 해제한다.
3. 환경 변수에 JAVA_HOME을 설정하고, 2번에서 압축 해제한 디렉토리의 경로를 ANT_HOME 환경변수로 설정한다. 그리고 PATH에 `%ANT_HOME%/bin` 을 추가한다.
4. ANT_HOME 디렉토리에 들어가 `ant -f fetch.xml -Ddest=system` 명령어를 입력한다.
5. Antlibs를 추가한다.

`ant -f fetch.xml -Ddest=system`  명령어는 Ant에서 제공하는 기능들을 사용할 수 있도록 도와주는 라이브러리를 다운받는 명령어이다. 해당 명령어를 실행하지 않으면, Ant에서 제공하는 대부분의 기능을 수행할 수 없다.

### 2-2. System(System Requirements)

Ant를 사용하기 위해서는 JDK와 JRE를 모두 설치해야한다. JDK를 설치하지 않고 JRE만 있을 경우, Ant에서 제공하는 대부분의 기능을 사용할 수 없다.

또한 Ant의 버전에 따라 그에 맞는 버전의 JDK를 사용하여야한다.

| Ant 버전 | JDK 버전 |
| --- | --- |
| 1.8 | 1.4 or Higher |
| 1.7 | 1.3 or Higher |
| 1.6 | 1.2 or Higher |
| 1.5 | 1.1 or Higher |



## 3. Buildfile 만들기

Buildfile의 예시는 아래와 같다.

``` xml
<project name="MyProject" default="dist" basedir=".">
  <description>
    simple example build file
  </description>
  <!-- set global properties for this build -->
  <property name="src" location="src"/>
  <property name="build" location="build"/>
  <property name="dist" location="dist"/>

  <target name="init">
    <!-- Create the time stamp -->
    <tstamp/>
    <!-- Create the build directory structure used by compile -->
    <mkdir dir="${build}"/>
  </target>

  <target name="compile" depends="init"
        description="compile the source">
    <!-- Compile the java code from ${src} into ${build} -->
    <javac srcdir="${src}" destdir="${build}"/>
  </target>

  <target name="dist" depends="compile"
        description="generate the distribution">
    <!-- Create the distribution directory -->
    <mkdir dir="${dist}/lib"/>

    <!-- Put everything in ${build} into the MyProject-${DSTAMP}.jar file -->
    <jar jarfile="${dist}/lib/MyProject-${DSTAMP}.jar" basedir="${build}"/>
  </target>

  <target name="clean"
        description="clean up">
    <!-- Delete the ${build} and ${dist} directory trees -->
    <delete dir="${build}"/>
    <delete dir="${dist}"/>
  </target>
</project>
```

buildfile은, xml로 작성한다. buildfile 내부에는 하나의 `project`와 최소 한 개의 `target`을 포함해야한다. `Targets`는 task element를 포함한다. buildfile의 각 task element는 id라는 속성을 가지게 되며, 후에 이것을 참조할 수 있다. 


### 3-1. Projects

`project` 태그는 세 개의 속성(attribute)을 가질 수 있다. 각 속성은 필수로 작성해야 할 수도, 그렇지 않을 수도 있다.

| Attribute | Description | Required |
| --- | --- | --- |
| name | 프로젝트의 이름 | No |
| default | target이 없을 때 기본적으로 수행될 target | Ant 1.6버전부터는 모든 프로젝트들이 target을 포함하거나, 톱 레벨에 선언되어 있어야 한다. 해당 default target은 프로젝트의 초기화 중 실행되며, `-projecthelp` 옵션과 함께 사용될 때도 사용된다.
| basedir | 모든 경로 계산이 수행되는 기본 디렉토리이다. 해당 속성은 "basedir" 속성을 미리 설정하여 재정의 할 수 있다. 경로 계산이 끝나면 해당 부분은 project tag에서 제거된다. 만약 속성이나 프로퍼티로써 이 값을 주지 않을 경우, buildfile의 부모 디렉토리를 기본값으로 사용하게 된다. | No |

각 `project`는 한 개 혹은 다수의 `target`을 작성할 수 있다. `target`은 개발자가 실행하길 원하는 `task`들의 집합이다.  Ant가 실행될 때 개발자가 buildfile에 작성해둔 target들이 실행되고, 만약 프로젝트에 'target'이 없을 경우 `project` 태그의 default 속성에 기재된 `target`이 실행된다.


### 3-2. Targets

`target`은 다른 `target`에 의존적일 수 있다. 즉, 컴파일을 위한 target을 생성할 수도 있으며, 배포를 위한 target을 생성할 수도 있다. 이 때, 개발자는 특정 어플리케이션이 빌드되었을 때에만 배포할 수 있도록 `target`을 구성할 수 있다. 

Ant에서 말하는 '의존성'이란,  `target`들의 순서에 관한 의존성일 뿐이다. 


### 3-3. Tasks

`task`는 실행할 수 있는 코드의 조각이다. task는 다수의 attribute를 가질 수 있으며, attribute의 값으로는 속성에 대한 참조가 포함될 수 있다. 

`task`의 일반적인 구조는 아래와 같다.

```xml

<name attribute1 = "value2" attribute2 = "value2" ... />

```

`task`는 고유한 id를 부여하여 후에 해당 id의 task를 참조할 수 있다.

``` xml

<taskname id = "task1" ... />
// ... other tasks
<script>
	task1.setFoo("bar");
</script>
```



## 4. Tasks of Ant

Ant에서는 굉장히 많은 `task`를 지원하고 있다. 모든 `task` 를 살펴볼 수는 없지만, 유형별로 정리하면 17개의 카테고리가 있다.

| task category | example of task name |
| --- | --- |
| 기록(Archive) | BUnzip2, BZip2, Cab, Rpm, Jar, Unzip ... |
| 검사(Audit/Coverage) | JDepend |
| 컴파일(Compile) | Depend, Javac, Apt, JspC ... |
| 배포(Deployment) | ServerDeploy |
| 문서화(Documentation) | Javadoc / Javadoc2 |
| EJB Tasks |  EJB Tasks |
| 실행(Execution) | Ant, AntCall, Apply/ExecOn, Dependset, Exec, Java ... |
| 파일(File) | Attrib, Checksum, Chgrp, Chmod, Concat ... |

이 외에도 다양한 동작을 위해 Ant에서 제공하는 task들이 있다.


## 5. Ant 실행하기

ant의 실행은 커맨드 라인을 통해 진행한다.  만일 커맨드라인에 특별한 인자를 넣지 않을 경우, 커맨드 라인을 실행한 디렉토리에서 build.xml 파일을 찾는다. 만일 빌드 파일이 존재한다면,  해당 파일을 빌드 파일로 사용하고, `project` 태그의 `default` 속성에 명세된 `target`을 실행한다. 

반드시 파일 이름이 `build.xml`일 필요는 없다. 사용자가 원할 경우 원하는 이름으로 빌드 파일을 작성하고, 커맨드 라인 입력 시 `-buildfile <filename>`의 옵션을 추가하여야한다.

또한 커맨드 라인의 옵션을 통해 빌드 파일에 작성된 `property`를 재정의 할 수 있다. 

빌드 파일에 작성된 `target`을 커맨드 라인에 입력하여 지정된 target을 실행시킬 수 있으며, 여러 개의 `target`을 작성하여 실행시킬 수도 있다. 만일 `target`을 명시하지 않았을 경우, `project tag`에 사용된 `default` 속성에 작성된 `target`이 실행된다.


### 5-1. Example

현재 디렉토리에 `build.xml`이 존재하고, 기본 `target`을 사용할 때,
``` bash
ant
```

현재 디렉토리에 존재하는 `text.xml` 파일을 빌드 파일로 사용하고, 기본 `target`을 사용할 때,

```bash
ant -buildfile test.xml
```

현재 디렉토리에 존재하는 `text.xml`파일을 빌드 파일로 사용하고, `dist` target을 사용하고 싶을 때
```bash
ant -buildfile test.xml dist
```

