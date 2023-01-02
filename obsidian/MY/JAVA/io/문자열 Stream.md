

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