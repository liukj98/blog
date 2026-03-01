# blog-site Specification

## Purpose
基于 VitePress 搭建的个人技术博客站点，提供技术文章的组织、展示和检索能力，涵盖数据结构与算法、前端开发、Java、密码学、设计模式等多个技术领域。

## Requirements

### Requirement: VitePress 站点配置
系统 SHALL 提供完整的 VitePress 站点配置，包括站点标题（LKJ's Blog）、描述、中文语言设置和 favicon 图标。

#### Scenario: 站点基础配置加载
- **WHEN** VitePress 开发服务器启动
- **THEN** 站点标题显示为 "LKJ's Blog"，语言设置为 zh-CN，favicon 使用 avatar.png

### Requirement: 导航栏
系统 SHALL 提供顶部导航栏，包含首页链接、带下拉菜单的目录索引（数据结构与算法、设计模式、前端、Java、密码学、其他）、关于页面链接，以及 GitHub 社交链接图标。

#### Scenario: 用户通过导航栏访问页面
- **WHEN** 用户点击导航栏中的链接
- **THEN** 页面跳转到对应的目标页面

#### Scenario: 用户使用目录索引下拉菜单
- **WHEN** 用户悬停或点击"目录索引"
- **THEN** 展开下拉菜单，显示所有内容分类的链接

### Requirement: 首页布局
系统 SHALL 提供一个 Hero 风格的首页，展示博客名称、"个人技术博客"描述文字、"时光不语，静待花开"标语、头像图片，以及"开始阅读"和"关于我"两个操作按钮。首页 SHALL 同时展示 6 个 features 功能卡片（数据结构与算法、前端开发、Java、密码学、设计模式、其他技术），以及内容分类统计表格。

#### Scenario: 用户访问首页
- **WHEN** 用户访问博客根路径
- **THEN** 显示 Hero 区域（标题、描述、标语、头像、按钮）和 features 卡片区

#### Scenario: 用户通过 features 卡片导航
- **WHEN** 用户点击某个 features 卡片
- **THEN** 跳转到对应分类的文章列表页

### Requirement: 内容分类体系
系统 SHALL 将博客内容组织为以下分类目录：
- `algorithm/` — 数据结构与算法（152+ 篇）
- `fe/` — 前端开发（11 篇）
- `java/` — Java（11 篇）
- `cryptology/` — 密码学（5 篇）
- `designpartern/` — 设计模式（4 篇）
- `other/` — 其他技术（3 篇）
- `posts/` — 博文

#### Scenario: 用户浏览某个分类
- **WHEN** 用户访问某个分类的根路径（如 `/algorithm/`）
- **THEN** 显示该分类的索引页面及侧边栏导航

### Requirement: 侧边栏导航
系统 SHALL 为每个内容分类提供层级式侧边栏导航，支持分组折叠展开。算法分类 SHALL 包含排序、数组、链表、哈希表、栈与队列、二叉树、回溯、贪心、动态规划、数学等子分类，每个子分类下列出具体文章链接。

#### Scenario: 用户在算法分类中浏览
- **WHEN** 用户访问 `/algorithm/` 下的任意文章
- **THEN** 左侧显示层级式侧边栏，各子分类默认折叠，可点击展开查看文章列表

#### Scenario: 用户在其他分类中浏览
- **WHEN** 用户访问前端、Java、密码学、设计模式或其他分类
- **THEN** 左侧显示对应分类的侧边栏导航

### Requirement: 博客文章
系统 SHALL 支持通过 Markdown 文件编写博客文章，文章存放在各分类目录下，支持 frontmatter 元数据。

#### Scenario: 用户查看博客文章
- **WHEN** 用户访问某篇博客文章的 URL
- **THEN** 文章内容以格式化的 HTML 形式呈现，右侧显示文章目录大纲

### Requirement: 数学公式支持
系统 SHALL 通过 markdown-it-mathjax3 插件支持 LaTeX 数学公式渲染，在 Markdown 文件中可使用行内公式和块级公式。

#### Scenario: 文章包含数学公式
- **WHEN** Markdown 文件中包含 LaTeX 数学语法
- **THEN** 公式以 MathJax 渲染的格式正确显示

### Requirement: 关于页面
系统 SHALL 提供一个关于页面，展示博主的个人介绍、联系方式（GitHub 链接）和站点技术说明。

#### Scenario: 用户访问关于页面
- **WHEN** 用户点击导航栏中的"关于"链接
- **THEN** 显示博主的个人介绍内容

### Requirement: 本地搜索
系统 SHALL 提供基于 VitePress 内置 local provider 的全文搜索功能，支持中文搜索界面（搜索文档、无法找到相关结果等提示文案）。

#### Scenario: 用户搜索文章
- **WHEN** 用户点击搜索按钮或使用快捷键 Cmd+K
- **THEN** 打开搜索对话框，输入关键词后实时显示匹配结果

### Requirement: 自定义主题样式
系统 SHALL 基于 VitePress 默认主题提供自定义样式，包括品牌色（蓝色系 #3451b2）、Hero 标题渐变色效果、深色模式适配的品牌色变体，以及 Hero 图片的圆形边框样式。

#### Scenario: 自定义样式生效
- **WHEN** 站点页面加载
- **THEN** 页面使用自定义的品牌色和样式，Hero 标题显示渐变色效果

#### Scenario: 深色模式切换
- **WHEN** 用户切换深色/亮色模式
- **THEN** 品牌色和页面配色方案随之切换

### Requirement: 文章目录大纲
系统 SHALL 在文章页面右侧显示目录大纲，展示 h2-h3 级别的标题，并支持中文标签（"目录"）。

#### Scenario: 用户阅读长文章
- **WHEN** 文章包含多个标题层级
- **THEN** 右侧显示目录大纲，点击可跳转到对应标题位置

### Requirement: 页脚信息
系统 SHALL 在页面底部显示页脚，包含 "Powered by VitePress" 信息和版权声明（© 2020 - 2026 LKJ's Blog）。

#### Scenario: 用户滚动到页面底部
- **WHEN** 用户浏览到页面底部
- **THEN** 显示页脚信息

### Requirement: 文章翻页导航
系统 SHALL 在文章底部提供上一篇/下一篇导航链接，使用中文标签。

#### Scenario: 用户阅读完当前文章
- **WHEN** 用户滚动到文章底部
- **THEN** 显示"上一篇"和"下一篇"链接，可快速跳转到相邻文章

### Requirement: 响应式设计
系统 SHALL 支持响应式布局，在桌面端和移动端均有良好的阅读体验。

#### Scenario: 移动端访问
- **WHEN** 用户在移动设备上访问博客
- **THEN** 页面布局自适应屏幕宽度，导航栏折叠为菜单按钮，内容区域宽度适配
