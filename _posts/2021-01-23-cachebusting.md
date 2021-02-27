---
layout: post
title: "[Web] Cache와 Cache Busting이란?"
subtitle: 'About Cache & Cache Busting'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Cache
  - Web
  - HTTP
---


## 들어가며

문제 있던 파일을 배포한 직후, 문제가 발생했었습니다. 새로고침 혹은 Cache를 지운 컴퓨터의 브라우저에서는 수정된 정상적인 파일로 보이게 되지만, 그렇지 않다면 기존의 문제된 파일이 보이게 됩니다. 이러한 현상은 Cache에 의해 발생하게 되는데 왜 발생하고, 어떻게 해결해야 하는지 알아 보도록 하겠습니다. Cache에 대해 전체적으로도 알아보도록 하겠습니다.  
> 만약 바로 Cache busting에 대해 보시려면 [여기](#cache-busting)를 보시면 됩니다.

<br />


# Cache(캐시)  


`웹 캐시는 자주 쓰이는 문서의 사본을 자동으로 보관하는 HTTP 장치 입니다.` 웹 요청이 캐시에 도착 했을 때, 캐시된 로컬 사본이 존재한다면 서버가 아니라 캐시로부터 응답이 제공됩니다. 캐시의 장점은 다음과 같습니다.  
- 캐시는 불필요한 데이터 전송을 줄여서, 네트워크 요금으로 인한 비용을 줄여 줍니다.
- 캐시는 네트워크 병목(Bottleneck)을 줄여줍니다. 대역폭을 늘리지 않고도 페이지를 빨리 불러올 수 있게 해줍니다.
- 캐시는 원 서버에 대한 요청을 줄여줍니다.
- 캐시는 거리로 인한 지연을 줄여줍니다.


이제 **캐시의 특징**에 대해서 보겠습니다.

<br />

### 1. 불필요한 데이터 전송

복수의 클라이언트가 자주 쓰이는 원 서버 페이지에 접근할 때, 서버는 같은 문서를 클라이언트들에게 각각 한 번씩 전송하게 됩니다. 똑같은 바이트들이 네트워크를 통해서 계속 반복해서 이동하며 이 **불필요한 데이터는 값비싼 네티워크 대역폭을 잡아먹고, 전송을 느리게 만들며, 웹 서버에 부하를 줍니다.** 캐시를 이용하면 첫 응답이 캐시에 보관되며, 뒤이은 요청들은 캐시를 응답으로 사용하기 때문에 낭비를 줄일 수 있습니다.  


<br />

### 2. 대역폭 병목

많은 네트워크가 원격 서버보다 로컬 네트워크 클라이언트에 더 넓은 대역폭을 제공 합니다. 때문에 캐시를 사용한다면 네트워크 병목을 줄여주고, 빠른 속도로 문서를 응답받을 수 있을 것 입니다.


<br />

### 3. 갑작스런 요청 쇄도(Flash Crowds)

캐싱은 갑작스런 요청 쇄도에 대처하기에 특히 중요합니다. 갑자스러운 사고, 이벤트 등으로 인해 많은 사람이 거의 동시에 몰릴 수 있습니다. 이 결과로 초래된 트래픽의 급격한 증가는 네트워크와 웹 서버에 심각한 장애를 야기 시킵니다. 캐시를 이러한 급격한 요청 증가에 대응하기에 좋습니다.

<br />

### 4. 거리로 인한 지연

네트워크 통신은 대역폭 문제 외에도, 거리가 문제 될 수 있습니다. 모든 네트워크 라우터는 제각각 인터넷 트래픽을 지연시키며, 빛의 속도 그 자체가 유의미한 지연을 유발하기도 합니다. 허나 캐시를 사용한다면 수천키로의 전송이 수십미터로 바뀔 수 있습니다.

<br />

위의 내용들을 보면 캐시가 유용하다는 것을 부정할 수 없습니다. `그러나 모든 문서를 캐시에 저장하지는 않습니다`. 왜 일까요??  
웹에 올라있는 모든 문서들을 보관할 수 있을 만큼 충분한 캐시를 살 능력이 있는 사람은 거의 없습니다. 만약 **모든 웹에 대한 캐시**를 저장할 수 있다고 해도, 몇몇 문서들은 자주 변경되므로 `항상 신선한 상태를 유지하지 못할 것 입니다.` 그래서 각각의 설정에 의해 캐시에 저장하는 것입니다.  
> 앞으로 캐시에 대해 좀 더 자세히 보겠습니다. 현재까지의 내용으로도 괜찮으시다면 [Cache Busting](#cache-busting)을 보시면 되겠습니다.

<br />

### 5. 적중과 부적중

캐시에 요청이 도착했을 때, 그에 대응하는 사본이 있다면 **캐시 적중(Cache hit)** 없다면 **캐시 부적중(Cache miss)**라고 합니다.  

#### 5-1. 재검사(Revalidation)

원 서버의 콘텐츠와 캐시에 갖고 있는 사본이 다를 수 있습니다.(원 서버의 콘텐츠가 변경되었을 때) 때문에 캐시는 그들이 갖고 있는 사본이 최신인지를 서버를 통해 확인해야 합니다. 이를 **재검사** 라고 합니다.  
캐시는 언제든지 스스로 원할 때 사본을 재검사 할 수 있습니다. 그러나 대역폭이 한정되어 있으므로, 충분히 오래된 경우에만 재검사를 진행합니다. 캐시는 사본의 재검사가 필요할 때, 웹 서버에 재검사 요청을 보내며 콘텐츠가 변경되지 않았다면 **304(NOT MODIFYED)** 응답을 받습니다.  
재검사를 위해서 HTTP는 몇 가지 도구를 제공해주는데, 그 중 가장 많이 쓰는 것이 **If-Modified-Since** 헤더 입니다. 서버에 보내는 GET 요청에 이 헤더를 추가하면 캐시된 시간 이후에 변경된 경우에만 사본을 보내달라는 의미가 됩니다. 해당 요청에는 3가지 상황이 발생할 수 있으며 처리는 다음과 같이 됩니다.  
1. 재검사 적중  
    * 만약 서버 객체가 변경되지 않았다면 **HTTP 304 Not Modified** 응답을 보냅니다.
2. 재검사 부적중
    * 만약 서버 객체가 사본과 다르다면, **서버는 전체 콘텐츠와 함께 HTTP 200 OK 응답**을 보냅니다.
3. 객체 삭제
    * 서버 객체가 삭제되었다면, 서버는 **404 Not Found** 응답을 보내며, 캐시는 사본을 삭제하게 됩니다.

#### 5-2. 적중률

캐시가 요청을 처리하는 비율을 **캐시 적중률** 이라고 하며, 적중률은 0부터 1까지 값으로 되어 있지만 0% ~ 100%로 표시하기도 합니다. 캐시 관리자는 캐시 적중률 100%에 목표를 두고 하지만 이를 마추기는 매우 어렵습니다. 오늘날 적중률 40%면 웹 캐시로 괜찮다고 볼 수 있습니다. 

<br />

### 6. 캐시 토폴로지(Cache Topology)

캐시는 한명의 사용자에게만 할당될 수도 있고, 반대로 수천 명의 사용자들간에 공유될 수도 있습니다. 이를 나누어 **private cache, public cache**라고 합니다. 대표적인 예로 private cache는 개인 웹 브라우저를 들 수 있고, public cache는 proxy cache를 들 수 있습니다. 

<br />

### 7. 캐시 처리 단계

가장 기본적인 캐시 처리 단계를 살펴 보겠습니다.  

1. 요청 받기
    * 캐시는 네트워크로 부터 도착한 요청 메시지를 읽습니다.
2. 파싱
    * 캐시는 메시지를 파싱하여 URL과 헤더들을 추출합니다.
3. 검색
    * 캐시는 로컬에 복사본이 있는지 검사하고, 사본이 없다면 사본을 받아 옵니다.(로컬에 저장)
4. 신선도 검사
    * 캐시는 캐시된 사본이 충분히 신선한지 검사하고, 신선하지 않다면 변경사항이 있는지 서버에 물어 봅니다.
5. 응답 생성
    * 캐시는 새로운 헤더와 캐시된 본문으로 응답 메시지를 만듭니다.
6. 발송
    * 캐시는 네트워크를 통해 응답을 클라이언트에게 돌려줍니다.
7. 로깅
    * 선택적으로, 캐시는 로그 파일에 트랜잭션에 대해 서술한 로그를 남깁니다.


위와 같이 캐시에 대해 알아 보았습니다. 위의 내용외에도 수 많은 내용들이 있습니다. 내용이 너무 방대하여 필요할 때마다 찾아보고, 필요하다면 또 다른 글에서 다루도록 하겠습니다.  
그럼 이제 부터 **Cache Busting**에 대해 보도록 하겠습니다.

<br />

# Cache Busting

정적 파일(static file)은 캐시에 저장되어 만료 될 때까지 오랜시간 동안 존재할 수 있습니다. 만약 사이트를 업데이트 하는 경우 이전 버전의 파일들이 캐시에 남아 변경사항을 알아차리지 못할 수 있습니다. 그 경우 사용자에게 변경되지 않은 문서를 보여주게 됩니다.  
`Cache busting은 unique file version identifier를 사용하여 브라우저에게 새로운 버전이 있음을 알려 줍니다.` 이로써 브라우저는 새로운 버전을 서버로 부터 받아와 사이트를 업데이트 할 수 있게 됩니다.  

Cache buting에는 몇 가지 방법이 존재합니다.  
1. File name versioning(`style.v2.css`)
2. File path versioning(`/v2/style.css`)
3. Query String(`style.css?ver=2`)  

1, 2번의 방법을 가장 추천 합니다. 캐싱 매커니즘을 가장 해치지 않으며, 쉽게 파일들을 업데이트 할 수 있기 때문입니다.(사실 저도 캐싱 매커니즘을 해치지 않는 다는 말을 이해하지 못했습니다...)  

3번의 query string은 캐싱 문제를 일으키는 것으로 알려져 사용을 지양하고 있습니다. 일부 proxy와 CDN은 query string을 사용하지 않도록 제안하고 있습니다.([참고](https://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/))  

이외에도 **HTTP header** 을 통해서 cache를 control 할 수 있습니다. 보통 캐시를 다루는데 사용하는 header는 다음과 같습니다.  
- ETag
- Cache-Control
- Expires
- Last-Modified

마지막으로 한 개발자가 Cache에 대한 **Best Practices**를 올려 놓은 것을 보겠습니다.

#### DO
- Use the Cache-Control and ETag headers to control cache behavior for static assets
- Set long max-age values to reap the benefits of browser cache
- Use fingerprinting or versioning for cache busting

#### Don't
- Use HTML meta tags to specify cache behavior
- Use query strings for cache busting


<br />

---
<br />

문제가 생긴 뒤 Cache Busting에 대해 알게 되었고, 이 과정에서 단순히 **캐시**라고 생각했던 것에 대해 깊이 알게 되었습니다.  
마지막 한 개발자의 **Best Practices**를 보며, 단순히 Cache Busting에 대해서 만 초점이 맞춰져 있던 저는 반성하게 되었습니다. 기존의 Nginx나 Apache Cache 설정등을 확인하지 않고 새로운 것으로 해결하려 했기 때문입니다. 앞으로 다른 문제 발생시에도 이번의 일을 기억하게 될 것 입니다. 긴글 읽어주셔서 감사합니다.  


### Ref
- HTTP 완벽가이드 (저자 : 데이빗 고울리 외 4명)
- [What Is Cache Busting?](https://www.keycdn.com/support/what-is-cache-busting)
- [A Web Developer’s Guide to Browser Caching](https://medium.com/@codebyamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c)
- [What is Cache Busting?](https://medium.com/javascript-in-plain-english/what-is-cache-busting-55366b3ac022)
- [WordPress Cache Busting ](https://www.recolize.com/en/blog/wordpress-cache-busting-design-changes/)
