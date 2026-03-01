# Change: 搭建 VitePress 个人博客网站

## Why
需要搭建一个基于 VitePress 的个人博客网站，用于发布技术文章和个人笔记。VitePress 提供了优秀的 Markdown 支持、快速的构建速度和良好的开发体验，非常适合个人博客场景。

## What Changes
- 初始化 VitePress 项目结构和配置
- 配置站点元信息（标题、描述、favicon 等）
- 配置导航栏和侧边栏
- 创建首页布局
- 创建博客文章目录结构和示例文章
- 配置主题和自定义样式
- 添加开发和构建脚本

## Impact
- Affected specs: blog-site (新建)
- Affected code: 项目根目录下新增 VitePress 相关目录和配置文件
  - `.vitepress/config.ts` - 站点配置
  - `.vitepress/theme/` - 自定义主题
  - `index.md` - 首页
  - `posts/` - 博客文章目录
