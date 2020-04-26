---
layout: post
title: "[Java] Java8 Interface default method"
subtitle: ' About Default method in java8'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - JAVA
---

Java8 이전의 **interface는 abstract(추상)** 메서드만 가질 수 있었습니다. 모든 메서드는 기본적으로 접근제어자는 public이고, abstract 메서드 입니다. 그러나 Java8이 등장하면서 **default method**와 **static method**가 추가 되었습니다. 이 두가지에 대해 알아보도록 하겠습니다.



## 1. Default Method
기존에 interface에는 한 가지 불편한 점이 존재했습니다. Interface A가 존재할 때 A를 implements한 B, C, D클래스가 있다고 해보겠습니다. 만약 Interface A에 메서드를 1개 추가한다면 B, C, D를 모두 수정해줘야 합니다. 지금은 1개의 interface와 3개의 클래스 밖에 되지 않지만 만약 수십, 수백개라면 엄청나게 복잡한 작업이 될 것 입니다. interface의 메서드를 의무적으로 구현(implements)해야 한다는 점이 장점이 될 수도 있으나 단점이 될 수도 있기 때문에 default method가 등장했습니다. 

먼저 코드를 확인해 보겠습니다. interface 1개와 interface를 구현한 클래스 1개, main 클래스를 구현하겠습니다.

```java
public interface DefaultInterface {

    void printMessage();

    default void defaultMessage(){
        System.out.println("default Message!!");
    }

}

public class DefaultExam implements DefaultInterface {

    @Override
    public void printMessage() {
        System.out.println("print Message!!");
    }

}

public class MainClass {

    public static void main(String[] args) {
        DefaultExam exam = new DefaultExam();
        exam.printMessage();
        exam.defaultMessage();
    }

}
```
default method는 위에서 볼 수 있듯이 **default 키워드**를 메서드 앞에 붙여주고, 메서드 내부를 구현하면 됩니다. Main클래스를 실행하게 되면 아래와 같은 결과가 나오게 됩니다.
```text
print Message!!
default Message!!
```
defaultMessage 메서드를 DefaultExam에서 따로 구현하지 않았지만 Main클래스 처럼 호출하는 것을 볼 수 있습니다. 이는 **상속(extends)**과 같다고 볼 수 있습니다. 그 말은 즉 상속처럼 메서드의 **override**가 가능하다는 것 입니다. DefaultExam을 다음과 같이 변경해 보겠습니다.
```java
public class DefaultExam implements DefaultInterface {

    @Override
    public void printMessage() {
        System.out.println("print Message!!");
    }

    @Override
    public void defaultMessage() {
        System.out.println("override message!!");
    }
}
```
이제 다시 Main 클래스를 실행시키면 결과는 바뀌게 됩니다.
```text
print Message!!
override message!!
```



## 2. Static Method
static method는 위에서 살펴본 default method와 비슷한 형태 입니다. 위의 interface에 static method를 추가해 보겠습니다.
```java
public interface DefaultInterface {

    void printMessage();

    default void defaultMessage(){
        System.out.println("default Message!!");
    }

    static void staticMessage(){
        System.out.println("static Message!");
    }

}
```

메서드 앞에 static 키워드를 붙임으로서 생성할 수 있습니다. static 이라는 키워드의 의미처럼 이 메서드는 override 할 수 없습니다. Main 클래스에서 다음과 같이 호출해 보겠습니다.
```java
public class MainClass {

    public static void main(String[] args) {
        DefaultExam exam = new DefaultExam();
        exam.printMessage();
        exam.defaultMessage();
        DefaultInterface.staticMessage();
    }

}
```
interface를 직접 호출하면서 **staticMessage()**를 호출 했습니다. 결과는 아래와 같습니다.
```java
print Message!!
override message!!
static Message!
```



## 3. Multiple Inheritance(다중상속)
default method를 사용하며 다중상속에서 문제가 발생할 수 있습니다. 다음 상황을 보겠습니다.
```java
public interface DefaultInterface {

    void printMessage();

    default void defaultMessage(){
        System.out.println("default Message!!");
    }

}

public interface DefaultInterface2 {

    default void defaultMessage(){
        System.out.println("default Message!!");
    }

}

public class DefaultExam implements DefaultInterface, DefaultInterface2 {

    @Override
    public void printMessage() {
        System.out.println("print Message!!");
    }

}

public class MainClass {

    public static void main(String[] args) {
        DefaultExam exam = new DefaultExam();
        exam.printMessage();
        exam.defaultMessage();
    }

}
```
위와 같이 같은 이름의 default method를 갖고 있는 interface 2개를 implements 하는 경우 에러가 발생하게 됩니다. 그 이유는 어떠한 interface의 method인지 부정확하기 때문입니다. 따라서 다음과 같은 경우에는 DefaultExam에서 같은 이름의 default method를 구현해줌으로써 해결할 수 있습니다.
```java
public class DefaultExam implements DefaultInterface, DefaultInterface2 {

    @Override
    public void printMessage() {
        System.out.println("print Message!!");
    }

    @Override
    public void defaultMessage() {
        System.out.println("default message!!");
    }

}
```
> 참고로 요즘 IDE에서는 위와 같은 문제시 컴파일에러가 발생되어 위와 같은 경우가 발생할 일은 없을 것 입니다.


지금까지 Java8에서 추가된 default method와 static method에 대해 알아보았습니다. default method를 보면서 **abstract class(추상클래스)**와 같다고 생각할 수 있습니다. 그러나 Java8에서는 여전히 다른 개념으로 존재하고 사용됩니다. 추상클래스는 생성자를 가질 수 있고, 상태를 가질 수 있습니다. 반면에 인터페이스는 특정 상태를 참조하지 않고, 호출하는 측면에서만 구현될 수 있습니다. 이는 상황과 목적에 따라 구분되어 사용되어야 합니다.


## 4. 참고
- Oracle(https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html)
- Dzone(https://dzone.com/articles/interface-default-methods-java)
- BeginnersBook(https://beginnersbook.com/2017/10/java-8-interface-changes-default-method-and-static-method/)