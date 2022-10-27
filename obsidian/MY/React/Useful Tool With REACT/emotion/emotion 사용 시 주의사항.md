
emotion.js를 사용하기 전에 컴포넌트에서 먼저 import 해주어야 할 것이 있다.

```javascript
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

```

`/** @jsx jsx */`는 babel에게 `React.createElement` 대신 jsx를 jsx라는 함수로 변환하라는 뜻이다. 위 코드를 작성하지 않을 시 `@emotion/react`가 적용되지 않는다.


# 0. 에러발생

하지만 위 코드를 작성하더라도 오류가 발생한다.  `SyntaxError: ... pragma and pragmaFrag cannot be set when runtime is automatic.`  이는 리액트가 런타임에서 해당 줄을 인식하지 못하기 때문에 발생하는 문제이다. 문제 발생 시 아래 코드로 바꿔주어야 한다.

```javascript
/** @jsxImportSource @emotion/react */
import {jsx, css} from '@emotion/react'

```

jsx를 Import 하지 않으면 emotion에서 제공하는 기능을 활용할 수 없다. 따라서 컴포넌트 내에서 emotion을 사용할 때와 별도의 파일을 분리하여 emotion jsx를 모아둘 때에는 반드시 위 코드를 작성하여야 한다.