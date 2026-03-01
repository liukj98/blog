# Project Context

## Purpose
LKJ's Blog — 个人技术博客，用于记录和分享技术学习过程中的笔记与心得，内容涵盖数据结构与算法、前端开发、Java、密码学、设计模式等领域。

## Tech Stack
- **框架**: VitePress v1.6.4（基于 Vite 的静态站点生成器）
- **前端**: Vue 3
- **内容格式**: Markdown
- **数学公式**: markdown-it-mathjax3
- **运行时**: Node.js
- **包管理**: pnpm v10.28.2

## Project Conventions

### Code Style
- VitePress 配置使用 TypeScript（`.vitepress/config.ts`）
- 自定义主题继承 VitePress 默认主题（`.vitepress/theme/index.ts`）
- 自定义样式使用 CSS（`.vitepress/theme/custom.css`）
- 博客内容使用 Markdown 文件

### Content Organization
- `algorithm/` — 数据结构与算法文章，按子分类组织（排序、数组、链表、哈希表、栈与队列、二叉树、回溯、贪心、动态规划、数学）
- `fe/` — 前端文章（CSS、JavaScript、Vue、React）
- `java/` — Java 文章（JavaSE、Maven、Spring）
- `cryptology/` — 密码学文章
- `designpartern/` — 设计模式文章
- `other/` — 其他技术文章（Bash、SSH）
- `posts/` — 通用博文

### Architecture Patterns
- 静态站点生成 (SSG)
- 基于文件系统的路由
- Markdown 驱动的内容管理
- 静态资源存放在 `public/` 目录

### Directory Structure
```
blog/
├── .vitepress/
│   ├── config.ts          # VitePress 配置（导航、侧边栏、搜索等）
│   ├── theme/
│   │   ├── index.ts       # 主题入口
│   │   └── custom.css     # 自定义样式
│   └── public/            # 静态资源（图片等）
├── public/                # 根级静态资源目录（VitePress 实际使用）
├── algorithm/             # 算法文章 (152+)
├── fe/                    # 前端文章 (11)
├── java/                  # Java 文章 (11)
├── cryptology/            # 密码学文章 (5)
├── designpartern/         # 设计模式文章 (4)
├── other/                 # 其他文章 (3)
├── posts/                 # 博文
├── index.md               # 首页
├── about.md               # 关于页
└── package.json
```

### Git Workflow
- master 分支为主分支
- feature 分支开发新功能

## Domain Context
个人技术博客，主要面向开发者，记录 LeetCode 算法题解、前端/后端技术学习笔记、密码学原理和设计模式等内容。

## Important Constraints
- 纯静态站点，无后端服务
- 通过 VitePress 内置 local provider 实现全文搜索
- 需要支持 LaTeX 数学公式渲染（MathJax）
- 需要响应式设计，支持移动端访问
- 支持深色/亮色主题切换

## External Dependencies
- VitePress v1.6.4 — 核心框架
- markdown-it-mathjax3 — 数学公式渲染
- pnpm — 包管理工具
