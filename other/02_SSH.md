---
title: SSH
date: 2023-07-13
---

关于 SSH 中使用的非对称加密算法 RSA 参见 [RSA 算法](../cryptology/01_RSA)

## SSH 是什么

SSH 全称为 Secure Shell，是一种用于安全（加密）登入的网络协议

## SSH 历史

1995年，芬兰赫尔辛基工业大学的研究员 Tatu Ylönen 设计了 SSH 协议的第一个版本（现称为 SSH 1），同时写出了第一个实现（称为 SSH1）。

## SSH 架构

SSH 的软件架构是服务器-客户端模式（Server - Client）

在这个架构中，SSH 软件分成两个部分：

1. 向服务器发出请求的部分，称为客户端（client），OpenSSH 的实现为 ssh

2. 接收客户端发出的请求的部分，称为服务器（server），OpenSSH 的实现为 sshd

## SSH 密钥登入过程

客户端使用非对称加密算法（RSA 或 DSA）生成密钥对（公钥和私钥）

非对称加密机制也称为公开密钥体制

1. 第一步，手动将客户端的公钥放入远程服务器的指定位置。

2. 第二步，客户端向服务器发起 SSH 登录的请求。

3. 第三步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。

4. 第四步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。

5. 第五步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

![流程图](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/其他/流程图.5ct1ffcxw280.jpg)


### 免密登入 github

参考 [Git配置ssh免密登录 - Convict - 博客园](https://www.cnblogs.com/convict/p/14888283.html)

### 免密登入远程服务器

参考 [设置远程免密登录服务器_远程服务器配置免密登录_zhangpaopao0609的博客-CSDN博客](https://blog.csdn.net/qq_41800366/article/details/109237331)

## 常用的 SSH 命令

### scp 命令

1. scp 全称为 secure copy，意为安全复制

2. scp 主要用于以下三种复制操作

    1. 本地复制到远程

    2. 远程复制到本地

    3. 两个远程系统之间的复制

3. 语法：`scp source destination`

4. 示例

    1. 本地文件复制到远程

        ```bash
        # 语法
        scp SourceFile user@host:directory/TargetFile

        # 示例
        scp file.txt remote_username@10.10.0.2:/remote/directory
        ```

    2. 远程文件复制到本地

        ```bash
        # 语法
        scp user@host:directory/SourceFile TargetFile

        # 示例
        scp remote_username@10.10.0.2:/remote/file.txt /local/directory
        ```

    3. 两个远程系统之间的复制

        ```bash
        # 语法
        $ scp user@host1:directory/SourceFile user@host2:directory/SourceFile

        # 示例
        $ scp user1@host1.com:/files/file.txt user2@host2.com:/files
        ```

### sftp 命令

1. sftp 全称为 secure ftp，意为安全文件传输协议

2. 连接 FTP 主机

    ```bash
    sftp username@hostname
    # 输入上述命令并回车后，会要求输入密码，连接成功后会进入下属 sftp 命令行，之后就可以输入相应的 sftp 命令
    sftp> 
    ```

3. 常用 ftp 命令

    1. `ls [directory]`：列出一个远程目录的内容。如果没有指定目标目录，则默认列出当前目录。

    2. `cd directory`：从当前目录改到指定目录。

    3. `mkdir directory`：创建一个远程目录。

    4. `rmdir path`：删除一个远程目录。

    5. `put localfile [remotefile]`：本地文件传输到远程主机。

    6. `get remotefile [localfile]`：远程文件传输到本地。

    7. `help`：显示帮助信息。

    8. `bye`：退出 sftp。

    9. `quit`：退出 sftp。

    10. `exit`：退出 sftp。

## VSCode 中使用 SSH 连接远程主机

1. 安装 SSH 插件：[Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

2. 配置 SSH 环境：[Developing on Remote Machines using SSH and Visual Studio Code](https://code.visualstudio.com/docs/remote/ssh)

## 参考资料

- [SSH 教程](https://wangdoc.com/ssh/)

- [RFC 4251: The Secure Shell (SSH) Protocol Architecture](https://datatracker.ietf.org/doc/html/rfc4251#page-4)
