# LKJ's Blog

个人技术博客 —— 时光不语，静待花开

## 简介

这是一个基于 [VitePress](https://vitepress.dev/) 搭建的个人技术博客，主要记录技术学习过程中的笔记与心得。

## 内容分类

| 分类 | 文章数 | 描述 |
| --- | --- | --- |
| 数据结构与算法 | 152+ | LeetCode 题解、算法思想总结 |
| 前端开发 | 11 | CSS、JavaScript、Vue、React 等 |
| Java | 11 | JavaSE、Maven、Spring 等 |
| 密码学 | 5 | RSA、DH、ECC 等算法原理与实现 |
| 设计模式 | 4 | 创建型、结构型、行为型设计模式 |
| 其他技术 | 3 | Bash 脚本、SSH 等 |

## 技术栈

- **框架**: [VitePress](https://vitepress.dev/) v1.6.4
- **数学公式**: markdown-it-mathjax3
- **包管理**: pnpm

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建
pnpm build

# 预览构建产物
pnpm preview
```

## 项目结构

```
blog/
├── algorithm/       # 数据结构与算法 (152篇)
├── fe/              # 前端开发 (11篇)
├── java/            # Java (11篇)
├── cryptology/      # 密码学 (5篇)
├── designpartern/   # 设计模式 (4篇)
├── other/           # 其他技术 (3篇)
├── posts/           # 博文
├── index.md         # 首页
├── about.md         # 关于页
└── package.json
```

## License

ISC
