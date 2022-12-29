
JAVA에서는 파일 입출력을 위해 IO Stream을 제공한다. 여기서 IO는 Input과 Output을 의미하며, 각각의 용어는 파일로부터 데이터를 읽어들이고, 파일로부터 데이터를 쓰는 행위를 의미한다. Input과 Output의 개념은 데이터와 소스코드를 작성하는 '나(개발자)' 사이에서 데이터 전달흐름의 주체를 어디로 보느냐에 따라 달라진다. JAVA에서 사용하는 InputStream과 OutputStream은 어디까지나 '나'를 주체로 본다.

Stream의 가장 중요한 특성은, 단방향이라는 점이다. 그래서 하나의 Stream을 선언하면 해당 Stream으로 Input과 Output을 모두 수행할 수 없다. 각 기능에 맞는 Stream을 별개로 선언하여 사용하여야한다.


## 1. OutputStream

OutputStream은, '나'에게서 File을 향해 데이터를 쓰는 것을 의미한다. Stream의 대상이 나 -> File 인 것이다.

```java

File target = new File("Lec01.bin");

OutputStream os;
os = new FileOutputStream(target);

```

OutputStream은 Interface이며, 해당 Stream을 사용하기 위해서는 OutputStream을 implementing한 FileOutputStream 클래스를 사용하여야한다. 생성자로는 File 객체를 받는다.


### 1-1. os.write

OutputStream은 데이터를 쓸 수 있기 때문에, 해당 메소드를 제공한다. 아래 코드를 보자.

```java

String msg = "hello world!";
byte[] bArr = msg.getBytes();

File target = new File("Lec01.bin");

OutputStream os;
os = new FileOutputStream(target);

for(int i = 0; i<bArr.length; i++){
	os.write(bArr[i]);
}

```

문자열을 새롭게 생성한 파일에 쓴다고 가정하자. 이 때, 문자열을 byte 배열로 변환한 뒤, byte 배열을 순회하면서 해당 글자를 os.write의 인자로 전달해준다. 

os.write를 활용하는 방법은 다양하다. 위처럼 byte 배열을 생성한 뒤 각 byte를 write를 통해 입력할 수도 있으며, byte 배열을 한꺼번에 입력할 수도 있다.



## 1. InputStream

InputStream은 File의 데이터를 '나'로 향해 가지고 오는 것을 의미한다. 즉, File -> 나 인 것이다.

```java

File f = new File("readFile.txt");

InputStream is = new FileInputStream(f);

```

FileInputStream의 생성자에는 File 객체를 전달 할 수 있다.


### 1-1. is.read()

```java

int su;
while(true) {
	su = is.read();
	if(su == -1) break;
	System.out.print((char)su);
}

```

파일 데이터를 읽는 것은, .read를 통해 진행한다. FileInputStream은 File의 데이터를 한꺼번에 읽는 것이 아닌 1Byte씩 데이터를 읽게 된다. InputStream이 File에서 더 이상 읽을 것이 없을 때에는 -1을 반환하게 된다. .read()에 인자를 주지 않을 경우 File로 부터 실제로 읽은 데이터를 int형으로 반환한다. 그에 따라 Console에 출력할 때 문자로 출력하고 싶다면, 형변환을 진행해야 한다.


