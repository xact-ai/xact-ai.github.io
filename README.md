# xact-ai.github.io

GitHub Pages 根站点。纯静态、无构建步骤、无外部请求。

## 地址

| 地址 | 内容 |
|---|---|
| `/` | X-Act 论文项目页（`/x-act/` 的副本，已去掉 Paper (PDF) 按钮与 Citation 区块） |
| `/x-act/` | X-Act 论文项目页原件，内容保持不动 |
| `/portfolio/` | 个人作品集（页首名字 `fsyiyu`） |

## 目录结构

```
index.html            根地址：论文项目页副本
style.css
script.js
videos_manifest.js
404.html              自定义 404（样式取自 /portfolio/site/）
x-act/                论文项目页原件
portfolio/
  index.html          作品集首页
  site/               作品集样式、脚本、内容配置与图标
    content.js        ★ 作品集全部文案都在这里
assets/               共用图片、视频与论文 PDF
```

## 论文页的两份副本

`/x-act/` 是原件，根目录的 `index.html`、`style.css`、`script.js`、`videos_manifest.js` 是它的副本。两处差别：

1. 资源前缀：根副本用 `assets/…`，原件用 `../assets/…`。
2. 根副本刻意删除了首屏 `Paper (PDF)` 按钮、导航栏 Citation 链接和整个 Citation 区块；原件保留这些内容。

改论文页时请两处一起改，或从 `/x-act/` 重新同步：

```powershell
Copy-Item x-act\index.html, x-act\style.css, x-act\script.js, x-act\videos_manifest.js .
# 然后把 index.html 里的 ../assets/ 改为 assets/，
# 把 videos_manifest.js 里的 ../assets/media/demo/ 改为 assets/media/demo/
# 最后重新删除根 index.html 里的 Paper (PDF) 按钮、导航 Citation 链接和 Citation 区块
```

## 改作品集

只动 `portfolio/site/content.js`：`name`、`intro`、`works.items[].text`、`contact.text` 等。凡是〔〕包起来的文字是待填占位，页面上显示为虚线下划线。

作品集里指向论文页的卡片地址是 `../x-act/`。

## 本地预览

```bash
python -m http.server 8000
```

访问 <http://localhost:8000/>（论文页）、<http://localhost:8000/portfolio/>（作品集）。

## 部署

```bash
git add -A
git commit -m "..."
git push
```

推送到 `main` 分支即可，GitHub Pages 从仓库根目录发布。
