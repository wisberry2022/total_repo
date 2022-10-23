
# 0. Next.js에 들어가기 앞서

Next.js는 React로 만들 수 있는 서버사이드 렌더링(SSR) 프레임워크이다. Next.js를 소개하기 앞서 서버사이드 렌더링이 무엇인지 알아보자.


## 0-1. SSR이란 무엇인가? 

사용자에게 보여줄 페이지를 서버에서 모두 구성하여 사용자에게 보여주는 방식이다. 이는 JSP/Servlet의 아키텍처에서 이 방식을 사용했다.

SSR을 사용하면 모든 데이터가 매핑된 서비스 페이지를 브라우저(클라이언트)에게 곧바로 전송할 수 있다. 서버의 리소스를 사용하기 때문에 CSR(Client-Side Rendering)보다 페이지 구성 속도가 느리다는 단점이 있지만, 사용자에게 전달하는 페이지가 완료되는 시점은 CSR보다 빠르다. 더불어 SEO(Search-Engine-Optimization) 또한 쉽게 구성할 수 있다는 장점이 존재한다.

## 0-2. SSR vs CSR

CSR은 SSR보다 초기 전송되는 페이지 속도는 빠르나, 서비스에서 필요한 데이터를 클라이언트에서 추가로 요청하여 재구성해야하기 때문에 전체적인 페이지 완료 시점은 SSR보다 느리다.



# 1. Next.js 시작하기

Nextjs는 React와 동일하게 CRA 앱을 통하여 프로젝트를 생성할 수 있다. 다만, Next.js에서는 CRA가 아닌, Create-Next-App이다. 

```bash
npx create-next-app <MyAppName>
```

위 명령어를 통해 Next.js 프로젝트를 생성했다면, 그 다음은 개발환경실행이다. 일반 React에서는 npm run start / npm start를 통해 개발 환경을 실행하였다. 하지만 Next.js에서는 사정이 좀 다르다. 
Next.js는 SSR을 지원하기 때문에, 자체적으로 서버가 내장되어있다. 따라서 React로 시작한 프로젝트이지만, 그것을 구동하는 프로세스는 서버를 사용하여 React와 연동하는 것과 유사하다. 

Next.js는 개발환경 실행 - 배포 파일 생성 - 서비스 시작 이라는 프로세스를 거친다. 이는 리액트와 NodeJS를 활용하여 프론트단과 서버단을 연결한 후, React 프로젝트를 빌드한 후 Node를 실행시킴으로써 리액트 프로젝트를 불러오는 것과 동일하다.

1. 개발환경 실행 - npm run dev
2. 배포 파일 생성 - npm run build
3. 서비스 시작- npm run start

일반 React에서의 npm run start는 Next.js에서의 npm run dev와 동일하다. 로컬 환경에서 실행되어 자신이 작성한 코드가 로컬 환경에 즉각 반영된다.

