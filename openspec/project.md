# Project Context

## Purpose
个人博客网站，用于发布技术文章、个人笔记和分享内容。

## Tech Stack
- VitePress (基于 Vite 的静态站点生成器)
- Vue 3
- Markdown
- Node.js
- pnpm (包管理器)

## Project Conventions

### Code Style
- 使用 Vue 3 Composition API
- Markdown 文件用于博客内容
- VitePress 配置使用 TypeScript

### Architecture Patterns
- 静态站点生成 (SSG)
- 基于文件系统的路由
- Markdown 驱动的内容管理

### Git Workflow
- main 分支为生产分支
- feature 分支开发新功能

## Domain Context
这是一个个人技术博客，主要用于记录和分享技术文章。

## Important Constraints
- 纯静态站点，无后端服务
- 需要良好的 SEO 支持
- 需要响应式设计，支持移动端访问

## External Dependencies
- VitePress 作为核心框架
- pnpm 作为包管理工具
