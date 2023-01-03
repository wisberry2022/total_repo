
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



## 2. InputStream

InputStream은 File의 데이터를 '나'로 향해 가지고 오는 것을 의미한다. 즉, File -> 나 인 것이다.

```java

File f = new File("readFile.txt");

InputStream is = new FileInputStream(f);

```

FileInputStream의 생성자에는 File 객체를 전달 할 수 있다.


### 2-1. is.read()

```java

int su;
while(true) {
	su = is.read();
	if(su == -1) break;
	System.out.print((char)su);
}

```

파일 데이터를 읽는 것은, .read를 통해 진행한다. FileInputStream은 File의 데이터를 한꺼번에 읽는 것이 아닌 1Byte씩 데이터를 읽게 된다. InputStream이 File에서 더 이상 읽을 것이 없을 때에는 -1을 반환하게 된다. .read()에 인자를 주지 않을 경우 File로 부터 실제로 읽은 데이터를 int형으로 반환한다. 그에 따라 Console에 출력할 때 문자로 출력하고 싶다면, 형변환을 진행해야 한다.



## 3. 사용자 버퍼

JAVA의 IO Stream은 기본적으로 ByteStream이기 때문에, 데이터를 읽고 쓸때 항상 1Byte씩 주고받게된다. 파일의 용량이 커질 경우, 1Byte 씩 주고받는 기본 Stream으로는 처리속도가 현저히 느려진다. 이를 위해 사용자 버퍼를 이용할 수 있다. 

사용자 버퍼에서 Buffer는, 일종의 임시공간으로써, JAVA에서는 byte 배열로 표현된다. InputStream, OutputStream을 사용하여 read / write 메소드 사용 시 인자로 전달 할 수 있다.

```java

byte[] buf = new byte[5];
InputStream is = new FileInputStream("data.bin");
OutputStream os = new FileOutputStream("data.bin");

int su;
while(true){
	su = is.read(buf);
	if(su == -1) break;
	os.write(buf, 0, su);	
}

```

buf는 데이터를 담기 위한 임시적 공간이다. 위 코드에서는 buf의 용량을 5로 설정했다. 사용자 버퍼의 크기 설정은 결국 사용자가 임의로 지정할 수 있다. 

`is.read(buf)`에서 buf를 인자로 넣은 것은, is가 'data.bin'으로부터 데이터를 읽어들일 때 buf의 size만큼 데이터를 읽어들이겠다는 의미가 된다. 이에 따라, 기존 1Byte씩 처리하던 것과는 달리 5Byte를 처리하게 되어 처리속도가 증가하게 된다.

OutputStream을 통해 출력 할 때에도 마찬가지이다.  인자로 사용자 버퍼 배열을 줄 경우, 버퍼 배열의 시작 점과 끝부분만큼 읽어 파일에 저장시킨다. 변수 su는 InputStream이 읽어들인 데이터의 개수를 받게 된다.(is.read의 매개변수에 buf가 들어갔을 때에만 해당, 그렇지 않을 경우 읽어들인 데이터를 반환)


## 3-1. 사용자 버퍼 용량은 어느정도가 적절할까?

사용자 버퍼 용량을 사용자가 직접 지정할 수 있는 것이 장점이지만, 단점이 될 수 있다. 파일 사이즈가 클 경우 5Byte, 7Byte와 같은 용량은 의미가 없다. 용량 설정 시 처음부터 큰 용량을 지정할 수도 있다. 아래 코드를 보자.

```java

File f = new File("db.bin");
byte[] buf = new byte[(int)f.length()];

// ... 각종 Stream 선언

int su;
while(true){
	su = is.read(buf);
	if(su == -1) break;
	os.write(buf, 0, su);	
}

```

파일 객체를 통해 해당 파일의 용량을 가져올 수 있는데, 사용자 버퍼의 크기를 파일 사이즈만큼 준다면 반복문 실행 횟수는 단 한 번으로 끝나게 된다. InputStream이 읽어 들일 때 buf 용량만큼 읽어들이니,  그 다음 반복문을 실행할 때 변수 su는 -1이 된다. 

위와 같은 코드는 속도는 빠르나 자원 관리 측면에서는 썩 좋지 않다. 만약 파일이 1GB, 10GB를 넘어간다면, 위 동작을 수행하는 동안 메모리에는 파일 사이즈 용량을 그대로 차지하게되는 셈이다. 이는 자원소모측면에서 큰 손해가 된다. 그렇기 때문에 위와 같은 사용자 버퍼 크기 지정은 적절하지 않다.

사용자 buffer 용량은 크면 클 수록 데이터를 읽어들이는 횟수를 감소시키는 효과가 있다. 하지만 그만큼 RAM에 적재하는 데이터가 늘어나고, RAM에 부담을 주게된다. 

이러한 고민을 덜기 위해서, 사용자 buf를 사용하지 않고 BufferedInputStream, BufferedOutputStream과 같은 filterStream 객체를 활용할 수 있다. 해당 필터 스트림들은 자체적으로 buffer를 가지고 있으며, 그 용량 또한 적절한 size로 조정되어있어 자원적, 속도의 문제에서 벗어날 수 있다.