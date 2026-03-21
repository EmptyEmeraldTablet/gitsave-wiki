# 更新工作流

## 目标

- 保持文档可持续更新且易于审阅。
- 每次变更都可追溯，并自动触发部署。

## 推荐流程

1. 拉取最新代码：`git pull`
2. 创建分支：`git switch -c docs/xxx`
3. 编辑文档并本地预览：
   - `npm install`
   - `npm run docs:dev`
4. 检查导航与链接是否正确
5. 提交并推送
6. Cloudflare Pages 自动构建发布

## Cloudflare Pages 配置

- Build command：`npm run docs:build`
- Output directory：`.vitepress/dist`
- Root directory：仓库根目录

如需使用 pnpm，请在项目根目录添加 `pnpm-lock.yaml` 并调整构建命令为 `pnpm docs:build`。
