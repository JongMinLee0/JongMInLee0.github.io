---
layout: post
title: "[Java] Serialization(직렬화)"
subtitle: ' About Serialization in java'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - JAVA
---

JPA를 학습하다 Serializable을 implements하고 있는 Entity들을 만났습니다. 저는 Serializable을 스스로 implements 해본적이 없었기 때문에 왜 JPA Entity에 Serializable이 붙을까라는 생각이 들었습니다. 이 기회에 Java에서의 Serializable에 대해 알아보겠습니다.


## 1. Serializable

직렬화로 해석되는 Serializable은 객체를 byte stream으로 변환하는 메커니즘 입니다. 객체를 byte stream으로 변환하는 이유는 디스크, 데이터베이스 등에 저장하기 위해서 입니다. 직렬화가 있다면 역직렬화(Deserialization)도 있습니다. 이 역직렬화는 직렬화와 반대의 수행을 합니다. 파일, 데이터베이스에 있는 데이터를 다시 객체로 만들어 주는 역할을 합니다.

직렬화는 인스턴스에 독립적입니다. 독립적이라는 의미는 객체를 직렬화한 플랫폼과 다른 곳에서 역직렬화를 수행할 수 있다는 것입니다. 직렬화를 수행하기 위해서는 `Serializable`이라는 인터페이스를 implement해야만 합니다. `Serializable` 인터페이스는 **marker interface**(메소드가 없는(empty)) 인터페이스 입니다. `Serializable` 인터페이스를 implements하게 되면 JVM에 직렬화 준비된 객체라는 것을 알려주게 됩니다. JVM은 2개의 메소드를 통해서 읽기, 쓰기를 진행합니다.

```java
public final void writeObject(Object o) throws IOException;
```
Object를 byte stream으로 변환해 줍니다. ObjectOutputStream의 중요한 메소드 입니다. Serializable 인터페이스를 implements하지 않은 Object를 직렬화하려고 한다면 `NotSerializableException`을 throws 합니다.

```java
public final object readObject()
    throws IOException, ClassNotFoundException;
```
byte stream을 읽어서 Java 객체로 변환합니다. ObjectInputStream의 중요한 메소드 입니다. 직렬화 할 수 있는 Object를 찾지 못하면 `ClassNotFoundException`을 throws 합니다.

이외에도 두 메소드 공통적으로 `InvalidClassException`, `IOException`, `NotSerializableException` 등을 발생 시킵니다.

간단한 실습을 통해 알아보겠습니다.

일반적인 Java project에서 실습을 진행하겠습니다.
```java
public static void main(String[] args) {
    String filePath = "data.ser";
    String message = "Java Serialization is Cool";

    try {
        FileOutputStream fos = new FileOutputStream(filePath);
        ObjectOutputStream outputStream = new ObjectOutputStream(fos);

        outputStream.writeObject(message);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
위의 main함수를 실행하게 되면 프로젝트 경로에 **data.ser**파일이 생성됩니다. 내용을 확인해 보면 작성한 message가 잘 써진 것을 볼 수 있습니다. 이것이 가능한 이유는 String 클래스가 Serializable을 implements하고 있기 때문입니다.
```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
```
이제 써진 파일을 다시 읽어와 보도록 하겠습니다.

```java
public static void main(String[] args) {
    String filePath = "data.ser";

    try {
        FileInputStream fis = new FileInputStream(filePath);
        ObjectInputStream inputStream = new ObjectInputStream(fis);

        String mesaage = (String)inputStream.readObject();

        System.out.println("Message : " + mesaage);
    }catch (ClassNotFoundException | IOException e) {
        e.printStackTrace();
    }
}
```
```text
Message : Java Serialization is Cool
```
위의 결과가 console창에 출력되는 것을 확인할 수 있습니다.
좀 더 복잡한 Class Object를 이용해서 실습해 보겠습니다.
```java
public class Student implements Serializable {
    public static final long serialVersionUID = 1234L;

    private  long studentId;
    private String name;
    private transient int age;

    public Student(long studentId, String name, int age) {
        this.studentId = studentId;
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

여기에서 눈여겨 봐야할 것이 2가지 있습니다.
- serialVersionUID
- transient

##### serialVersionUID
serialVersionUID는 JVM에서 고유하게 식별하는 상수 입니다. 저장 및 로드 된 오브젝트가 동일한 속성을가지고 호환되는지 확인하는데에 사용합니다. serialVersionUID를 선언하지 않으면 JVM에서 자동으로 생성해 줍니다. 그러나 명시하는 것을 권장사항으로 하고 있습니다. 그 이유는 Class가 update될 경우 serialVersionUID가 변경될 수 있습니다. 그 경우 저장되어있는 UID와 객체의 UID가 다르기 때문에 `InvalidClassException`을 발생시킵니다. 혹은 컴파일러가 변경될 경우 역시 에러가 발생할 수 있습니다. 이 때문에 serialVersionUID를 명시하는 것을 권장으로 하고 있습니다.

##### transient
transient는 어딘가 낯 익은 단어입니다. JPA에서 데이터베이스에 연관 짓고 싶지 않은 변수 위에 `@Transient`어노테이션을 선언했었습니다. 여기서도 같은 역할을 해줍니다. transient 표시 되어 있는 변수는 직렬화에서 제외되어 write와 read하지 않습니다. 

```java
public static void main(String[] args) {
    String filePath = "students.ser";
    Student student = new Student(123, "Min", 22);

    try {
        FileOutputStream fos = new FileOutputStream(filePath);
        ObjectOutputStream outputStream = new ObjectOutputStream(fos);

        outputStream.writeObject(student);
    } catch (IOException e) {
        e.printStackTrace();
    }
    
}
```
Student객체를 직렬화하여 파일로 **student.ser**파일로 저장했습니다. 이제 다시 불러와 보도록 하겠습니다.

```java
public static void main(String[] args) {
    String filePath = "students.ser";

    try {
        FileInputStream fis = new FileInputStream(filePath);
        ObjectInputStream inputStream = new ObjectInputStream(fis);

        Student student = (Student) inputStream.readObject();

        System.out.println(student);
    } catch (IOException | ClassNotFoundException e) {
        e.printStackTrace();
    }
}
```
이제 console의 결과를 확인해 보겠습니다.
```text
Student{studentId=123, name='Min', age=0}
```
위에서 write 할 때와의 차이를 보면 **age**를 22로 객체를 생성했는데 결과는 0이 나와습니다. transient되어 있기 때문에 직렬화시에 무시된 것을 확인할 수 있습니다.
> 역직렬화하여 불러올 때 Object 타입으로 불러오게 됩니다. 때문에 불러온 Object에 (Student)와 같이 명시적으로 Cast해줘야 합니다.

직렬화시 몇 가지 주의사항이 있습니다.
- 클래스가 **Serializable** 인터페이스를 implements하고 있는 경우 모든 하위 클래스도 직렬화가 가능합니다.(여기서 하위 클래스는 상속 받고 있는 클래스를 말합니다.)
- 반대로 클래스에서 다른 객체를 참조하고 있는 경우 그 객체에서 별도로 **Serializable** 인터페이스를 implements해줘야 합니다.
- static 변수는 객체 자체의 일부가 아니므로 직렬화 되지 않습니다.
- Collection이나 Array를 직렬화 하는 경우 모든 요소가 직렬화 가능해야 합니다.(아닌 경우 NotSrializableException 발생)
- 직렬화 가능 클래스 : 기본 Wrapper클래스(Integer, Long, Double...등), String, Date, collection 클래스 등 가능

지금까지 Java의 Serializable에 대해 알아 보았습니다. 마지막으로 제가 궁금해 했던 JPA, Hibernate에서 사용하는 이유에 대해 보겠습니다.


## JPA에서의 사용이유
단지 persistence가 목적이라면 Serializable은 필요하지 않습니다. 그러나 Entity에 Serializable을 구현(implements) 하는 것이 권장 사항 입니다. 

> JPA spec  
> Entity는 객체와 분리되어 값에 의해 전달된다. 때문에 Entity class는 반드시 Serializable interface를 implments 해야한다.

Presentation layer에 domain(entity) 객체를 DTO나 VO대신 보낼 때 우리는 값으로써 전달합니다. 이 경우 Serializable을 implements해야 합니다. 그 이유는 HTTPSession에 값을 저장할 수도 있기 때문입니다.(caching/optimization 목적으로서). 또한 SerialVersionUID를 사용하기 위함도 있습니다. 좀 더 자세한 사항은 [이 글](https://bvaisakh.wordpress.com/2015/03/04/do-jpa-entities-have-to-be-serializable/)을 확인해 주시기 바랍니다.


#### 참고
- baeldung(https://www.baeldung.com/java-serialization)
- greeksforgeeks(https://www.geeksforgeeks.org/object-serialization-inheritance-java/)
- codejava(https://www.codejava.net/java-se/file-io/why-do-we-need-serialization-in-java)
- bvaisakh(https://bvaisakh.wordpress.com/2015/03/04/do-jpa-entities-have-to-be-serializable/)