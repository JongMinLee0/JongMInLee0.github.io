---
layout: post
title: "[Java] Class.forName()에 대해서"
subtitle: ' About Class.forName() of java Reflection'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Java
  - Servlet
  - Class
---

## 1. 들어가며

Java pattern을 공부하며 source code 중에서 이해가 안됬던 부분이 있었습니다. 바로 아래의 부분입니다.<br />
```java
command = (Command)Class.forName(cmdClass).newInstance();
```
Class.forName을 처음 보는 것은 아닙니다. 바로 JDBC에서 봤었습니다.
```java
Class.forName("oracle.jdbc.driver.OracleDriver");
```
이 부분이다!
사실 기존에 이 코드를 작성할 때는 정해진 관례처럼 사용했었습니다. 그러다가 이번에 공부를하며 다시 등장하여 혼란스럽게 만든 것 입니다. 그렇다면 이 Class.forName이 무엇인지 알아보자!!

<br />

## 2. Java Reflection
Class.forName()은 사실 자바 리플렉션 API(Java Reflection API)의 일부입니다. 자바 리플렉션 API란 간단히 말해서
**구체적인 클래스의 타입을 알지 못해도 클래스의 변수 및 메소드 등에 접근하게 해주는 API**입니다.(동적 바인딩)

Reflection은 실행중인 자바프로그램 내부를 검사하고 내부의 속성을 수정할 수 있도록 해줍니다.
그런데 여기에서 한가지드는 의문점이 있습니다. 구체적인 클래스 타입을 알지 못하는데 어떻게 접근할 수 있을까요?

그 이유는 자바의 클래스파일들은 바이트코드로 컴파일되어 static과 함께 method영역에 저장되어 집니다. 때문에 클래스 이름만 알면 클래스의 정보를 찾을 수 있는 것이다.

자바 리플렉션은 동적 바인딩 이라고도 하는데 Runtime에 타입이 정해진다는 말입니다. 그렇다면 어떻게 사용하는지 코드를 통해 알아봅시다.

## 3. Example

예시에서는 Command pattern에서 사용한 코드의 일부분을 이용하겠습니다!<br />
(Java pattern글을 안보고 오셨다면 여기로! ([Jave EE 패턴](https://jongminlee0.github.io/2019/06/27/command/))

**FrontController.java**
```java
    private Properties cmdMapping;

     @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String cmd = req.getParameter("cmd");
        String cmdClass = (String)cmdMapping.get(cmd);
        Command command = null;

        try{
            command = (Command)Class.forName(cmdClass).newInstance();
        }catch(ClassNotFoundException | IllegalAccessException | InstantiationException ex){
            getServletContext().log("Class not found", ex);
        }
        command.setReq(req);
        command.setRes(resp);
        command.setServletContext(getServletContext());
        command.execute();
    }
```

여기서 **try**문 내부를 보게 되면 동적바인딩이 사용된 것을 볼 수 있습니다.<br />
Class.forName(cmdClass)에서 cmd클래스는 mapping에서 어떠한 것을 가져오고 있습니다. cmdMppaing 객체는 Properties파일에 저장된 url경로를 가져오는 역할을 합니다. 그렇다면 왜 사용되었는지 어느정도 짐작이 가실 겁니다. Client로 부터 오는 요청 url은 한개만 존재하는 것이 아니라 여러개가 존재합니다. 우리가 모든 요청에 대해서
응답할 수 있도록 모든 경우를 코드로 작성한다면 정말 비효율적일 것입니다. 또한 추후에 유지보수에 어려움이 따를 것 입니다.

그러나 동적방인딩을 이용한다면 각각의 url에 대해서 직접 대응하지 않고, runtime시 결정된 클래스에 대응하게 만든다면 효율적이고 유지보수가 쉬운 코드를 작성할 수 있을 것 입니다.

## 4. 글을 마치며

사실 Java Reflection에는 Class.forName()말고도 만은 메서드가 존재합니다. 그러나 이번 글에서는 저의 궁금점인 Class.forName()에 대해서만 다루었습니다.
나중에 기회가 된다면 Java Reflection에 대해 더 자세히 알아보겠습니다. 감사합니다!!

## 5. Reference

- https://kmongcom.wordpress.com/2014/03/15/자바-리플렉션에-대한-오해와-진실/
- https://kaspyx.tistory.com/80
- https://gyrfalcon.tistory.com/entry/Java-Reflection





