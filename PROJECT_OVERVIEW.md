# 图片拼贴制作器 (Image Collage Maker) - 项目概述

## 项目简介

这是一个基于 Next.js 14 和 Fabric.js 的在线图片拼贴制作工具。用户可以选择不同的模板和画布尺寸，上传图片并创建个性化的图片拼贴作品。

## 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架，使用 App Router
- **React 18.3.1** - 用户界面库
- **TypeScript 5.0.4** - 类型安全的 JavaScript

### UI 组件库
- **NextUI v2.4.6** - 现代化 React UI 组件库
- **Tailwind CSS 3.4.3** - 实用优先的 CSS 框架
- **Framer Motion 11.1.1** - 动画库

### 状态管理
- **Redux Toolkit 2.2.3** - 状态管理工具
- **React Redux 9.1.1** - React 与 Redux 的绑定

### 画布处理
- **Fabric.js 6.0.0-beta20** - HTML5 画布库，用于图片编辑和操作

### 工具库
- **React Hot Toast 2.4.1** - 轻量级通知组件
- **Next Themes 0.2.1** - 主题切换功能
- **CLSX 2.1.1** - 条件类名工具

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - CSS 前缀自动添加

## 项目结构

```
image-collage-maker/
├── app/                          # Next.js App Router 目录
│   ├── error.tsx                # 错误页面
│   ├── layout.tsx               # 根布局组件
│   ├── page.tsx                 # 主页面
│   └── providers.tsx            # 全局提供者组件
├── src/                         # 源代码目录
│   ├── app.tsx                  # 主应用组件
│   ├── components/              # React 组件
│   │   ├── Button/             # 按钮组件
│   │   │   ├── downloadButton.tsx      # 下载按钮
│   │   │   ├── setBorderButton.tsx     # 设置边框按钮
│   │   │   ├── setConvanSizeButton.tsx # 设置画布尺寸按钮
│   │   │   └── templateButton.tsx      # 模板选择按钮
│   │   ├── modal/              # 模态框组件
│   │   │   ├── selectTemplate.tsx      # 模板选择模态框
│   │   │   ├── setCanvanSize.tsx       # 画布尺寸设置模态框
│   │   │   └── setImageBorder.tsx      # 图片边框设置模态框
│   │   ├── Canvas.tsx          # 主画布组件
│   │   ├── icons.tsx           # 图标组件
│   │   ├── navbar.tsx          # 导航栏组件
│   │   ├── theme-switch.tsx    # 主题切换组件
│   │   └── toolbar.tsx         # 工具栏组件
│   ├── constants/              # 常量定义
│   │   └── canvasConfig.ts     # 画布配置（模板、比例等）
│   ├── hooks/                  # 自定义 React Hooks
│   │   ├── useReduxAction.ts   # Redux 操作 Hook
│   │   └── useReduxData.ts     # Redux 数据 Hook
│   ├── redux/                  # Redux 状态管理
│   │   ├── canvasSlice.ts      # 画布状态切片
│   │   ├── selectedImageSlice.ts # 选中图片状态切片
│   │   ├── hooks.ts            # Redux Hooks
│   │   └── store.ts            # Redux 存储配置
│   ├── types/                  # TypeScript 类型定义
│   │   ├── canvas.ts           # 画布相关类型
│   │   ├── images.ts           # 图片相关类型
│   │   └── index.ts            # 类型导出
│   └── utils/                  # 工具函数
│       └── aspectRatioHelper.ts # 宽高比计算工具
├── styles/                     # 样式文件
│   └── globals.css             # 全局样式
├── config/                     # 配置文件
│   ├── fonts.ts                # 字体配置
│   └── site.ts                 # 站点配置
└── 配置文件
    ├── package.json            # 项目依赖和脚本
    ├── next.config.js          # Next.js 配置
    ├── tailwind.config.js      # Tailwind CSS 配置
    ├── tsconfig.json           # TypeScript 配置
    └── postcss.config.js       # PostCSS 配置
```

## 核心功能模块

### 1. 画布系统 (Canvas)
- **位置**: `src/components/Canvas.tsx`
- **功能**: 
  - 基于 Fabric.js 的画布渲染
  - 图片上传和拖拽
  - 图片缩放和裁剪
  - 模板布局应用

### 2. 模板系统
- **位置**: `src/constants/canvasConfig.ts`
- **功能**:
  - 预定义拼贴模板（2张横图、3张横图、3张竖图等）
  - 动态布局计算
  - 响应式设计支持

### 3. 状态管理
- **画布状态** (`src/redux/canvasSlice.ts`):
  - 画布实例管理
  - 模板和比例选择
  - 画布尺寸设置
  - 边框宽度控制

- **选中图片状态** (`src/redux/selectedImageSlice.ts`):
  - 当前选中图片管理
  - 图片操作状态

### 4. 工具栏功能
- **模板选择**: 多种拼贴布局模板
- **画布尺寸**: 自定义画布宽度和高度
- **边框设置**: 调整图片边框宽度
- **下载功能**: 导出拼贴作品

### 5. 响应式设计
- 支持不同屏幕尺寸
- 移动端友好的交互
- 自适应画布大小

## 数据流

1. **用户操作** → 组件事件处理
2. **组件** → Redux Actions → Redux Store
3. **Store 更新** → 组件重新渲染
4. **Canvas 组件** → Fabric.js 画布更新

## 开发环境

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 部署

项目配置了 Vercel 部署支持，包含 `vercel.json` 配置文件。

## 特色功能

1. **多种模板**: 支持多种拼贴布局模板
2. **实时预览**: 所见即所得的编辑体验
3. **主题切换**: 支持明暗主题切换
4. **响应式设计**: 适配各种设备屏幕
5. **高质量导出**: 支持高分辨率图片导出

## 技术亮点

- 使用 Fabric.js 实现专业的画布操作
- Redux Toolkit 提供高效的状态管理
- NextUI 提供现代化的 UI 组件
- TypeScript 确保代码类型安全
- 模块化架构便于维护和扩展
