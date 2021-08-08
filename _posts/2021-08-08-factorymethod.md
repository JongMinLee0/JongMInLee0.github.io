---
layout: post
title: "[Java] Factory Method Pattern(팩토리 메소드 패턴) & Abstract Factroy Pattern(추상 팩토리 패턴)"
subtitle: 'About Factory Method pattern & Abstract Factory pattern'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Method Pattern
  - Java
---
Factory Method에 대해 알아보기 전에 Template Method Pattern에 대해 먼저 알게 되면 이해가 더 쉽습니다.  
- **[[Java] Template Method Pattern(템플릿 메소드 패턴)](/2021/08/07/templatemethod)**

# Factory Method
Factory Method Pattern은 객체를 생성하기 위해 interface 또는 abstract class를 정의하지만, 어떤 class의 instance를 생성할지에 대한 결정은 SubClass가 내리도록 합니다. 다르게 말하면 instance 생성에 대한 책임은 SubClass에게 있는 것 입니다.  

Factory Method Pattern은 **가상 생성자(Virtual Contructor)**라고도 부르며 다음과 같은 경우에 사용합니다.  
- 어떤 class가 자신이 생성해야 하는 객체의 class를 예측할 수 없을 때
- 생성할 객체를 기술하는 책임을 자신의 SubClass가 지정했으면 할 때
- 객체 생성의 책임을 몇 개의 SubClass 가운데 하나에게 위임하고, 어떤 SubClass가 위임자인지에 대한 정보를 국소화시키고 싶을 때  

Factory Method를 사용하므로써 얻을 수 있는 이점은 다음과 같습니다.
- SubClass가 생성할 객체 유형을 선택할 수 있습니다.
- 응용프로그램에 국한괸 Class가 코드에 종속되지 않도록 해줍니다.(응용프로그램별 Class를 코드에 바인딩할 필요가 없으므로 느슨한 결합을 해줍니다.)  

<br />

## Example
<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/128630447-bc8e4082-1580-423f-887e-497d16cd0bb9.jpg">
</p>

```java
public interface Subject {
    public void lecture();
}
```
```java
public class Math  implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a Math subject");
    }
}
```
```java
public class Korean implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a Korean subject");
    }
}

```
```java
public class SubjectFactory {

    // factory method
    public Subject getSubject(String subjectName){
        if(subjectName == null){
            return null;
        }
        if("MATH".equalsIgnoreCase(subjectName)){
            return new Math();
        }else if("KOREAN".equalsIgnoreCase(subjectName)){
            return new Korean();
        }

        return null;
    }
}
```
> interface를 사용하여 구현 하였지만 abstract class를 사용하여도 동일한 형태 입니다.

<br />

**출력 결과**
```java
public static void main(String[] args) {
        SubjectFactory subjectFactory = new SubjectFactory();
        Subject subject1 = subjectFactory.getSubject("MATH");
        subject1.lecture();

        Subject subject2 = subjectFactory.getSubject("KOREAN");
        subject2.lecture();
    }
```
```text
Take a Math subject
Take a Korean subject
```



<br />

# Abstract Factory
Abstract Factory Pattern은 상세화된 SubClass를 정의하지 않고 서로 관련성 있거나 독립적인 여러 객체의 군을 생성하기 위한 interface를 제공하는 것 입니다. Abstract Factory Class는 위에서 본 **Factory Method Pattern**을 이용해서 구현 되기 때문에 좀 더 이해가 쉽습니다.

Abstract Factory는 다음의 경우에 사용합니다.
- 객체가 생성되거나 구성, 표현되는 방식과 무관하게 시스템을 독립적으로 만들고자 할 때
- 여러 제품군 중 하나를 선택해서 시스템을 설정해야 하고 한번 구성한 제품을 다른 것으로 대체할 수 있을 때
- 관련된 제품 객체들이 함께 사용되도록 설계되었고, 이 부분에 대한 제약이 외부에도 지켜지도록 하고 싶을 때
- 제품에 대한 Class Libary를 제공하고, 그들이 구현이 아닌 interface를 노출시키고 싶을 때   

Class가 분리되고 같은 군 안에서는 쉽게 대체 된다는 장점이 있지만 새로운 유형을 추가하는 것에 대해서 어려움이 있습니다. 새로운 유형의 객체를 지원하려면 Abstract Factory Class와 모든 SubClass들을 변경해야 하기 때문 입니다.

<br />

## Example
<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/128631515-a7597de9-c365-4547-8238-4ca9a100a80c.jpg">
</p>

```java
public interface Subject {
    public void lecture();
}
```
```java
public class Science implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a Science subject");
    }
}
```
```java
public class Math implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a Math subject");
    }
}
```
```java
public class Korean implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a Korean subject");
    }
}

```
```java
public class English implements Subject{
    @Override
    public void lecture() {
        System.out.println("Take a English subject");
    }
}
```
```java
public interface AbstractFactory<T> {
    T getSubject(String subjectName);
}
```
```java
public class NaturalSciencesFactory implements AbstractFactory<Subject>{

    @Override
    public Subject getSubject(String subjectName) {
        if(subjectName == null){
            return null;
        }
        if("SCIENCE".equalsIgnoreCase(subjectName)){
            return new Science();
        }else if("MATH".equalsIgnoreCase(subjectName)){
            return new Math();
        }

        return null;
    }

}
```
```java
public class LiberalArtsFactory implements AbstractFactory<Subject> {

    @Override
    public Subject getSubject(String subjectName){
        if(subjectName == null){
            return null;
        }
        if("ENGLISH".equalsIgnoreCase(subjectName)){
            return new English();
        }else if("KOREAN".equalsIgnoreCase(subjectName)){
            return new Korean();
        }

        return null;
    }
}
```
```java
public class FactoryProvider {

    public static AbstractFactory getFactory(String choice){
        if(choice == null){
            return null;
        }
        if("LIBERAL".equalsIgnoreCase(choice)){
            return new LiberalArtsFactory();
        }else if("NATURAL".equalsIgnoreCase(choice)){
            return new NaturalSciencesFactory();
        }

        return null;
    }

}
```

<br />

**출력 결과**
```java
public static void main(String[] args) {
        AbstractFactory subjectFactory = FactoryProvider.getFactory("NATURAL");

        Subject subject1 = (Subject) subjectFactory.getSubject("MATH");
        subject1.lecture();

    }
```
```text
Take a Math subject
```


<br />

## Reference
- Gof Design Patterns
- [Factory Method Pattern-java point](https://www.javatpoint.com/factory-method-design-pattern)
- [Design Pattern - Factory Pattern - tutorialspoint](https://www.tutorialspoint.com/design_pattern/factory_pattern.htm)
- [Abstract Factory Pattern in Java - Baeldung](https://www.baeldung.com/java-abstract-factory-pattern)
