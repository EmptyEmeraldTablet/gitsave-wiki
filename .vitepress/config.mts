import { defineConfig } from "vitepress";

export default defineConfig({
  title: "gitsave Wiki",
  description: "gitsave 使用文档与游戏存档指南",
  lang: "zh-CN",
  lastUpdated: true,
  cleanUrls: true,
  srcDir: "docs",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "使用指南", link: "/guide" },
      { text: "游戏存档", link: "/games/" },
      { text: "维护", link: "/maintenance" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "使用指南",
          items: [
            { text: "概览", link: "/guide/" },
            { text: "安装", link: "/guide/install" },
            { text: "CLI 使用", link: "/guide/usage-cli" },
            { text: "TUI 使用", link: "/guide/usage-tui" },
            { text: "规则与注意事项", link: "/guide/rules" },
            { text: "问题排查", link: "/guide/troubleshooting" }
          ]
        }
      ],
      "/games/": [
        {
          text: "游戏存档",
          items: [{ text: "概览", link: "/games/" }]
        }
      ],
      "/maintenance/": [
        {
          text: "维护",
          items: [{ text: "更新工作流", link: "/maintenance/workflow" }]
        }
      ]
    },
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EmptyEmeraldTablet/gitsave' }
    ]
  }
});
