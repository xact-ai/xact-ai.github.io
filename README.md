# fsyiyu.github.io

极简的静态首页，托管在 GitHub Pages 上。纯手写 HTML / CSS / JavaScript，无框架、无构建、无外部请求。

## 文件

```
index.html      首页
404.html        GitHub Pages 自定义 404
site/
  content.js    ★ 全部内容都在这里
  home.css      样式（日读 / 夜读两套配色）
  home.js       渲染与主题切换
  favicon.svg   站标
x-act/          X-Act 项目页（内容与原来一致，仅资源路径改为 ../assets/…）
assets/         项目页共用的图片、视频与 PDF
```

## 改内容

只动 `site/content.js`：

- `name` / `intro` —— 页首名字与自我介绍
- `items` —— 列表条目，每条 `title` 名称、`text` 说明、`href` 地址；外链加 `external: true`
- `links` —— 页首右上角的外部链接
- `foot` —— 页脚

凡是需要撰写的文案，目前都用「测试文本」占位，直接替换即可。标题与链接请只填确实存在的内容。

## 本地预览

```bash
python -m http.server 8000
```

访问 <http://localhost:8000/>。`404.html` 里用的是绝对路径，需要在服务器下打开。

## 部署

```bash
git add -A
git commit -m "..."
git push
```

推送到 `main` 分支即可，GitHub Pages 从仓库根目录发布。
