# 高级 Git 操作

本页面介绍如何在 gitsave 基础上使用原生 Git 指令操作存档存储库，实现更复杂的功能和工作流程。

**前置条件**：
- 已安装 gitsave
- 已安装 Git
- 对 Git 基本概念有理解（分支、提交、远程库等）

## 仓库结构说明

gitsave 初始化的仓库是一个完全标准的 Git 仓库，与使用 `git init` 创建的仓库结构完全一致，没有任何额外的 gitsave 特有目录。你可以在任何支持 Git 的工具中操作它：

```
<repository>
├── .git/               # Git 内部数据（由 libgit2 管理）
└── game_save_file      # 游戏存档文件
```

这意味着 gitsave 的存档、路线等所有管理功能都通过标准的 Git 分支和提交实现，完全兼容原生 Git 工具和工作流。

## 基本 Git 操作

### 查看存档历史

```bash
git log --oneline
```

显示所有保存的存档，每行包含提交哈希和描述。

### 查看两个存档的差异

```bash
git diff <commit1> <commit2>
```

对比两个存档之间的存档文件变化。

### 检查存档大小历史

```bash
git rev-list --all --objects | sort -k 2 | tail -20
```

查看最大的对象，帮助你识别占用空间的存档。

## 云存档同步

### 配置远程仓库

在初始化 gitsave 仓库后，可以配置远程库实现云同步：

```bash
# 添加远程库（以 GitHub 为例）
git remote add origin https://github.com/your_username/game-archive.git

# 或使用 SSH
git remote add origin git@github.com:your_username/game-archive.git
```

### 上传存档到云端

```bash
# 首次上传（推送当前分支）
git push -u origin main

# 之后的推送
git push

# 推送所有路线（分支）
git push -u origin "*:*"
```

### 从云端下载存档

```bash
# 获取所有远程更新
git fetch origin

# 拉取并合并新存档
git pull origin main

# 拉取特定路线
git pull origin <route_name>
```

### 同步所有路线

```bash
# 拉取所有远程分支的信息
git fetch --all

# 查看所有本地和远程分支
git branch -a

# 切换到远程路线（自动创建本地跟踪分支）
git checkout --track origin/<route_name>
```

## 高级操作场景

### 场景 1：整理存档历史

如果存档历史过长，可以使用交互式变基（谨慎使用）：

```bash
# 整理最后 10 个提交
git rebase -i HEAD~10
```

**警告**：变基会改变提交历史，可能导致云同步冲突。建议仅在本地操作。

### 场景 2：备份到多个云端

```bash
# 添加第二个远程库
git remote add backup https://github.com/your_username/game-archive-backup.git

# 同时推送到两个远程库
git push origin main
git push backup main

# 或配置 push.default 实现一次推送到两个库
git config remote.all.url https://github.com/your_username/game-archive.git
git config --add remote.all.url https://github.com/your_username/game-archive-backup.git
```

### 场景 3：在多设备间同步

设备 A（主设备）：

```bash
# 保存存档后推送
gitsave save "关键进度"
git push origin
```

设备 B（从设备）：

```bash
# 拉取主设备的最新存档
git pull origin main

# 切换到最新存档
gitsave route list    # 查看可用路线
gitsave route switch <route_name>  # 切换路线
```

### 场景 4：处理路线冲突

若两个设备同时修改存档产生冲突：

```bash
# 查看冲突状态
git status

# 查看冲突内容
git diff

# 选择保留远程版本
git checkout --theirs <file>

# 或保留本地版本
git checkout --ours <file>

# 完成合并
git add <file>
git commit -m "解决冲突：保留本地版本"
git push origin
```

## 工作流建议

### Git Flow (推荐用于分支管理)

```bash
# 创建新路线进行试验
git checkout -b experiment/new-build

# 保存存档
gitsave save "尝试新的构建"

# 切换回主路线
git checkout main

# 合并实验路线
git merge experiment/new-build

# 推送到云端
git push origin main
```

### 标签标记重要里程碑

```bash
# 创建标签
git tag -a v1.0 -m "第一章完成"

# 推送标签到云端
git push origin v1.0

# 查看所有标签
git tag -l
```

## 注意事项

### 1. 混合使用 gitsave 和 Git 命令

- gitsave 的"路线"概念对应 Git 的分支机制
- 使用 Git 命令创建的分支也是有效的路线
- 建议在同一个工作流中保持一致：全使用 gitsave 命令或全使用 Git 命令
- 如果混合使用，确保理解两者对分支和提交的操作是等价的

### 2. 大文件处理

如果存档文件很大（>100MB）：

```bash
# 使用 Git LFS（大文件存储）
git lfs install
git lfs track "*.sav"
git add .gitattributes
git push origin main
```

### 3. 敏感信息保护

如果同步敏感数据（如个人存档）：

```bash
# 仅推送特定路线到公开库
git push origin main

# 私有路线仅在本地保存
git push origin --tags
```

### 4. 性能优化

针对大型仓库：

```bash
# 垃圾回收与打包
git gc --aggressive

# 浅克隆（仅获取部分历史）
git clone --depth 50 https://github.com/your_username/game-archive.git
```

## 故障排除

### 问题：推送失败 "rejected: fetch first"

**解决方案**：

```bash
# 先获取远程更新
git fetch origin

# 然后再推送
git push origin main

# 或者直接拉取后推送
git pull origin main
git push origin main
```

### 问题：本地和远程分支不同步

**解决方案**：

```bash
# 查看分支状态
git branch -v

# 硬重置到远程分支
git reset --hard origin/main
```

### 问题：意外删除了提交

**解决方案**：

```bash
# 查看所有操作历史
git reflog

# 恢复到之前的状态
git reset --hard <commit_hash>
```

## 进阶资源

- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [GitHub 帮助文档](https://docs.github.com)
