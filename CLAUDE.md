- [中文说明](CLAUDE.md) | [English Docs](CLAUDE_en.md)

# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 在处理此仓库代码时提供指导。

## 命令

### 开发命令
```bash
# 启动开发服务器（同时运行 web 和 SSR）
pnpm dev

# 仅启动 web 开发服务器
pnpm --filter web dev

# 仅启动 SSR 开发服务器
pnpm --filter @afilmory/ssr dev

# 构建生产版本
pnpm build

# 从存储构建清单（生成照片元数据）
pnpm run build:manifest

# 强制重新构建所有照片和元数据
pnpm run build:manifest -- --force

# 仅强制重新生成缩略图
pnpm run build:manifest -- --force-thumbnails

# 仅强制重新生成清单
pnpm run build:manifest -- --force-manifest
```

### 数据库命令（SSR 应用）
```bash
# 生成数据库迁移
pnpm --filter @afilmory/ssr db:generate

# 运行数据库迁移
pnpm --filter @afilmory/ssr db:migrate
```

### 代码质量命令
```bash
# 代码检查并修复
pnpm lint

# 格式化代码
pnpm format

# 类型检查（web 应用）
pnpm --filter web type-check
```

## 架构

### 单体仓库结构
这是一个使用 pnpm 工作区的项目，包含多个应用和包：

- `apps/web/` - 主前端 React 应用（Vite + React 19）
- `apps/ssr/` - Next.js SSR 应用，用于服务端渲染和 API
- `packages/` - 共享包和工具
- `packages/builder/` - 照片处理和清单生成工具
- `packages/webgl-viewer/` - 基于 WebGL 的照片查看器组件

### 关键技术
- **前端**：React 19、TypeScript、Vite、Tailwind CSS、Jotai（状态管理）、TanStack Query
- **后端**：Next.js 15、Drizzle ORM、PostgreSQL
- **图像处理**：Sharp、EXIF 提取、WebGL 渲染
- **存储**：S3 兼容存储、GitHub 存储支持
- **构建工具**：pnpm 工作区、ESLint、Prettier

### 配置文件
- `builder.config.json` - 照片处理和存储配置
- `config.json` - 站点配置（名称、描述、作者等）
- `site.config.ts` - 带默认值的 TypeScript 站点配置
- `env.ts` - 环境变量验证和类型定义

### 照片处理流程
1. **存储同步**：从配置的存储（S3/GitHub）获取照片
2. **格式转换**：将 HEIC、TIFF 转换为网络兼容格式
3. **缩略图生成**：创建多种尺寸以提高性能
4. **EXIF 提取**：提取相机设置和 GPS 数据
5. **清单生成**：创建包含元数据的 `photos-manifest.json`

### 开发工作流程
- Web 应用在开发服务器上运行，支持热重载
- SSR 应用提供 API 和服务端渲染
- Builder 工具处理照片并生成元数据
- 数据库迁移处理架构变更

### 代码质量规则
1. 避免代码重复 - 提取通用类型和组件
2. 保持组件专注 - 使用钩子和组件组合
3. 遵循 React 最佳实践 - 正确使用 Context、状态管理
4. 严格使用 TypeScript - 在整个项目中利用类型安全

### 国际化指南
- 使用点分隔的扁平键（如 `exif.camera.model`）
- 使用 `_one` 和 `_other` 后缀支持复数形式
- 先修改英文，再修改其他语言（ESLint 自动移除未使用的键）
- 避免扁平结构中的嵌套键冲突

### 测试策略
- 查看 README.md 和 package.json 脚本获取测试命令
- 使用 `pnpm build` 验证构建是否正常工作
- 使用 `pnpm run build:manifest` 测试照片处理
- 使用 `pnpm --filter web type-check` 验证类型

## Cursor 规则集成

### 代码质量标准
- 避免代码重复 - 当多次使用时，提取通用类型和组件
- 保持组件专注 - 对大型逻辑块使用钩子和组件拆分
- 掌握 React 理念 - 正确使用 Context、组件组合、状态管理以防止不必要的重渲染

### UI/UX 指南
- 通过 tailwind-uikit-colors 包使用 Apple UIKit 色彩系统
- 优先使用语义化颜色名称：`text-primary`、`fill-secondary`、`material-thin` 等
- 遵循系统颜色：`red`、`blue`、`green`、`mint`、`teal`、`cyan`、`indigo`、`purple`、`pink`、`brown`、`gray`
- 使用基于不透明度的填充和适当对比度的材料设计原则

### 国际化开发规则
- 使用点表示法的扁平键：`exif.camera.model`
- 支持复数形式：`_one` 和 `_other` 后缀
- 始终先修改英语（`en.json`），然后再修改其他语言
- 避免扁平结构中的键冲突（例如 `exif.custom.rendered` 与 `exif.custom.rendered.custom`）
- ESLint 自动从非英语文件中删除未使用的键

## 重要说明
- 这是一个照片画廊应用，用于处理和显示来自云存储的照片
- Builder 工具处理复杂的图像处理工作流
- WebGL 查看器提供高性能的照片查看体验
- 地图集成显示来自 GPS EXIF 数据的照片位置
- 支持 iOS/Apple 设备视频的 Live Photo 功能