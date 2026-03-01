## Context
搭建一个基于 VitePress 的个人博客。VitePress 是 Vue 团队官方维护的静态站点生成器，基于 Vite 构建，支持 Markdown 内容驱动，适合文档和博客类站点。

## Goals / Non-Goals
- Goals:
  - 使用 VitePress 搭建功能完整的个人博客
  - 支持 Markdown 写作和文章分类
  - 良好的首页展示和导航体验
  - 响应式设计，支持移动端
- Non-Goals:
  - 不需要后端服务或数据库
  - 不需要评论系统（后续可扩展）
  - 不需要用户登录功能

## Decisions
- **框架选择**: VitePress 1.x，因其对 Markdown 的原生支持、优秀的性能和 Vue 生态集成
- **包管理器**: pnpm，项目已配置 `packageManager` 字段
- **目录结构**: 采用 VitePress 推荐的扁平结构，文章放在 `posts/` 目录下
- **主题**: 基于 VitePress 默认主题进行自定义扩展，避免引入第三方主题增加复杂度

## Risks / Trade-offs
- VitePress 默认主题偏向文档站点，博客场景需要额外自定义 → 通过自定义主题组件和样式解决
- 文章数量增多后侧边栏手动维护成本高 → 后续可添加自动生成侧边栏的脚本

## Open Questions
- 是否需要 RSS 订阅功能？
- 是否需要文章标签和分类归档页面？
- 部署目标平台是什么？（GitHub Pages / Vercel / Netlify）
