---
title: Maven基础
date: 2022-04-08
---

## 什么是Maven

一般来说 maven 是一个构建工具，但是，它又不仅是一个构建工具，所以它并不是 Ant（另一个 java 项目构建工具） 的替代品

## 下载安装Maven

1. 到官网下载 maven 安装包
2. 解压 maven 安装包到磁盘上的某个目录下
3. 配置 maven 的环境变量

## Maven核心概念

### 约定的目录结构

在 maven 项目的根目录下有如下约定的目录结构


```xml
.
├── pom.xml             // maven 配置文件
└── src
    ├── main            // 主程序目录
    │   ├── java        // 源代码目录
    │   └── resources   // 配置文件目录
    └── test            // 测试程序目录
        ├── java        // 测试程序源代码目录
        └── resources   // 测试程序需要的配置文件目录
```

### pom.xml文件

`POM（Project Object Model）`：项目对象模型。我们在开发中接触最多的就是这个 `pom.xml` 文件了

#### 三个向量定位一个Maven项目

::: tip
gav 是 groupId+artifactId+version 三个标签的简称，又称为坐标，表示根据这三个标签就能知道这个项目的基本信息，即**「这个项目是属于哪个公司的」**、**「这个项目的名称是什么」**、**「这个项目的当前版本号是多少」**
:::

1. `groupId`：公司或组织名倒序+项目名
2. `artifactId`：模块名（项目名称）
3. `version`：版本号（主版本号·次版本号·小版本号）

```xml
<groupId>com.lkj</groupId>
<artifactId>mvn-project</artifactId>
<version>1.0</version>
```

映射到磁盘上的文件路径：`MAVEN_REPO/com/lkj/mvn-project/1.0/mvn-project-1.0.jar`

### 仓库

1. **本地仓库**：默认情况下的本地仓库地址为 `当前用户目录/.m2/repository`，你可以通过修改 maven 的配置文件来自定义本地仓库地址。maven 的配置文件地址：`你安装的 maven 目录/conf/settings.xml`。修改内容为：`<localRepository>你想要设置的本地仓库的地址</localRepository>`
2. **远程仓库**
   1. 私服：搭建在局域网环境中，为局域网范围内的所有 maven 工程服务
   2. 中央仓库：假设在 Internet 上，为全世界的所有 maven 工程服务
   3. 中央仓库镜像：为了分担中央仓库的流量，提升用户的访问速度而建，最熟悉的比如阿里云的镜像

### 依赖

依赖查找：先从本地仓库中查找，本地仓库没有就从远程仓库下载对应依赖到本地仓库

### Maven的生命周期

#### 生命周期

指 maven 在构建项目过程中所经历的各个阶段，包括**「清理」**、**「编译」**、**「测试」**、**「报告」**、**「打包」**、**「安装」**、**「部署」**等阶段

#### 插件

maven 项目构建的各个阶段是通过 maven 的命令来进行的，而 maven 的命令的执行是通过对应的插件完成的，每个插件就是一个 jar 包，比如说执行 `mvn clean` 时会用到 `maven-clean-plugin` 插件

#### 命令

执行 maven 的不同功能，如编译功能可使用 `mvn compile`

1. `mvn clean`

   清理命令。删除生成的 src/target 目录

   使用到的插件：

   1. maven-clean-plugin，版本号 2.5

2. `mvn compile`

   编译命令。执行源代码（src/main/java 目录下的 java 文件）的编译操作，并将编译好的 class 文件生成到 src/target/classes 目录下。此外，还会将用到的资源文件（src/main/resources）复制到 src/target/classes 目录下，并且是先复制资源文件再复制 class 文件

   使用到的插件：

   1. maven-resources-plugin，版本号 2.6：用于资源文件的复制
   2. maven-compiler-plugin，版本号 3.1：用于代码的编译

3. `mvn test-compile`

   编译测试命令。除了执行 `mvn compile` 功能外，还要编译测试代码（src/test/java 目录下的 java 测试文件），并将编译好的 class 文件生成到 src/target/test-classes 目录下。此外还会将用到的资源文件（src/test/resources）复制到 src/target/test-classes 目录下，并且是先复制资源文件再复制 class 文件

4. `mvn test`

   测试命令。先执行 `mvn test-compile` 命令用于生成 class 文件，然后测试对应的 class 文件

   使用到的插件：

   1. maven-surefire-plugin，版本号 2.6

5. `mvn package`

   打包命令。在打包之前会进行代码的编译、资源的复制、class 文件测试等操作，最后这些操作成功后会将项目中的资源、class 文件、配置文件放到一个压缩文件中，默认压缩文件类型是 jar，web 应用是 war 类型（当然，你也可以通过 pom.xml 文件进行相关的设置）。打包的文件包含的是 src/main 目录下的所有生成的 class 和配置文件，与 test 无关，因为打包成的 jar（war） 文件测试已经通过，不再需要测试了。

   使用到的插件：

   1. maven-jar-plugin，版本号 2.4

6. `mvn install`

   安装命令。把生成的打包的文件（如 jar 文件）安装到本地 maven 仓库中。当然在执行该命令的过程中会自动地先执行 `mvn package` 命令进行打包操作。

   使用到的插件：

   1. maven-install-plugin，版本号 2.4

**上述各个命令在本机的终端截图如下**

![image-20211016171012244](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016171012244.6hs12s4o8ho0.png)

![image-20211016171145464](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016171145464.23mck5e4su80.png)

![image-20211016171320062](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016171320062.38vrysmz10o0.png)

![image-20211016172956749](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016172956749.3603e5f3kku0.png)

![image-20211016174008637](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016174008637.4nri3iu2rjc0.png)

![image-20211016174906032](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211016174906032.i3jvx6g34vs.png)

#### 自定义配置插件

在 pom.xml 文件中进行插件的相关配置，如下

```xml
<!-- 项目构建相关的配置 -->
<build>
  <!-- 插件配置 -->
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>3.8.0</version>
      <configuration>
        <source>1.8</source> <!-- 指定编译代码的 jdk 版本 -->
        <target>1.8</target> <!-- 指定运行 java 程序的 jdk 版本 -->
      </configuration>
    </plugin>
  </plugins>
</build>
```

#### 单元测试

在 java 中一个单元就是一个方法，方法是测试的最小单元

以 `junit` 测试框架为例，来学习下 maven 的生命周期、插件、命令等相关知识

**单元测试使用建议：**

在 src/test/java 目录下创建测试类 java 文件

1. 测试类的名称一般为 `Test+要测试的类名称`
2. 测试类的包名要和要测试的类的包名一样
3. 在测试类中定义方法，在方法里写测试代码，但要注意定义测试方法时的一些要求
   1. 测试方法必须是 public 方法
   2. 测试方法没有返回值，即返回值为 void
   3. 测试方法没有参数
   4. 测试方法的名称自定义，但一般建议是 `test+测试的方法名称`

4. 测试类中的方法可以单独执行，测试类本身也可以单独执行，当测试类本身独立执行时会执行测试类的所有测试方法
5. 在测试方法上加入 `@Test` 注解，表示这是一个测试方法

```java
// src/main/java/com/lkj
package com.lkj;

public class HelloMaven {
    public int sum(int a, int b) {
        return a + b;
    }
}
```

```java
// src/test/java/com/lkj
package com.lkj;

import org.junit.Assert;
import org.junit.Test;

public class TestHelloMaven {
    @Test
    public void testSum(){
        HelloMaven helloMaven = new HelloMaven();
        int sum = helloMaven.sum(2, 3);
        // 期望值，实际值
        Assert.assertEquals(5, sum);
    }
}
```

## IDEA中使用Maven

IDEA 中自带 maven，但是一般我们都要使用我们安装的 maven，所以需要在 IDEA 中进行 maven 的相关配置

## 依赖范围管理

在 maven 配置文件 pom.xml 中我们经常会添加一些项目依赖的 jar 包，但是有些 jar 包在项目构建的某些阶段是不需要的，比如单元测试的 jar 包 junit，它只在测试阶段有用，在其它阶段，比如「部署」阶段是不需要的。于是，考虑到不同的 jar 包在项目构建的不同阶段才会使用到的情况，我们可以通过 scope 标签进行相关设置。

```xml
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
		<!-- 只在测试阶段使用该 jar 包 junit -->		    
    <scope>test</scope>
  </dependency>
</dependencies>
```

**scope 的取值：**

1. compile：默认取值。参与项目构建的所有阶段
2. test：测试。只在测试阶段使用，比如执行 `mvn test` 命令时会使用 junit
3. provided：提供者。项目部署到服务器时，不需要提供这个依赖的 jar 包，而是由服务器自己提供。比较明显的 是在用 tomcat 搭建的 web 项目中的 servlet 和 jsp 依赖，因为 tomcat 服务器本身就已经提供了这两个依赖，所以一般我们在 pom.xml 文件中会将这两个依赖的 scope 取值为 provided

## 常用设置

::: tip
maven 在构建项目时，maven 会有一些默认的配置，然后会读取配置文件 pom.xml，将 pom.xml 文件里的配置和默认配置进行合并生成最终的配置文件，最后根据最终的配置进行项目的构建。
:::

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	<!-- maven 在编译 java 源代码时所使用的 jdk 版本 -->  
  <maven.compiler.source>1.7</maven.compiler.source>
  <!-- maven 在运行 java 字节码时所使用的 jdk 版本 -->  
  <maven.compiler.target>1.7</maven.compiler.target>
</properties>
```

### 配置自定义变量

如果使用 maven 构建的项目很大，需要依赖很多个 jar 包，而这些 jar 包中有些 jar 包的版本号是一样的，当需要更改这些 jar 包的版本号时，可能会很麻烦，因为要手动地一个一个地修改。考虑到这种情况，我们可以在 properties 标签中自定义一个标签来替代版本号，标签名作为变量名，标签体作为变量值

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.7</maven.compiler.source>
  <maven.compiler.target>1.7</maven.compiler.target>
  <!-- 自定义 spring.version 标签表示 spring 版本，版本号为 5.3.10 -->
  <spring.version>5.3.10</spring.version>
  <!-- 自定义 junit.version 标签表示 junit 版本，版本号为 4.11 -->
  <junit.version>4.11</junit.version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <!-- 使用自定义的 spring 版本 -->
    <version>${spring.version}</version>
  </dependency>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <!-- 使用自定义的 junit 版本 -->
    <version>${junit.version}</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

### 配置资源插件

maven 在构建项目的过程中会默认按如下方式进行对文件的处理

1. maven 处理 `src/main/resources` 目录时，会把该目录下的所有文件拷贝到 `target/classes` 目录下
2. maven 处理 `src/main/java` 目录时，只处理该目录下的 `.java` 文件，把这些 `java` 文件编译成字节码文件并拷贝到 `target/classes` 目录下，并不会处理其它文件

然而在某些情况下我们又需要对 `src/main/java` 目录下的非 `.java` 文件进行相关的处理，于是你可以在 maven 配置文件 pom.xml 进行如下配置

```xml
<build>
  <!--  
        资源插件配置：告诉 maven 把 src/main/java 目录下的指定扩展名的文件拷贝到 target/class 目录中
    -->
  <resources>
    <resource>
      <!-- 要处理的目录 -->
      <directory>src/main/java</directory>
      <includes>
        <!--  包括目录下的 .properties、.xml 文件都会扫描 -->
        <include>**/*.properties</include>
        <include>**/*.xml</include>
      </includes>
      <!-- filtering 选项为 false 表示不启用过滤器，*.properties 已经启到过滤的作用了 -->
      <filtering>false</filtering>
    </resource>
  </resources>
</build>
```

## 参考资料
- [Maven Tutorial](http://tutorials.jenkov.com/maven/maven-tutorial.html)