
Next.js는 자체 내장 서버를 제공하기 때문에, 다른 웹서버 프레임워크에서처럼, DB를 연결하는 것이 가능하다.  다만 Express.js에서 MongoDB를 연결하는 것보다는 조금 까다롭다.


## 0. DB 연동을 위한 폴더 구조

![[image01.png | 250]]

나는 pages 폴더 내에 db 폴더를 만들고 내부에 models 폴더와 db를 커넥트할 `db.ts` 파일을 만들었다. db.ts 파일은 아래와 같다.


## 1. db.ts 

```typescript

import mongoose from 'mongoose';

interface Connect {
  isConnected?: number;
}

const connection: Connect = {}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(`mongodb+srv://wisberry2022:chvrches409@cluster0.8xydiec.mongodb.net/TypeStudy?retryWrites=true&w=majority`)
  connection.isConnected = db.connections[0].readyState;
  console.log('mongodb connect!')
}

export default dbConnect;
```

초기 Connect라는 비어있는 객체 변수를 선언하고, dbConnect 함수에서 mongoose를 활용하여 DB와 연결한다.


## 2. ./model/user.ts

```typescript

import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
})

export default mongoose.models.User || mongoose.model('User', TestSchema, 'User');

```

중요한 점은, export default에 model을 선언하는 부분과 이미 선언된 모델을 불러오는 형태 두 가지를 조건부로 export하고 있다는 점이다.  nextjs에서 api 주소로 요청을 보낼 경우, MongoDB에서 Model을 계속해서 overwrite하게 되어 오류가 발생한다. 따라서 mongoose.model 코드만 export하지 않고, 이미 있을 경우 models.User를 export 하여 오류를 방지할 수 있다.


## 3. /pages/api/hello.ts

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../db/db';
import User from '../db/models/User';
import mongoose from 'mongoose';
import nextConnect from 'next-connect';

new User();

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await dbConnect();
  const User = mongoose.models.User;
  User.insertMany(req.query);
  console.log(req.query)
  res.status(200).send({ name: 'John Doe', fetchResult: true });
})

export default handler;

```

db 폴더에서 생성한 dbConnect와 model폴더에서 생성한 User를 임포트한다. user.ts에서 생성한 모델을 적용시키기 위해 hello.ts 파일의 전역레벨에 `new User()`를 통해 User 모델을 초기에 실행시키고, /api/hello.ts 로 get 요청이 들어 올 때, 쿼리스트링을 받아 Collection User에 document를 추가시키는 코드를 작성한다.

위와 같은 형태를 통해 Next.js에서 MongoDB로 연결할 수 있다.