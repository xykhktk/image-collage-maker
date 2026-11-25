# Cloudflare 部署指南

本项目是**纯静态站点**：拼图编辑（fabric.js 画布）全部在浏览器端完成，
构建产物是 `out/` 目录下的静态文件，部署到 Cloudflare Workers 静态资源，
不需要服务器、数据库或队列。

## 1. 环境准备

```bash
pnpm install
npx wrangler login # 首次使用：登录 Cloudflare 账号（浏览器授权）
```

部署配置在 [wrangler.jsonc](wrangler.jsonc)：站点名 `image-collage-maker`，
静态资源目录 `./out`，未命中路径返回 `404.html`。

## 2. 本地开发与预览

```bash
pnpm dev       # Next.js 开发服务器（热更新）
pnpm preview   # 构建后用 wrangler dev 预览，行为与线上一致（含 404）
```

## 3. 部署

```bash
pnpm deploy:cf   # = next build && wrangler deploy
```

> 注意：不要用 `pnpm deploy` —— 那是 pnpm 的内置命令（workspace 专用），
> 会报 `ERR_PNPM_CANNOT_DEPLOY`；脚本名用了 `deploy:cf` 避开它。

首次部署后会得到一个 `https://image-collage-maker.<你的子域>.workers.dev` 地址，
之后每次更新代码只需再执行 `pnpm deploy:cf`。

## 4. 绑定自定义域名

在 Cloudflare Dashboard 中：

1. 进入 **Workers & Pages → image-collage-maker**
2. **Settings → Domains & Routes → Add → Custom domain**
3. 添加你的域名（域名需已托管在 Cloudflare）

## 5. 部署后需要替换的占位内容

以下位置的 `your-domain.com` / 占位符需要换成实际值：

- `config/site.ts` 的 `url`（影响 sitemap、canonical、OG 标签）
- `public/robots.txt` 末尾的 `Sitemap:` 地址
- `app/layout.tsx` 中 `verification` 的 Google/Yandex 验证码
- `app/layout.tsx` 中 `twitter.creator` 的用户名
- `config/site.ts` 的 `ogImage`（`public/` 里目前没有 og-image.jpg 等图片资源，缺 favicon/og 图会影响分享卡片）

## 6. 与之前 Vercel 部署的差异

- 已删除 `vercel.json`、`@vercel/analytics`（如需统计，建议改用 Google Analytics 或 Cloudflare Web Analytics）
- `next.config.js` 开启 `output: 'export'` 静态导出，`next start` 已不可用（移除该脚本）
- `app/sitemap.ts` 加了 `export const dynamic = 'force-static'`（静态导出对 metadata 路由的要求）
