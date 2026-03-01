---
title: Java 类与接口
date: 2022-04-08
---

## 嵌套类

### 静态嵌套类

```java
public class Outer {
  public static class Nested {}
}

Outer.Nested instance = new Outer.Nested();
```

### 非静态嵌套类
非静态嵌套类又称为**内部类**

```java
public class Outer {
  public class Inner {}
}

Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
```

### 本地类

**在 `方法` 或 `代码块` 内定义的类**

```java
class Outer {
    public void printText() {
				// 本地类
        class Local {}
        Local local = new Local();
    }
}
```

### 匿名类

```java
public class SuperClass {
  public void doIt() {
    System.out.println("SuperClass doIt()");
  }
}

// 通过继承父类创建匿名内部类
SuperClass instance = new SuperClass() {
    public void doIt() {
        System.out.println("Anonymous class doIt()");
    }
};
instance.doIt();

public interface MyInterface {
  public void doIt();
}
// 通过实现接口创建匿名类

MyInterface instance = new MyInterface() {
    public void doIt() {
        System.out.println("Anonymous class doIt()");
    }
};

instance.doIt();
```

1. 以 `通过继承父类创建匿名内部类` 为例，在 `new` 之前，jdk 底层会有这样一种操作：

```java
class Outer$1 extends SuperClass{
  public void doIt() {
    System.out.println("Anonymous class doIt()");
  }
}
```

​	其中 `Outer$1` 为 `外部类名+$+数字`。	

​	也就是 jdk 底层会定义一个类来继承 `SuperClass` 类，然后再通过 `new` 操作符来创建实例，实例创建完后，该类（Outer$1）就不再有了

2. 以 `通过实现接口创建匿名类` 为例，在 `new` 之前，jdk 底层会有这样一种操作：

```java
class Outer$2 implements MyInterface{
  public void doIt() {
    System.out.println("Anonymous class doIt()");
  }
}
```

​	其中 `Outer$2` 为 `外部类名+$+1`。

​	也就是 jdk 底层会定义一个类来实现 `MyInterface` 接口，然后再通过 `new` 操作符来创建实例，实例创建完后，该	类（Outer$2）就不再有了

### 嵌套类的优点

::: tip
对 **「类」** 而言具有更强的组织性
:::

将具有关联性的类作为 Nested Class 会更好，当然，你可以将它们作为同属于一个 package 里的类，但是若作为Nested Class 会更具有强关联性，语意化也会更好

## 关于抽象类的几点说明

1. 声明一个抽象类，只需在类声明语句前添加一个 `abstract` 关键字
2. 抽象类中可以有一个或多个抽象方法，也可以没有抽象方法，自然也可以有普通方法
3. 抽象方法不可以有方法体
4. 当一个类中有抽象方法时，该类必须得是抽象类
5. 抽象类不可以被实例化，也就是不能通过 `new AbstractClassName()`的代码形式来直接创建一个抽象类的实例
6. 当有一个类继承一个抽象类时，必须实现该抽象类的所有抽象方法

**思考**

1. 当一个抽象类中没有抽象方法也是可以的，只不过不推荐这样写，因为这样还不如直接写成类
2. 当一个抽象类中的方法全是抽象方法也是可以的，只不过不推荐这样写，因为这样还不如直接写成**接口**

## 关于接口的几点说明

1. 接口中的属性默认被 `public static final` 修饰， 并且只能被  `public static final`  修饰，所以

    1. 接口中的属性在定义时必须初始化（因为 `final` 修饰符）
    2. 访问接口中的属性可以直接通过 `接口名.接口属性名` 的方式进行访问（因为 `static` 修饰符）

2. 接口中的所有方法均为抽象方法（除了静态方法）

3. 当一个类实现某个接口时，必须实现该接口的所有方法，但不需要实现接口的属性

    在 Java 8 之后由于接口中增加了**「默认方法」**，该**「默认方法」**可以包含方法的实现，所以类中可以不实现该**「默认方法」**。当然，你也可以重写该**「默认方法」**。在以后要学的集合接口源码中你会看到很多这样的**「默认方法」**

4. 当要创建一个接口实例时，必须先创建实现该接口类的实例，再将该实例赋值给接口变量。这体现了 Java 中的**多态性**

5. 一个类可以实现多个接口，但这会引发一个问题，就是多个接口当中可能有相同的方法。Java 规范中并没有针对该问题给出一个解决方案，这取决于你如何处理。

6. 哪些 Java 类型可以实现一个接口呢？

   1. 类
   2. 抽象类
   3. 内部类
   4. 枚举
   5. 动态代理

7. 接口中可以有静态方法，但是静态方法必须有实现。在以后要学的集合接口源码中你会看到很多这样的**静态方法**

8. 一个接口可以继承自另外一个接口。一个类只能有一个父类，但却可以实现多个接口

9. 泛型接口