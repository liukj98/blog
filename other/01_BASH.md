---
title: BASH 编程
date: 2023-03-11
---
## shell 是什么

Shell 这个单词的原意是“外壳”，跟 kernel（内核）相对应，比喻内核外面的一层，即用户跟内核交互的**对话界面。**

1. ~~Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁~~

2. ~~Shell 既是一种命令解释语言，又是一种程序设计语言~~

3. ~~Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务~~

4. ~~Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell~~

5. ~~shell 中文译作“壳”，可把它看成是连接用户与操作系统的桥梁~~

具体来说，Shell 这个词有多种含义。

1. **首先，Shell 是一个程序**，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为**命令行环境**（command line interface，简写为 CLI）。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。

2. **其次，Shell 是一个命令解释器**，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 Shell 命令写出各种小程序，又称为脚本（script）。这些脚本都通过 Shell 的解释执行，而不通过编译。

3. **最后，Shell 是一个工具箱**，提供了各种小工具，供用户方便地使用操作系统的功能。

## 常用的 shell 有哪些

> 或者说实现了 shell 的软件（程序）有哪些

在终端输入 `cat /etc/shells` 查看本机可使用的所有 shell，目前有

1. **sh**（全称 Bourne Shell）：是 UNIX 最初使用的 shell，而且在每种 UNIX 上都可以使用。Bourne Shell 在 shell 编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种 shell。

2. **<font color=red>bash</font>**（全称 Bourne Again Shell）：LinuxOS 默认的，它是 Bourne Shell 的扩展。 与 Bourne Shell 完全兼容，并且在 Bourne Shell 的基础上增加了很多特性。可以提供命令补全，命令编辑和命令历史等功能。它还包含了很多 C Shell 和 Korn Shell 中的优点，有灵活和强大的编辑接口，同时又很友好的用户界面。


3. **csh**（全称 C Shell）：是一种比 Bourne Shell 更适合的变种 Shell，它的语法与 C 语言很相似

4. **zsh**：目前 mac 终端默认的一种 shell

5. **tcsh**：是 Linux 提供的 C Shell 的一个扩展版本。tcsh 包括命令行编辑，可编程单词补全，拼写校正，历史命令替换，作业控制和类似 C 语言的语法，他不仅和 Bash Shell 提示符兼容，而且还提供比 Bash Shell 更多的提示符参数

6. **ksh**（全称 Korn Shell）：集合了 C Shell 和 Bourne Shell 的优点并且和 Bourne Shell 完全兼容

在终端输入 `ps` 查看本机当前正在使用的 shell，目前正在使用的 shell 为 zsh

另一种查看当前 shell 的简单方式是通过输入环境变量的形式：`echo $SHELL`

## shell 脚本

### 什么是脚本语言

脚本其实就是短小的、用来让计算机自动化完成一系列工作的程序，这类程序可以用文本编辑器修改，不需要编译，通常是解释运行的

我们常说的 shell、python 就是一种脚本语言

### shell 与 shell 脚本的区别

shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。Ken Thompson 的 sh 就是第一种 Unix Shell

shell 脚本（shell script），是一种用 shell 编写的脚本程序

业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，shell 和 shell script 是两个不同的概念

### shebang

计算机程序中，shebang 指的是出现在文本文件的第一行前两个字符 `#!`

在 Unix 系统中，程序会分析 shebang 后面的内容，并将其作为解释器的指令，例如

- 以 `#!/bin/sh` 开头的文件，程序在执行的时候会调用 /bin/sh，也就是 bash 解释器

- 以 `#!/usr/bin/python` 开头的文件，程序在执行时会调用 python 解释器去执行

- 以 `#!/usr/bin/env` 解释器名称开头的文件，是一种在不同平台上都能找到正确解释器的方法


**注意事项**

- 如果脚本未指定 shebang，脚本执行的时候，则使用当前环境默认的 shell 去解释脚本

  - 通过在命令行输入 echo $SHELL 查看当前 shell，本人的 mac 电脑当前的 shell 是 zsh

- 如果 shebang 指定了可执行的解释器，如 `/bin/bash`、`/usr/bin/python`，脚本在执行时，文件名会作为参数传递给解释器

- 如果 `#!` 指定的解释程序不是一个可执行文件，那么指定的解释程序会被忽略，转而交给当前的 SHELL 去执行这个脚本。

- 如果 `#!` 指定的解释程序不存在，那么会报错 bad interpreter: No such file or directory

- `#!` 之后的解释程序，需要写其绝对路径(如: `#!/bin/bash`) ，它是不会自动到 $PATH 中寻找解释器的

- 如果你使用 `bash test.sh` 这样的命令来执行脚本，那么以 `#!` 开头的这一行将会被忽略掉，此时解释器当然是用命令行中显式指定的 bash 啦

## Bash

以实现了 shell 的 **bash** 解释器为例进行 shell 脚本的学习

### 变量

#### 变量定义

1. `变量名=变量值`
2. `变量名='变量值'`
3. `变量名="变量值"`

注意：等号 `=` 前后不可有空格

**引用变量**

1. `$变量名`
2. `${变量名}`

**删除变量**

1. `unset 变量名`， 删除变量或函数

**只读变量**

1. `readonly 变量名[=变量值]`，只有 shell 结束，只读变量才失效，定义了只读的变量，后期不可再修改其值

**注意事项**

1. 在给变量赋值时，单引号字符串不能识别特殊字符，双引号字符串能识别特殊字符

2. var=`linux命令`，反引号里填写 linux 命令，该 shell 语句的含义就是运行该 linux 命令，并将运行结果保存到 var 变量中。与其等价的方式是 var=$(linux命令)

#### 变量类型

运行 shell 时，会同时存在三种变量

1. **局部变量**，局部变量在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。

2. **环境变量**，所有的程序，包括 shell 启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候 shell 脚本也可以定义环境变量。

3. **shell 变量**，shell 变量是由 shell 程序设置的特殊变量。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行

#### 环境变量

环境变量一般是用 export 内置命令导出的变量，用于定义 shell 的运行环境、保证 shell 命令的正确运行
shell 通过环境变量来确定登入的用户名、PATH路径、文件系统等各种应用
环境变量可以在命令行中临时创建，但是用户退出 shell 终端变量即消失，如要永久生效，需要修改环境变量配置文件

- 用户个人配置文件 ~/.bash_profile、~/.bashrc 远程登入用户特有文件

- 全局配置文件 /etc/profile、/etc/bashrc，修改全局文件会影响系统所有登入的用户，所以不建议修改全局配置文件

**检查系统环境变量的命令**

1. set，输出当前 shell 环境所有变量，包括全局变量、局部变量
2. env，只显示当前 shell 的全局变量
3. declare，输出所有变量，如同 set
4. export，显示和设置环境变量值

```bash
# 统计变量（全局变量+局部变量）个数
# -l 参数表示统计输出内容的所有行数
set | wc -l

# 从全局中查找以 name 开头的变量
set |grep ^name

# 获取当前 shell 的所有环境变量名
export |awk -F '[=]' '{print $1}'

# 统计全局变量个数
env | wc -l
```

**环境变量的执行顺序**

![1](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/1.42oxpqlg9r00.webp)

#### 特殊变量

##### 参数变量
shell 的特殊变量，主要用于脚本、函数传递参数等场景中，如下面特殊的位置参数变量

1. `$0`：获取 shell 脚本文件名，以及脚本路径
2. `$n`：获取 shell 脚本的第n个参数，n在1~9之间，如$1 ，$2， $9，大于9则需要写 ${10}， 参数空格隔开
3. `$#`：获取执行的 shell 脚本后面的参数总个数
4. `$*`：获取 shell 脚本所有参数，不加引号等同于 `$@` 作用，加上引号 `"\$*"` 其作用是接收所有参数为单个字符串，`"$1 $2..`
5. `$@`：不加引号，效果同上，加引号，是接收所有参数为独立字符串，如 "$1"  "$2"  "$3" ...， 空格保留

**实践**

```bash
# test.sh 文件内容
echo '#############'
echo '获取 $0 参数'
echo '结果:' $0

echo '#############'
echo '获取 $1 $2 $3 参数'
echo '结果:' $1 $2 $3

echo '#############'
echo '获取参数个数'
echo '结果:' $#

echo '#############'
echo '获取 $* 参数'
echo '结果:' $*

echo '#############'
echo '获取 $@ 参数'
echo '结果:' $@

sh test.sh lkj 12 23 34 55
```

##### 状态变量

1. `$?`：上一次命令执行状态的返回值，0正确，非0失败
2. `$$`：当前 shell 脚本的进程号
3. `$!`：上一次后台进程的 PID
4. `$_`：获取上一次命令传入的最后一个参数

**实践**

```bash
#!/bin/bash
# test.sh 文件内容
# $# 表示获取参数个数
# -ne 表示不等于的情况
# && 逻辑与
[ $# -ne 2 ] && {
  echo "must be two args
  exit 119 # 终止程序运行，且返回119状态码，提供给当前 shell 的 $? 变量，若是在函数里可以使用 return 119 语法
]
echo "没毛病 就是两个参数"

```

```bash
# 传递三个参数
sh test.sh 12 23 44
echo $?

# 传递两个参数 
sh test.sh 12 23
echo $?
```

#### 变量的操作

1. `${变量}`：获取变量值
2. `${#变量}`：返回变量值长度，字符长度
3. `${变量:start}`：返回变量 start 数值之后的字符
4. `${变量:start:length}`：提取 start 之后的 length 限制的字符
5. `${变量#word}`：从变量开头，删除最短匹配的 word 子串
6. `${变量##word}`：从变量开头，删除最长匹配的 word
7. `${变量%word}`：从变量结尾删除最短的 word
8. `${变量%%word}`：从变量结尾开始删除最长匹配的 word
9. `${变量/pattern/string}`：用 string 代替第一 个匹配的 pattern
10. `${变量//pattern/ string}`：用 string 代替所有的 pattern

> 在 pattern 中（模式匹配），有一些规则，如 * 符号表示通配符
> 
> a*c 表示开头为 a，中间任意字符，结尾为 c
> 
> a*C 表示开头为 a，中间任意字符，结尾为 C
> 
> *.jpg 表示以 .jpg 结尾的字符串

#### 扩展变量

以下四个扩展变量，都属于对变量的值进行判断再处理，相当于其他编程语句中的 if else 语句语法糖

1. `${paramgter:-word}`，如果 parameter 变量值为空，则返回 word 字符串，否则返回 paramgter 变量值
2. `${parameter:=word}`，如果 parameter 变量值为空，则 word 替代变量值， 且返回其值，否则返回 paramgter 变量值
3. `${parameter:?word}`，如果 parameter 变量值为空，则 word 当作 stderr 输出，否则返回 parameter 变量值。主要用于设置变量为空导致错误时，返回的错误信息

### 父子 shell

> 当终端模拟器一启动，会默认开启一个 shell 进程，该 shell 进程可能是 bash，也可能是 zsh，这取决于你自己对终端的默认设置。比如，mac 电脑默认开启的 shell 进程就是 zsh
> 
> 我们可以通过诸如 bash、sh 等命令开启对应的 shell 进程，则开启的 shell 进程相对于上一个 shell 进程叫做 子shell，而上一个 shell 进程称为 父shell。要想退出当前的 shell 进程，使用 exit 命令即可

子shell 中定义的变量在 父shell 中不能访问，同理 父shell 中定义的变量在 子shell 中也不能访问，也就是说 shell 中的变量是有作用域的

#### 执行 shell 脚本的三种方式

1. 通过 source script 或 . script 的方式来执行脚本，会在当前 shell 环境中加载脚本并执行，脚本中所定义的变量会保留
2. 通过 /bin/bash script 的方式来执行脚本，会开启一个子 shell 来执行对应的脚本，执行完毕后退回到原来的 父shell 中，此时脚本中所定义的变量也会相应销毁
3. 通过 ./script 这种方式来执行脚本，该方式本质与第二种方式是一样的，都会创建子 shell。它会读取脚本第一行指定的解释器来执行脚本，如果没有指定 shell 解释器，则采用默认的 shell 解释器

![7](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/7.28oltp6awaf4.webp)

#### 父子 shell 关系图

![8](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/8.6tjfbmlh9pk0.webp)

#### 创建子 shell 环境来执行命令

> **为什么要创建子shell环境来执行命令？在当前shell环境中执行命令不好吗？**
> 
> 答：若是在当前shell环境中执行命令，如 ping 命令，如果你不主动断开操作，则会一直卡在这里阻碍你后续的操作。而创建子shell 环境来执行命令并不会有这种影响
> 
> bash 中有一个变量 BASH_SUBSHELL，值为 0 表示在当前 shell 环境中，否则在子shell 环境中

通过 (cmd1;cmd2;cmd3)  这种方式，使用 () 小括号将所要执行的命令包裹起来，则会先创建 子shell 然后在 子shell 环境中执行这些命令

每当将命令用 () 小括号括起来，都会先创建子shell，然后在执行命令

在终端运行 (ls; pwd; echo $BASH_SUBSHELL) 命令来检测是否是在子shell 环境中

子shell 的嵌套：(pwd;(echo $BASH_SUBSHELL))

### 内置命令与外置命令

1. **内置命令**：在系统启动时就加载入内存，常驻内存，执行效率更高，但是占用资源。使用 type 命令名 查看是否是内置命令

2. **外置命令**：用户需要从硬盘中读取程序文件，再读入内存加载

外置命令一定会开启子进程来执行

内置命令不会产生子进程，内置命令和 shell 是为一体的，是 shell 的一部分，不需要单独去读取某个文件，系统启动后，就执行在内存中了

```bash
type npm
# 输出 npm is /Users/liukejun/.nvm/versions/node/v16.17.1/bin/npm
# 说明 npm 是外置命令

type pwd
# 输出 pwd is a shell builtin
# 说明 pwd 是内置命令

# 查看所有的内置命令
compgen -b
```

**一些内置命令**

![2](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/2.mgwcb08muog.webp)

**执行多命令**

通过分号 ; 执行多条命令，如 `ls; cd /dev; ls -al`

**数值计算的命令**

![3](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/3.3mpex3aatgw0.webp)

> 当对某个命令不是很熟悉的时候，可以通过 man 命令 查看对应的的命令手册

### 流程控制

#### 条件测试（条件判断）

使用条件测试的两种方式

1. 使用 test 命令
    1. 数值测试
    2. 字符串测试
    3. 文件/文件夹属性测试

2. 使用中括号 [] 或双中括号 [[]] 或双小括号 (())
    1. 使用 [] 或 [[]] 进行条件测试时前后必须空格，如 [ condition ] 不能为 [condition]
    2. 在条件测试中使用变量，必须用双引号包裹，如 [ -f "$filename" ] && echo "OK"
    3. 双中括号 [[]] 支持正则表达式，是对中括号 [] 的一种扩展

![4](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/4.5k38z2g3e3c0.webp)

![5](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/5.696nmukglb40.webp)

![6](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/shell/6.4p0w82rs36g0.webp)

#### 循环语句

#### for 循环

```Perl
# 语法
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

# 举例
#! /bin/bash
for num in {1..20}; do
    echo "$num"
done
```

#### while 循环

```Perl
# condition 有四种语法：[一些判断] 、 ((一些判断))、[[一些判断]]、test 
while condition
do
    command
done

# 举例
#! /bin/bash
# 第一种形式
num=10
while [ $num -ge 10 ]
do
        echo "hello"
        sleep 1
done
# 第二种形式，注意和第一种形式的区别
num=10
while (($num >= 10))
do
        echo "hello"
        sleep 1
done
```

#### 条件语句

```Perl
# if 语句语法格式
# condition 有四种语法：[一些判断] 、 ((一些判断))、[[一些判断]]、test 
if condition
then
    command1 
    command2
    ...
    commandN 
fi

# if else 语法格式
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi

# if else-if else 语法格式
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

# 举例
num=10
if [ $num -gt 9 ]; then
        echo "hello"
fi
```

### 函数

```Perl
# 函数的标准定义
function funcName(){
    # 函数体代码
}

# 函数的简写形式
function funcName{
    # 函数体代码
}

# 函数的懒人写法
funcName(){
    # 函数体代码
}

# 执行函数
funcName

# 通过 $? 获取函数的返回结果 

# 举例
#! /bin/bash
name="lkj"
printName(){
        echo $name
}
printName
```

## 参考资料
- [Shell 基础知识](https://juejin.cn/post/7130982053528469511#heading-0)
- [Linux shell 的演进史](https://juejin.cn/post/7052313930236067870#heading-2)
- [Fish shell 入门教程](https://www.ruanyifeng.com/blog/2017/05/fish_shell.html)
- [zsh](https://zhuanlan.zhihu.com/p/63585679)
- [Bash](https://wangdoc.com/bash/intro)