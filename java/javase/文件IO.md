---
title: 文件 IO
date: 2022-04-08
---

## File

```java
import org.junit.Test;

import java.io.File;
import java.io.IOException;

public class FileLearn {
    @Test
    public void test() {
        // 创建文件对象（在内存中创建的一个文件对象）
        File file = new File("/Users/liukejun/Desktop/test.txt");
        boolean b = file.canRead(); // 文件是否可读
        boolean b1 = file.canExecute(); // 文件是否可执行
        boolean b2 = file.canWrite(); // 文件是否可写
        long length = file.length(); // 文件的长度
        File absoluteFile = file.getAbsoluteFile(); // 文件的绝对路径
        String name = file.getName(); // 文件的名字
        System.out.println(b);
        System.out.println(b1);
        System.out.println(b2);
        System.out.println(length);
        System.out.println(absoluteFile);
        System.out.println(name);
        file.setExecutable(true); // 设置文件可以执行
        boolean b3 = file.canExecute();
        System.out.println(b3);
    }

    @Test
    public void test02() throws IOException {
        // 创建文件对象（在内存中创建的一个文件对象）
        File file = new File("/Users/liukejun/Desktop/abc.txt");
        // 将文件对象映射到 PC 的磁盘目录中，相当于在磁盘上创建了文件。
        // 创建成功返回 true，失败返回 false
        boolean newFile = file.createNewFile();
        System.out.println(newFile);
    }

    @Test
    public void test03() {
        // 创建文件对象（在内存中创建的一个文件对象）
        // 注意：File 既可以创建文件也可以创建文件夹
        // 具体是创建文件还是文件夹取决于你调用的是 createNewFile 方法还是 mkdir/mkdirs 方法，而不是你传入的 pathname
        File file = new File("/Users/liukejun/Desktop/testFiles");
        // 将文件对象映射到 PC 的磁盘目录中，相当于在磁盘上创建了文件夹。
        // 创建成功返回 true，失败返回 false
        boolean mkdir = file.mkdir();
        System.out.println(mkdir);
    }


    @Test
    public void test04() {
        // 创建一个不存在的文件对象（磁盘上没有 ab.txt 文件）
        File file = new File("/Users/liukejun/Desktop/ab.txt");
        boolean b = file.canRead();
        System.out.println(b);
    }

    // 文件夹的遍历
    @Test
    public void test05(){
        File file = new File("/Users/liukejun/Desktop/test");
        String[] list = file.list(); // 获取指定文件夹下的所有文件名
        for (int i = 0; i < list.length; i++) {
            System.out.println(list[i]);
        }
        File[] files = file.listFiles(); // 获取指定文件夹下的所有文件对象
        for (int i = 0; i < files.length; i++) {
            System.out.println(files[i]);
        }
        System.out.println("==================");
        String parent = file.getParent();
    }

    // 文件夹向上遍历
    @Test
    public void test06(){
        File file = new File("/Users/liukejun/Desktop/test");
        File parent = file.getParentFile();
        while (parent != null){
            System.out.println(parent.getAbsoluteFile());
            parent = parent.getParentFile();
        }
    }

    // 文件夹向下遍历
    @Test
    public void test07(){
        traverseFiles("/Users/liukejun/Desktop/test");
    }

    public static void traverseFiles(String pathname){
        File file = new File(pathname);
        _traverseFiles(file);
    }

    public static void _traverseFiles(File file) {
        File[] files = file.listFiles();
        for (int i = 0; i < files.length; i++) {
            File f = files[i];

            if(f.isFile()) { // 是文件，打印出文件名，再退出
                System.out.println(f.getName());
                continue;
            }else{
                // 不是文件，继续当前操作（记得更新下操作的文件夹）
                _traverseFiles(f);
            }
        }
    }
}
```

## 流的理解

![image-20211026093721957](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/Java学习图片资源/image-20211026144917552.3jgc8xwl1t20.png)

### 文件流

::: tip
顾名思义，读取文件中的数据（in），写入数据到文件中（out）
文件流按照读取和写入数据的单位（大小）不同，可分为：
1. 字节型文件流（单位为**一个字节**）
   `FileInputStream/FileOutputStream`
   一次读取/写入的数据大小为一个字节
2. 字符型文件流（单位为**两个字节**）
   `FileReader/FileWriter`
   一次读取/写入的数据大小为两个字节
:::
#### 字节型文件流

**文件输入流**

```java
@Test
public void test() {
  // 创建文件对象
  File file = new File("/Users/liukejun/Desktop/test.txt");
  try {
    // 创建文件输入流对象（连同文件对象的管道流）
    FileInputStream fis = new FileInputStream(file);
    int code = fis.read();// 开始读取文件中的数据，一次只读取一个字节，将读取的字节返回
    while (code != -1) {// code 为 -1 表示读取不到数据（文件中的数据已读完）
      System.out.println((char) code);
      code = fis.read();
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}

@Test
public void test02() {
  try {
    // 创建文件输入流对象
    FileInputStream fis = new FileInputStream("/Users/liukejun/Desktop/test.txt");
    byte[] b = new byte[5];
    // 每次只读取五个字节，将读取的5个字节数据放入到 b 字节数组变量中
    // 返回值为读取到的字节的个数
    int count = fis.read(b);
    while (count != -1) {
      String s = new String(b, 0, count);
      System.out.println(s);
      count = fis.read(b);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}

// 文件输入流的关闭，体现程序的健壮性
@Test
public void test03() {
  FileInputStream fis = null;
  try {
    fis = new FileInputStream("/Users/liukejun/Desktop/test.txt");
    int code = fis.read();
    while (code != -1) {
      System.out.println((char) code);
      code = fis.read();
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    if (fis != null) {
      try {
        fis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
```

**文件输出流**

```java
@Test
public void test04() {
  try {
    // 创建文件输出流对象，若找不到指定文件，就创建一个该文件
    FileOutputStream fos = new FileOutputStream("/Users/liukejun/Desktop/abc.txt");
    // 写入数据到文件中
    fos.write(99);
    fos.write(98);
    fos.write(97);
    System.out.println("写入完毕");
  } catch (IOException e) {
    e.printStackTrace();
  }
}

@Test
public void test05() {
  try {
    // 创建文件输出流对象，以追加的形式写入数据
    FileOutputStream fos = new FileOutputStream("/Users/liukejun/Desktop/abc.txt", true);
    // 写入数据到文件中，方式一
    //            fos.write(99);
    //            fos.write(98);
    //            fos.write(97);
		//          	方式二
    //            byte[] b = new byte[]{99, 98, 97};
    //            fos.write(b);
		// 方式三
    String s = new String("1+1=2");
    byte[] bytes = s.getBytes();
    fos.write(bytes);
    System.out.println("写入完毕");
  } catch (IOException e) {
    e.printStackTrace();
  }
}

// 文件输出流的关闭操作，体现程序的健壮性
@Test
public void test06() {
  FileOutputStream fos = null;
  try {
    fos = new FileOutputStream("/Users/liukejun/Desktop/abc.txt", true);
    fos.write(102);
  } catch (IOException e) {
    e.printStackTrace();
  }finally {
    if(fos != null){
      try {
        fos.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
```

#### 字符型文件流