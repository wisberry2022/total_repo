# Heroku

Java, Node.js, Python등 여러 언어를 지원하는 PaaS 클라우드이다. 

	- PaaS 클라우드란? 
		- 서비스형 플랫폼(Platform as a Service, Paas)은 클라우딩 컴퓨터 서비스 분류 중 하 
            나다. 앱을 개발, 구현 할 때 관련 인프라를 만들고 유지보수하는 복잡함 없이 앱의 개발, 
            실행, 관리를 도와주는 플랫폼이다. 개발을 위한 플랫폼을 구축할 필요없이, 필요한 개발 요 
            소를 웹에서 쉽게 빌려쓸 수 있게 하는 모델 


## Heroku pull 하기


``` bash

$ heroku login
$ heroku git:clone -a practice04

```

위 코드를 실행하면 heroku에 등록된 프로젝트를 clone할 수 있다.


## Heroku push 하기

``` bash

$ git add .
$ git commit -am "make it better"
$ git push heroku master

```

React 소스들을 build 했다면,  위 코드를 통해 개발자가 별도의 `Node.js` 실행 없이 heroku로 배포할 수 있다.


## Heroku with React

React로 개발한 소스들은, `npm run build` 를 통해 Heroku Project에 포함된다.  build된 React 소스들은 `Node.js`  서버에서 사용자가 특정 주소로 접속했을 시 React 소스를 뿌려주게 된다.  즉, heroku 배포를 위해서는 리액트 소스를 build 하여 `Node.js`  서버가 React 소스를 브라우저에 뿌릴 수 있게 만들고, heroku push를 하게 되면 heroku에서 자동으로 `Node.js` 서버를 실행시키게 되어 배포가 되는 것이다.

