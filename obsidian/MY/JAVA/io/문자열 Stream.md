

JAVA의 io는 기본적으로 ByteStream을 사용한다. 하지만 문자열 처리를 위해 JAVA에서 특별히 제공하는 객체가 있다. 그것이 바로 Reader, Writer이다. Reader, Writer 객체는 IO에서 문자열 처리를 편리하게 할 수 있도록 도와준다. 


## 1. Reader

Reader는 file을 대상으로 해당 file에 존재하는 문자열 데이터를 읽는 것을 의미한다.

```java

Reader fr = null;

try{
	fr = new FileReader("test01.txt");

	int su;
	while((su = fr.read()) != -1) {
		System.out.println((char)su);
	}

	if(fr != null) fr.close();
}catch(IOException e){
	e.printStackTrace();
}

```

일반적인 FileInputStream과 동일하게 사용된다. read 메소드를 제공하며, 원한다면 사용자 buffer를 추가하여 원하는 만큼 데이터를 읽어올 수도 있다.


## 2. BufferedReader

InputStrea에 BufferedInputStream이 있었던 것처럼, Reader에도 BufferedReader가 있다. Reader에 장착할 수 있으며, 성능 역시 BufferedInputStream과 마찬가지로 Reader보다 성능향상이 존재한다.

```java

Reader fr = null;
BufferedReader br = null;

try{
	fr = new FileReader("test01.txt");
	br = new BufferedReader(fr);

	String msg = "";
	String temp;
	while(true) {
		temp =  br.readLine();	
		if(temp == null) break;
		msg += tmp + "\n";
	}

	if(br != null) br.close();
	if(fr != null) fr.close();
}catch(IOException e){
	e.printStackTrace();
}

```

BufferedReader는 readLine()이라는 자체 메소드를 제공한다. 이는 사용자가 읽어들인 문자열을 굳이 `\n`으로 split하지 않더라도 BufferedReader가 알아서 개행문자를 기준으로 문자열을 읽어들인다. 그렇기 때문에 읽어들인 데이터는 더 이상 int형이 아니기 때문에 null을 만났을 때 break가 발생하도록 코드를 구성하여야한다.



## 3. Writer

Writer는 file을 대상으로 데이터를 쓸 수 있는 OutputStream과 비슷한 객체이다. 

```java

Writer fw = null;

try{
	fw = new FileWriter("test01.txt");

	String msg = "hello";
	fw.write(msg);
	
	if(fw != null) fw.close();
}catch(IOException e){
	e.printStackTrace();
}


```

Writer의 가장 큰 장점은, 문자열을 write 메소드에 인자로 곧바로 넣을 수 있다는 점이다. 문자열을 쉽게 처리할 수 있도록 만들어진 IO 객체라서 그렇다. 


## 4. BufferedWriter

Writer에 Buffer를 장착한 객체이다. Writer보다 성능이 좋다고 한다.

```java

Writer fw = null;
BufferedWriter bw = null;

try{
	fw = new FileWriter("test01.txt");
	bw = new BufferedWriter(fw);

	String msg = "hello";
	bw.write(msg);

	if(bw != null) bw.close();
	if(fw != null) fw.close();
}catch(IOException e){
	e.printStackTrace();
}

```