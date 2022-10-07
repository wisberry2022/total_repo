# MongoDB Tutorial


mongodb는 SQL을 사용하는 기존의 관계형데이터베이스(RDB)와 달리, SQL에 의존하지 않고 DB를 관리할 수 있는 NoSQL(NotOnly SQL) 데이터베이스이다. MongoDB는 기존 RDB와 매우 다른 형태를 띄고 있는데, 대표적으로는 Table이 존재하지 않는다는 점이다. 여러 개가 존재하는 Table 끼리 특정 관계를 맺고 있는 RDB와 달리, MongoDB는 모든 데이터가 하나의 문서형태로 작성된다. MongoDB의 구조에 대해 알아보자.



# 1. MongoDB의 구조

MongoDB는 Collection, Document의 구조로 이루어져있다. Document는 DB 내에 존재하는 key-value와 같이 pair 형태를 지닌 데이터를 의미한다. 기존 RDB의 Record와 비슷한 개념이다. 이러한 Document들이 모인 것을 Collection이라고 한다. Collection은 Document들의 집합이며, 하나의 데이터베이스 내부에는 여러 개의 Collection이 있을 수 있다. Collection은 기존 RDB의 Table과 비슷한 개념이다. 



# 2. Schema

MongoDB는 RDB와는 많이 다르기에 RDB에서 사용하는 개념이 정확히 일치하지 않는 경우가 있다. 기존 RDB에서 사용하는 스키마 또한 그러하다. MongoDB는 Table 기반 데이터베이스가 아니기 때문에 Schema에 대한 개념이 RDB에 비해 유연하다.

* Schema란, 데이터베이스에서 자료의 구조, 자료의 표현 방법, 자료 간의 관계를 형식 언어로 정의한 구조이다.

MongoDB는 document 내부에 어떤 데이터도 들어갈 수 있다. 어떤 자료형도 신경쓰지 않고 Document에 추가할 수 있다. 이는 MongoDB의 유연함으로 받아들일 수도 있지만, 치명적인 단점으로 작용할 수도 있다. 

NodeJS와 MongoDB를 연결해주는 ODM인 Mongoose에서는 MongoDB에서 Schema를 작성할 수 있게 도와준다. 이를 통해 document에 들어가는 데이터의 자료형을 지정하여 불필요, 잘못된 데이터가 삽입되는 것을 방지한다. Schema 작업을 해주는 것은 RDM의 Table을 지정하는 것과 비슷하다고 생각하면 된다.

```javascript

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  contents: { type: String, required: true },
  date: { type: String, required: true }
});

```

위와 같이 작성할 수 있다.