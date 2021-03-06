---
layout: post
title: "[Server] CGI와 Servlet에 대해서"
subtitle: ' About CGI and Servlet'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Server
  - php
  - Java
---


기존 Java를 이용하여 개발하고 현재는 PHP를 사용하여 업무를 하고 있습니다. 그렇다보니 두 언어의 차이점이 존재하고 그 차이점에 대해 궁금하였습니다. 그 중 PHP의 Fast-CGI를 맞닥드렸습니다. 이 CGI라는 것이 무엇인지 처음 접하고 Servelt에 대한 언급도 있었기에 글을 작성하게 되었습니다.  
> 참고로 Fast-CGI는 CGI와 다르게 동작합니다.(나중에 알게 되었습니다...)


## CGI(Common Gateway Interface)

사실 이 **CGI**라는 것을 알아가며 큰 어려움이 있었습니다. 정의가 굉장이 **둥실?**하다고 느꼈기 때문입니다. CGI에 대해서는 **[이 글](https://kldp.org/node/73386)**을 추천 드립니다. 굉장이 오래된 2006년의 글이지만 사람들의 토론을 보며 얻는 것이 있으리라 생각됩니다. 사실 이 글을 읽고도 머릿속이 제대로 정리가 안된 것은 사살입니다. 이 글을 맞칠 때쯤은 제가 제대로 알고 있었으면 하는 바람입니다.  


CGI는 말 그대로 **인터페이스** 입니다. 동작방식이나 특정 프로그램을 지칭하는 것이 아닌 데이터를 주고 받는 표준적인 규약이라고 보는 것이 맞습니다. Web Server에서 외부 프로그램(CGI scripts)처리하는 인터페이스 입니다.  

CGI에 대해 한줄로 정의하자면 `외부 프로그램을 띄워서 그 결과값을 반환하는 방식에 대한 규약이며, 이 때 쓰이는 외부 프로그램을 통상 CGI 프로그램이라 한다.` 입니다.  

이전에는 **CGI Program**을 작성하는데 **shell Script**와 **perl**이 많이 사용되었기 때문에 **CGI Script**라고 부르곤 했습니다. 그러나 이제는 C, C++, Perl, Visual Basic, Python등 모든 언어를 사용할 수 있습니다. 


<br />

## Servlet

Servlet은 `Java를 사용하여 웹 페이지를 동적으로 생성하는 서버 측 프로그램 혹은 그 사양을 말합니다.` Servlet은 core java class로서 HTTP request를 다룹니다. Servlet 등장 이전에는 CGI가 Server-side Programming에 주를 이루었습니다. 그러나 많은 단점들로 인해서 Servlet이 등장하게 되었습니다.  
<img src="https://user-images.githubusercontent.com/48028667/96367746-ad903400-118a-11eb-8dcb-52c5dc8c68f4.PNG">
위의 사진은 Web Application에서 Servlet의 위치를 보여줍니다. HTTP request 혹은 HTTP server와 DataBase 또는 응용프로그램 사이에서 Middle Layer 역할을 하고 있습니다.  

<img src="https://user-images.githubusercontent.com/48028667/96367851-360ed480-118b-11eb-86b4-bee8b368aed1.PNG">
Servlet은 위와 같은 **Life Cycle**을 가집니다.
- **init()** : 매 request가 아닌 처음 load될 때 한번 실행 됩니다.
- **service()** : 매 request마다 새로운 thread에 의해 호출 됩니다.
- **destroy()** : servlet instance를 삭제할 때 호출됩니다.



<br />

> **CGI**와 **Servlet**의 자세한 구조까지는 다루지 않겠습니다. 기회가 된다면 확인해보도록 하겠습니다.

<br />

### Disadvantage of CGI
<img src="https://user-images.githubusercontent.com/48028667/96367241-969c1280-1187-11eb-9863-b5bcbf4c81f9.PNG" />

위의 그림을 참고하여 보도록 하겠습니다.  
CGI는 매번 request가 올때마다 새로운 **Process**를 생성합니다. 대표적인 단점은 다음과 같습니다.  
1. 클라이언트 수가 증가하면 응답을 보내는데 더 많은 시간이 걸립니다.
2. 각 요청에 대해 새로운 Process를 시작합니다.
3. C, C++, Perl과 같은 Platform 종속 언어를 사용합니다.

> **Httpd** : Apache Hypertext Transfer Protocol / HTTP Daemon, 즉 Web Server의 Background에서 실행되어, 들어오는 서버 요청을 대기하는 소프트웨어 프로그램입니다. 자체(standalone) 데몬 프로세스로 실행하도록 설계되었습니다. 원한다면 요청을 처리하기 위해 process와 thread들을 만듭니다.

<br />

### Advantages of Servlet
<img src="https://user-images.githubusercontent.com/48028667/96367242-97cd3f80-1187-11eb-9961-5fcc3ff30d80.PNG" />

Web Container는 Servlet에 대한 여러 요청을 처리하기 위해 thread를 생성합니다. thread는 공통 메모리 영역을 공유하고 가벼우며, thread간 통신 비용이 낮다는 장점이 있습니다.  
1. **Better performance** : 매 request에 process가 아닌 thread를 생성합니다.
2. **Portability** : Java언어를 사용하기 때문입니다.
3. **Robust** : JVM의 GC(Garbage Collector)가 있기 때문에 매모리 누수를 걱정할 필요가 없습니다.
4. **Secure** : Java를 사용하기 때문에 Script보단 안전합니다.

> **Web Container** : Web Server의 Component 중 하나로 Java Servlet과 상호작용합니다. Web Container는 Servlet의 Life Cycle을 관리하고, URL과 특정 Servlet을 Mapping하여 URL 요청이 올바른 접근 권한을 갖도록 보장합니다.

<br />

현재 **PHP**를 통해 업무를 진행하며 어떻게 보면 **CGI Program**을 다루고 있습니다. 이로 인해 CGI를 처음 접하게 되었고, **Servlet**과의 차이를 보며 기존 알고 있던 Servlet을 좀 더 알게 된 것 같습니다.  
**CGI**와 **Servlet**에 대해 간단하게 개념과 차이점 등을 알아봤습니다. 잘못된 점이 있다면 댓글로 남겨주시면 감사하겠습니다.  




<br />

## Ref
- [Java point](https://www.javatpoint.com/servlet-tutorial)
- [Side Share](https://www.slideshare.net/lavanyamarichamy/java-servlets-and-cgi)
- [techdifferences](https://techdifferences.com/difference-between-cgi-and-servlet.html)