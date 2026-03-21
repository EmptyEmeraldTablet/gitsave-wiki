# gitsave Wiki

本仓库是 gitsave 的独立文档站点，基于 VitePress 构建。

## 本地开发

```bash
npm install
npm run docs:dev
```

## 构建发布

```bash
npm run docs:build
```

Cloudflare Pages 配置：

- Build command：`npm run docs:build`
- Output directory：`docs/.vitepress/dist`
- Root directory：仓库根目录

## 文档结构

- `docs/guide/`：安装、CLI/TUI 使用、规则与问题排查
- `docs/games/`：游戏存档专项指南
- `docs/templates/`：游戏页模板
- `docs/maintenance/`：维护与更新工作流
