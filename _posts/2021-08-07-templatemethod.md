---
layout: post
title: "[Java] Template Method Pattern(템플릿 메소드 패턴)"
subtitle: 'About Template Method pattern'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Method Pattern
  - Java
---

# Template Method Pattern
**Template Method Pattern**은 알고리즘의 뼈대만을 정의 하고 각 단계에서 수행할 구체적인 처리는 SubClass 쪽으로 미룹니다. 알고리즘의 구조 자체는 그대로 놔둔 채 알고리즘 **각 단계 처리**를 SubClass에서 재정의할 수 있게 합니다.  


#### 활용
- 어떤 한 알고리즘을 이루는 부분 중 변하지 않는 부분을 한 번 정의해 놓고 다양해질 수 있는 부분은 SubClass에서 정의할 수 있도록 남겨두고자 할 때
- SubClass 사이의 공통적인 행동을 추출하여 하나의 공통 클래스에 몰아둠으로써 **코드 중복**을 피하고 싶을 때
- SubClass의 확장을 제어할 수 있습니다. Template Method가 어떤 특정한 시점에 **hook연산**을 호출하도록 정의함으로써, 그 특정 시점에서만 확장되도록 합니다

<br />

## Example
<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/128596291-f1bafeac-9df9-4a7e-863a-633d7c02b36c.jpg">
</p>

- **ClubBuilder** : 알고리즘의 뼈대를 정의하는 Template Method를 정의합니다. 또한 SubClass들이 재정의 해야할 연산을 정의 합니다.
- **SoccerClub, BasketBallClub** : SubClass로써 각각 다른 알고리즘 처리 단계를 수행하기 위한 기본연산을 구현합니다.


```java
public abstract class ClubBuilder {

    // Template Method
    public final void buildClub(){
        System.out.println("Common Logic.......");
        addClub();
        addMemberToClub();
    }

    public abstract void addMemberToClub();
    public abstract void addClub();

}
```
```java
public class SoccerClub extends ClubBuilder{
    @Override
    public void addMemberToClub() {
        System.out.println("Add John to Soccer Club");
    }

    @Override
    public void addClub() {
        System.out.println("Add Soccer Club!");
    }
}
```
```java
public class BaskballClub extends ClubBuilder{
    @Override
    public void addMemberToClub() {
        System.out.println("Add Jack to Basketball Club");
    }

    @Override
    public void addClub() {
        System.out.println("Add Basketball Club");
    }
}
```
> Template Method를 final로 선언한 것은 Overriding되는 것을 방지하기 위함 입니다.

<br />

**출력 결과**
```java
public static void main(String[] args) {
    SoccerClub soccerClub = new SoccerClub();
    soccerClub.buildClub();

    System.out.println("-------------------------");

    BaskballClub baskballClub = new BaskballClub();
    baskballClub.buildClub();
}
```
```text
Common Logic.......
Add Soccer Club!
Add John to Soccer Club
-------------------------
Common Logic.......
Add Basketball Club
Add Jack to Basketball Club
```

<br />

#### 관련된 글
- **[[Java] Factory Method Pattern(팩토리 메소드 패턴)](/2021/08/08/factorymethod)**

<br />

## Reference
- GoF Design Pattern
- [Implementing the Template Method Pattern In Java](https://www.baeldung.com/java-template-method-pattern)
- [Design Patterns - Template Pattern](https://www.tutorialspoint.com/design_pattern/template_pattern.htm)
- [Using Template Method Design Pattern In Java](https://dzone.com/articles/using-template-method-design-pattern-in-java)