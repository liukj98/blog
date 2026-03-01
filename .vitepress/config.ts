import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'My Blog',
  description: '个人技术博客 - 记录与分享',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章列表',
          items: [
            { text: '你好，世界', link: '/posts/hello-world' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Powered by VitePress',
      copyright: '© 2026 My Blog'
    },

    outline: {
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
