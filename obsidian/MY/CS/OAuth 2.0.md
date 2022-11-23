
# 0. What is OAuth 2.0 ?

`OAuth`는 인증을 위한 개방형 표준 프로토콜로써, 서드파티 프로그램(Naver, KAKAO, Google etc)에게 리소스 소유자를 대신하여 리소스 서버에서 제공하는 자원에 대한 접근 권한을 위임하는 기술이다.  즉, 개발자가 만든 서비스에 회원가입, 로그인 기능을 직접 구현하지 않고 Naver, KAKAO, Google에 해당 기능을 위임하고, 유저의 정보를 받아올 수 있다. 또한 서드파티가 가지고 있는 사용자의 리소스 조회와 같은 기능들을 개발자의 어플리케이션에서 수행할 수 있다.



# 1. OAuth 2.0의 역할 및 주요 개념

`OAuth 2.0`에서 권한 요청, 인증, 권한 부여를 하는 주체는 크게  네 가지로 구성되어있다. 일반화된 것은 아니며, 상황에 따라 유연하게 변경될 수 있다.

| 정보 | 설명 |
| --- | --- |
| Client | 개발자가 제작한 개인 어플리케이션. 해당 어플리케이션에서 OAuth 2.0을 사용하여 서드파티 로그인 기능을 구현하게 된다. | 
| Resource Owner | 'Resource'는 개인정보라고 이해할 수 있다. 서드파티(Naver, Google, KAKAO) 서비스에 이미 Resource를 저장하고 있으며 Client가 제공하는 서비스를 이용하려는 사용자이다. |
| Resource Server | 사용자의 'Resource'를 가지고 있는 어플리케이션 서버이다. Naver, KAKAO와 같은 서드파티 서비스를 제공하는 업체의 서버이다. Client는 Token을 Resource Server로 넘겨 사용자의 Resource를 응답 받을 수 있다.|
| Authorization Server | 권한 서버로서, 인증에 사용할 아이템을 제공해주는 서버다. 사용자는 이 서버로 ID, PW를 넘겨 Authorization Code(Access Token)를 발급 받을 수 있는데, Client는 Authorization Server로 Authorization Code를 넘겨 Token을 발급 받을 수 있다. |


`OAuth 2.0`에서 주로 사용되는 네 가지 용어가 있다. 아래와 같다.

| 정보 | 설명 |
| --- | --- |
| Authentication | 인증, 접근 자격이 있는지 검증하는 단계를 의미한다. (인증) |
| Authorization | 인가, 자원에 접근할 권한을 부여하는 것. 인가가 완료되면 리소스 접근 권한이 담긴 Access Token이 클라이언트에게 부여된다. (승인)|
| Access Token| 리소스 서버에게서 리소스 소유자의 보호된 자원을 획득할 때 사용되는 만료 기간이 있는 Token |
| Refresh Token | Access Token 만료 시 이를 갱신하기 위한 용도로 사용하는 Token이다. Refresh Token은 일반적으로 Access Token보다 만료 기간이 길다. |




# 2. OAuth2.0에 사용되는 데이터

`OAuth2.0`가 작동하기 위해서 다루어지는 필수 데이터들이 존재한다.  크게 세 가지가 존재하는데 아래와 같다.

## 2-1. 앱의 등록정보

`OAuth2.0`이 작동하기 위해서 앱은 사전에 서드파티 서비스에 등록해야한다. 등록 시에는 앱이 제공하는 서비스의 명칭, 웹 사이트, 로고와 같은 기본정보를 제출한다. 동시에 웹 서버 앱, 브라우저 기반 앱 또는 모바일 앱의 경우에는 반드시 `Redirect URL`에 대한 정보를 추가적으로 등록하여야 한다.

## 2-2. Redirect URL

어플리케이션이 Resource Owner의 자원을 사용하는 것에 Resource Owner가 동의하면, Resource Server는 Resource Owner를 어플리케이션에 등록된 Redirect URL로 이동(Redirection)시킨다. 만일 등록되지 않은 Redirect URL을 담은 요청을 받게 되면 그 요청은 무효 처리된다.

## 2-3. Client ID와 Client Secret

새로 등록하는 어플리케이션은 서드파티 서비스로부터 Client ID와 Client Secret을 발급받는다. Client ID는 공개하는 정보로써 로그인 웹 페이지 또는 JS에 포함될 수 있다. 하지만 Client Secret은 절대로 노출되어서는 안된다. 노출을 방지할 수 없는 SPA / Native 앱의 경우 Client Secret을 사용하지 않는다.

## 2-4. Token

`OAuth2.0`이 지원하는 여러가지 권한 부여 방식들은 모두 토큰을 사용한다. 앱이 요청한 Resource Owner의 정보의 전달을 위해, Client는 Resource Server에게 Access Token을 요청하고 Resource Server는 Access Token을 전달한다. 토큰의 종류로는 Access Token과 Refresh Token이 존재한다. 하지만 `OAuth2.0`에서는 상술한 두 개의 토큰이 가져야 할 특정한 형식은 없다. 즉, 개발자가 임의로 토큰을 구현할 수 있도록 설계되어있다. 대부분 현실에서는 JWT를 채용하여 Access Token과 Refresh Token을 발급한다.

| 토큰 | 설명 |
| --- | --- |
| Access Token | Resource Owner의 데이터에 접근하기 위해 필요한 자격증명으로, Resource Owner가 특정 앱에게 부여한 권한에 대한 정보가 담긴 문자열이다. 해당 토큰에는 접근할 수 있는 특정 Scope들과 접근 가능한 기간 등 사용자가 동의한 사항들에 대한 정보가 포함된다. 이 정보에 기반하여 Resource Server 및 Authorization Server는 앱의 요청에 응하게 된다. |
| Refresh Token | Access Token을 가지고 있다면 누구든지 통제된 데이터에 접근할 수 있다. 따라서 Access Token이 노출될 리스크를 감안하여 보통 Access Token의 유효기간을 짧게 설정한다. Access Token의 유효기간이 만료되었을 경우를 대비하여 앱 개발자는 Refresh Token을 사용한다. 해당 토큰을 활용하면 Resource Owner에게 인증을 반복하게 하지 않고도 Access Token을 새로 발급 받을 수 있게 된다 |



# 3. OAuth2.0 절차

`OAuth2.0`을 사용하여 서드파티 서비스를 이용하기까지는 일부 복잡한 과정을 거쳐야한다.  `OAuth2.0` 프로토콜의 절차는 Resource Owner, Client, Resource Server(+Authorization Server)로 총 3개(경우에 따라서는 권한 제공기관까지 합쳐서 4개)의 주체들이 서로 상호작용하면서 이루어진다.

1. (앱 -> 사용자): 사용자 데이터에 접근하기 위한 권한을 사용자에게 요청한다. 개념적으로는 앱이 사용자에게 요청하는 것이나, 실제 구현은 앱과 사용자 사이에 권한 제공기관(Authorization Server) 혹은 Resource Server가 중개 역할을 하는 경우가 일반적이다.
2. (사용자 -> 앱): 접근에 동의함을 증명하는 권한 부여 동의서(Authorization Grant)를 발급한다. RFC 6749에서는 4가지 유형의 권한 부여 동의서를 정의하고 있다. 앱의 유형 및 Resource Server의 지원 여부에 따라 사용할 권한 부여 동의서의 유형이 결정된다.
3. (앱 -> Authorization Server(Resource Server)): 권한 부여 동의서를 제출하여 Access Token을 요청한다.
4. (Authorization Server(Resource Server) -> 앱): 권한 부여 동의서를 확인하여 사용자가 동의한 데이터 항목, 범위 및 기간 등에 대한 정보가 담긴 Access Token을 제공한다.
5. (앱 -> Resource Server): Access Token을 제출하여 사용자 데이터를 요청한다.
6. (Resource Server -> 앱): 사용자 데이터를 제공한다. 이 때 앱이 제출한 Access Token이 유효함을 확인하고, Access Token의 정보를 확인하여 제공할 데이터의 항목, 범위 및 유효기간이 정해진다.

즉 위 절차를 간단히 세 단계로 요약하면 아래와 같다.

1. 앱은 사용자로부터 사용자의 정보를 사용할 것이라는 동의를 받아야 한다.
2. 앱은 사용자가 동의한 내역을 서드파티 서비스에 제출하여 사용자의 정보에 접근할 수 있도록 Access Token을 요청한다.
3. 서드파티 서비스는 앱이 제출한 정보가 유효할 경우 Access Token을 발급하여 앱에게 전달한다.



## 4. Authorization Grant

Access Token을 요청하기 전에, 앱은 사용자로부터 권한 부여에 대한 동의를 받아야 한다고 전술했다. 이를 권한 부여 동의서(Authorization Grant)랄고 한다. 권한 부여 동의서는 사용자(Resource Owner)가 데이터 접근을 허가했음을 나타내는 증명서로 사용자가 앱에게 발급한다. 권한 부여 동의서를 근거로 앱은 Resource Server에게 사용자 데이터에 접근할 권한을 요청할 수 있다.

`OAuth2.0`에서는 권한 부여 동의서 발급을 위해 4가지의 방법을 제공한다. 승인 코드, 암묵적 동의, 사용자 비밀번호 유형, 앱 인증 유형이 있다. 이 외에 새로운 유형을 추가할 수 있는 확장 메커니즘도 지원한다.

네 개의 방법 중 가장 안전하고, 많이 활용되는 방식은 승인 코드 방식이다.

## 4-1. 승인 코드 유형(Authorization Code Type)

사용자가 Resource Server에 연결하여 인증받고 권한 부여에 동의하면 승인 코드를 발급하는 유형이다.

승인 코드 유형은 신뢰성 높은 앱이 사용하기에 최적화 되어 있다. 승인 코드를 사용할 경우 Access Token 뿐만 아니라 Refresh Token도 요청할 수 있다. 승인 코드는 Redirection 기반 절차를 활용하기 때문에, 앱은 User-Agent를 통해 사용자와 상호작용할 수 있어야 하며, 또한 Resource Server로부터 Redirection URL에서 요청을 수신할 수 있어야 한다.

