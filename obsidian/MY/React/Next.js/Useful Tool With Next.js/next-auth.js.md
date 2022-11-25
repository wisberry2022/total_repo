

# 0. What is next-auth.js?

next-auth.js는 Next.js에서 OAuth2.0을 편리하게 구현할 수 있도록 도와주는 next.js 전용 라이브러리이다. standalone package가 아니며 반드시 next.js와 함께 사용하여야한다. OAuth2.0의 복잡한 절차를 next-auth.js가 대신 처리해주며, Authorization grant 제출 및 Access Token 발급, Refresh Token 발급 또한 단 하나의 파일에서 처리 가능하다.


## 1. ServerSide

next-auth를 사용하기 위해서는 next.js에서 제공하는 자체 서버인 /pages/api 폴더에 `[...nextauth].ts` 파일을 생성해야한다. 사용자가 어플리케이션에서 소셜로그인을 진행하였을 때, 토큰을 발행하고, 프론트단으로 전달하는 등 다양한 역할을 해당 파일에서 진행한다.

Resource Owner의 정보를 가지고 있는 Resource Server를 next-auth.js에서는 Provider라고 부르기도 한다. 해당 문서에서는 Resource Server를 Provider와 동일한 것으로 간주하여 특별한 언급이 없다면 Provider라고 부르겠다.

Provider`[...nextauth].ts` 파일에서는 Provider에 등록한 Client ID와 Client Secret를 불러와야 한다.

``` typescript

import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
	providers: [
		NaverProvider({
			ClientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
			ClientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET as string,
		})
	]
})

```

next-auth에서는 naver이외에도 google, kakao, 등 다양한 소셜서비스의 OAuth2.0 기능을 제공한다. 위 코드는 Naver를 예시로 작성한 것이며, 위와 같이 작성하면 어플리케이션에서 소셜로그인을 진행하였을 때 위 파일에 등록된 ClientID와 Secret을 통해 권한 부여 동의를 진행하고, ACCESS_TOKEN을 발급받게 된다.

물론 Provider로부터 Redirect URL을 등록하고, 어플리케이션을 등록하여 Client ID와 Secret을 발급받아야한다. 

위와 같이 설정하면 소셜로그인을 진행했을 때 Provider로부터 Authorization Grant 발급 과정을 거치게 된다.



## 2. ClientSide

client side에서는 사용자가 소셜로그인을 진행할 수 있도록 간단한 처리를 해주어야 한다. 아래 코드를 보자.

``` typescript

import {signIn, signOut, useSession} from 'next-auth/react';

const App = () => {
	const {data:session, status} = useSession();
	return (
		<>
			<button onClick={() => (signIn('naver'))}>로그인</button>
			<button onClick={() => (signOut())}>로그아웃</button>
		</>		
	)
}
```

로그인을 하고 싶다면, signIn 함수에 소셜로그인을 진행하고자 하는 provider의 영어이름을 파라미터로 넣어주면 된다. 그걸로 끝이다. 

signIn을 진행하면, 파라미터로 넣은 provider로부터 권한 부여 동의를 진행하게 된다. Provider에서 제공하고자 하는 개인 정보들(프로필 사진, 닉네임, 이메일 등등)을 어플리케이션에서 수집할 것임을 동의하는지에 대한 절차이다. 사용자가 동의하게 되면, Provider는 Client가 사전에 등록한 Redirect URL로 웹 브라우저와 사용자를 안내한다. 이 때, Access Token이 발행된다.

`useSession`은 로그인 이후 사용자의 정보를 프론트 단에서 받아올 수 있도록 next-auth에서 제공하는 Hook이다. useSession에서는 로그인을 진행한 사용자의 데이터와 토큰의 만료기한이 담긴 `data` 객체와, 소셜로그인의 상태가 담긴 status를 사용할 수 있다. 



## 3. Callback

`[...nextauth].ts`에서는 provider에게 Authorization Grant를 제출하고 사용자와 웹브라우저를 Redirection URL로 이동시키기전까지 특정 행위를 등록할 수 있다. 