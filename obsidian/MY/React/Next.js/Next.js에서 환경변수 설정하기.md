

Next.js로 개발을 하면 노출되어서는 안되는 데이터들은 환경변수에 저장해두고 `process.env.HIDDEN_DATA`와 같이 불러온다. 환경변수는 프로젝트의 루트 폴더에 `.env` 라는 파일을 생성하여 사용할 수 있는데, 아래와 같이 작성할 수 있다.

```

NEXT_PUBLIC_API_KEY = 'LDKWLdlakspqow152'

```

위와 같이 `NEXT_PUBLIC`이라는 prefix를 삽입하여 변수를 선언하면, .tsx 파일이나 .ts파일에서 `process.env.NEXT_PUBLIC_API_KEY`외 같은 형태로 사용할 수 있다. 