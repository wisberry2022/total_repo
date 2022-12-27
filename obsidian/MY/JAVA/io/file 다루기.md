

java에서 file을 다룰 수 있다. 이를 위해 JAVA에서는 java.io 패키지를 지원하며, 내부에는 file 모듈이 존재한다.

```java

File file = new File(directory, file name);

```

`File` 생성자에는 디렉토리 이름이나 파일 이름을 인자로 전달할 수 있다. 해당 파일이 존재하는지를 확인하기 위해 exist 메소드를 사용할 수 있다.

```java

file.exists();
file.isDirectory();
file.isFile();

```

exists 메소드는 해당 파일이 존재한다면 true, 그렇지 않다면 false를 반환한다. isDirectory()와 isFile()은 해당 파일이 디렉토리인지, 파일인지를 확인하여 boolean 값을 반환한다.

```java

System.out.println(file.getPath());
System.out.println(file.getAbsolutePath());

```

file.getPath()는 File 클래스가 보유하고 있는 파일/디렉토리 이름을 반환한다. 만일 절대경로를 얻고 싶다면, getAbsolutePath()를 사용한다. 아래 코드를 보자.

```java

File file = new File("E:\\java\\gov\\day17");

System.out.println(file.getPath());
System.out.println(file.AbsolutePath());

```

이 때 두 줄의 코드는 동일한 결과를 출력한다. 즉, file.getPath()는 File 객체가 생성되었을 때 입력받은 파일명/경로를 반환한다.

```java

file.getParent();
file.getName();

```

File 객체가 가지고 있는 파일/디렉토리는 파일의 이름만을 가지고 올 수 있으며, 그 파일의 부모 디렉토리 경로도 가지고 올 수 있다. 단, file.getParent()의 경우 file 객체가 가지고 있는 파일 이름에서 부모 디렉토리 정보를 받을 수 없다면 null을 출력한다.



# 1. 디렉토리/파일 생성과 삭제

io를 활용하면 디렉토리를 임의로 생성하거나 삭제 할 수 있다.


## 1-1. f.createNewFile()

```java

File file = new File("Lec01.txt");

if(file.exists()){
	// ...logic of exists
}else {
	try {
		file.createNewFile();
	}catch(IOException e) {
		System.out.println("error");
	}
}

```

createNewFile()은 새로운 파일을 생성할 때 사용한다. 여기서 주의할 점은, 해당 메소드는 try,catch를 반드시 수반해야한다. 또한 새롭게 알 수 있는 사실은, file 객체는 입력받은 파일/디렉토리가 없다고 하여 객체가 미생성되지는 않는다. 가지고 있는 정보를 통해, 필요할 때 적절한 경로에 새롭게 생성, 삭제 할 수 있다.


## 1-2. f.mkdir()

```java

File f = new File("test02");

if(f.exists()) {
	System.out.println("존재합니다!");
}else {
	boolean boo = f.mkdir();
	if(boo) System.out.println("파일 생성했습니다!");
}

```

mkdir은 Batch 스크립트와 마찬가지로, 디렉토리를 새롭게 생성하는 기능을 한다. 


## 1-3. f.delete()

```java

File f = new File("test02");

if(f.exists()) {
	boolean boo = f.delete();
	if(boo) System.out.println("삭제하였습니다!");
}else {
	System.out.println("파일이 존재하지 않습니다");
}


```

`delete` 메소드는 파일과 디렉토리를 삭제할 수 있다. 
