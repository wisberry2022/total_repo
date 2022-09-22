# nodemon

node.js로 개발한 서버를 구동하면, 실시간으로 코드가 업데이트 되지 않는다. node.js 파일을 수정한 후 서버를 종료한 후 재접속을 하여야 변경사항이 반영되는데, nodemon 라이브러리는 서버의 재접속없이, 단 한번의 실행으로 실시간으로 코드를 변경시켜준다.

```bash
npm install nodemon --save
nodemon server
```

