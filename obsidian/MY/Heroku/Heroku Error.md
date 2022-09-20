# Heroku Error Handling

## Heroku 재접속

Heroku 프로젝트를 clone 했을 시, git과 마찬가지로 해당 git이 연결된 것이 아니기 때문에 별도의 명령어를 입력하여 git과 연결해주어야 한다

``` bash
$ git init
$ heroku git:remote -a <MyApp>
```

