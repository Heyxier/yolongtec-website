# Yolongtec 网站项目规格说明书

> 本文件是项目的核心规格文档，每次版本变更前需先更新此文档。

---

## 一、项目概述

**项目名称**: Yolongtec 企业官网  
**项目类型**: 静态响应式网站 + Git-based CMS  
**品牌定位**: Yolong Power Tools — 专业电动工具制造商  
**目标用户**: 专业工程师、建筑工人、经销商  
**当前版本**: V7.3  
**CMS 方案**: Markdown 文件 + Jekyll Collection（通过 GitHub 直接编辑）  
**基础版本**: V7 (静态网站，已冻结)

---

## 二、设计系统

### 色彩规范

| 用途 | 名称 | 色值 | 说明 |
|------|------|------|------|
| 主色 | Pantone 357 C | `#006847` | 深绿色，品牌主色 |
| 主色-深 | Dark Green | `#005239` | 深色变体 |
| 主色-浅 | Light Green | `#008F63` | 浅色变体 |
| 主色-最深 | Deep Green | `#003d2b` | 最深变体 |
| 强调色 | Pantone 158 C | `#FF3F00` | 橙红色，小面积点缀 |
| 强调色-深 | Dark Orange | `#CC2A00` | 深色变体 |
| 背景色 | Charcoal | `#0a0a0a` | 深黑背景 |
| 背景色-浅 | Dark Gray | `#1a1a1a` | 浅灰背景 |
| 文字色 | White | `#ffffff` | 主文字色 |
| 文字色-次 | Light Gray | `rgba(255,255,255,0.85)` | 次要文字 |

### 字体规范

| 用途 | 字体 | 字重 | 说明 |
|------|------|------|------|
| 主字体 | Helvetica Neue | 300/400/500/700/900 | 西文正文 |
| 备用字体 | Arial, sans-serif | — | 降级方案 |

### 间距系统

```
--spacing-xs:   8px
--spacing-sm:   16px
--spacing-md:   24px
--spacing-lg:   32px
--spacing-xl:   48px
--spacing-2xl:  64px
--spacing-3xl:  96px
--spacing-4xl:  128px
```

### 动画规范

| 动画 | 时长 | 缓动 |
|------|------|------|
| Base | 0.3s | ease |
| Slow | 0.5s | ease |
| Fast | 0.15s | ease |

---

## 三、页面结构

### 页面清单

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `index.html` | 品牌门户，含 Hero + Stats |
| 产品目录 | `products/index.html` | 8 大产品分类网格 |
| 产品-电钻 | `products/drill/index.html` | 电钻分类 |
| 产品-扳手 | `products/fastening/index.html` | 扳手分类 |
| 产品-角磨 | `products/grinder-cutter/index.html` | 角磨与切割机 |
| 产品-电锤 | `products/hammer/index.html` | 电锤分类 |
| 产品-电锯 | `products/saw/index.html` | 电锯分类 |
| 产品-砂光机 | `products/sander-polisher/index.html` | 砂光机分类 |
| 产品-除尘 | `products/cleanning/index.html` | 除尘设备分类 |
| 产品-照明 | `products/lighting/index.html` | 照明设备分类 |
| 解决方案 | `solutions/index.html` | 行业解决方案 |
| 创新技术 | `innovation/index.html` | 技术创新展示 |
| 服务支持 | `support/index.html` | 技术支持 |
| 联系我们 | `contact/index.html` | 联系表单 |
| 关于我们 | `about/index.html` | 公司介绍 |
| CMS 管理后台 | `admin/index.html` | Decap CMS 可视化编辑入口 |

### 导航结构

```
首页 (index.html)
├── PRODUCTS → products/index.html (下拉菜单)
│   ├── DRILL → products/drill/index.html
│   ├── FASTENING → products/fastening/index.html
│   ├── GRINDER & CUTTER → products/grinder-cutter/index.html
│   ├── HAMMER → products/hammer/index.html
│   ├── SAW → products/saw/index.html
│   ├── SANDER & POLISHER → products/sander-polisher/index.html
│   ├── CLEANNING → products/cleanning/index.html
│   └── LIGHTING → products/lighting/index.html
├── SOLUTIONS → solutions/index.html
├── INNOVATION → innovation/index.html
├── SUPPORT → support/index.html
├── CONTACT → contact/index.html
└── ABOUT US → about/index.html
```

---

## 四、产品分类详情

### 分类结构

| 分类 | 英文名 | 子产品数 | 图片状态 |
|------|--------|----------|----------|
| 电钻 | DRILL | 14 ✅ | ✅ 真实图片（部分） |
| 扳手 | FASTENING | 4 | ✅ 真实图片 |
| 角磨与切割机 | GRINDER & CUTTER | 4 | ✅ 真实图片 |
| 电锤 | HAMMER | 4 | 🟡 占位符 |
| 电锯 | SAW | 4 | ✅ 真实图片 |
| 砂光机 | SANDER & POLISHER | 4 | 🟡 占位符 |
| 除尘设备 | CLEANNING | 4 | 🟡 占位符 |
| 照明设备 | LIGHTING | 4 | 🟡 占位符 |

### 产品卡片模板

每个产品分类页包含 4 个产品卡片，结构如下：

```html
<div class="product-card">
    <div class="product-image">
        <img src="图片路径" alt="产品名">
        <div class="product-overlay">
            <a href="#" class="btn btn-accent">VIEW DETAILS</a>
        </div>
    </div>
    <div class="product-info">
        <h3 class="product-name">产品名称</h3>
        <p class="product-desc">产品描述</p>
    </div>
</div>
```

---

## 五、技术规范

### 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 静态站点 | Jekyll | 静态网站生成器 |
| CMS | Decap CMS | Git-based 可视化内容管理 |
| 部署 | GitHub Pages | 自动托管 |
| 构建 | GitHub Actions | CI/CD 自动构建 |
| HTML | HTML5 | 语义化标签 |
| CSS | CSS3 | 原生 CSS，无框架 |
| JS | ES6+ | 原生 JavaScript |
| 图片格式 | JPG/PNG/SVG | 图片资源 |
| 字体 | Helvetica Neue | 品牌字体 |

### V7.3 内容管理架构

```
yolongtec-v7.3/
├── _config.yml              # Jekyll 配置
├── _data/
│   └── categories.yml       # 产品分类配置（增删分类改此文件）
├── _layouts/                # Jekyll 布局模板
│   ├── default.html
│   ├── category.html        # 分类产品列表模板
│   ├── product.html         # 产品详情页模板
│   └── article.html         # 文章模板
├── content/
│   ├── products/            # 产品内容 (Markdown 文件)
│   │   ├── zpt-cd-18502.md  # 电钻示例
│   │   └── zpt-hm-22602.md  # 电锤示例
│   └── articles/            # 文章内容 (Markdown 文件)
│       └── 2026-award.md    # 文章示例
├── products/                # 前端分类页（Jekyll Page）
│   ├── index.html           # 分类网格（动态从 categories.yml 渲染）
│   ├── drill/index.html     # 电钻产品列表（动态从 collection 筛选）
│   ├── hammer/index.html    # 电锤产品列表
│   └── ...                  # 其余 6 个分类
├── .github/workflows/build.yml
├── index.html               # 首页
├── styles.css
├── script.js
└── ...（其他静态文件）
```

### 响应式断点

| 设备 | 断点 | 布局 |
|------|------|------|
| 桌面端 | >1200px | 4列/3列网格 |
| 平板端 | 768-1200px | 2列网格 |
| 移动端 | <768px | 单列 + 汉堡菜单 |

---

## 六、组件清单

### 按钮

| 类型 | 类名 | 颜色 |
|------|------|------|
| 主要按钮 | `.btn-accent` | 橙色 #FF3F00 |
| 轮廓按钮-亮 | `.btn-outline-light` | 白色边框 |
| 大尺寸按钮 | `.btn-large` | 放大版本 |

### 导航栏

- 固定顶部
- 滚动时添加阴影
- 当前页面橙色下划线
- 移动端汉堡菜单

### 产品卡片

- 悬停上浮 + 阴影加深
- 遮罩层渐变
- VIEW DETAILS 按钮

### 统计数字

- 数字滚动动画
- 深绿色背景条
- 橙色单位符号

---

## 七、Decap CMS 内容管理

### 访问方式

- 访问路径: `/admin/`
- 本地预览: `npx decap-server --port 8080`

### 可管理内容

| 内容类型 | 路径 | 说明 |
|----------|------|------|
| 产品 | `content/products/` | Markdown 格式 |
| 文章 | `content/articles/` | Markdown 格式 |

### 配置说明

编辑 `_config.yml` 中的 `repo` 字段以连接 GitHub 仓库：

```yaml
backend:
  name: github
  repo: your-username/yolongtec   # 改成你的仓库
  branch: main
```

---

## 八、部署说明

### GitHub Actions 自动构建

每次推送到 `main` 分支自动触发构建：

1. 安装 Ruby 和 Jekyll 依赖
2. 执行 `jekyll build`
3. 将构建产物复制到 `_site/`
4. 部署到 GitHub Pages

### 本地预览

```bash
# 预览静态网站
cd yolongtec-v7.2
python -m http.server 8080

# 预览 Decap CMS（需先安装）
npx decap-server --port 8080
# 访问 http://localhost:8080/admin/
```

### 生产部署

```bash
# 打包（排除 .git 目录）
zip -r yolongtec-v7.2-package.zip yolongtec-v7.2/ -x "*/.git/*"
```

---

## 九、版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| V7.3 | 2026-05-02 | 打通 Jekyll 全链路，Markdown 文件自动呈现到前端页面 |
| V7.2 | 2026-04-30 | 集成 Decap CMS，添加内容管理功能 |
| V7 | 2026-04-27 | 8大产品分类，导航下拉菜单，冻结版本 |
| V6 | 2026-04-17 | 多层架构网站，6个二级页面 |
| V5 | 2026-04-16 | 确认冻结版本 |

---

## 十、待完成事项

### 内容完善

- [ ] 4 个产品分类（HAMMER/SANDER/CLEANNING/LIGHTING）替换真实图片
- [ ] 填写真实产品规格参数
- [ ] 完善解决方案内容
- [ ] 添加新闻动态内容

### 功能扩展

- [ ] 产品详情页
- [ ] 产品对比功能
- [ ] 搜索功能

### SEO 优化

- [ ] 各页面 Meta 描述
- [ ] 结构化数据
- [ ] Sitemap

---

**最后更新**: 2026-05-02  
**更新人**: 灰色 (AI Assistant)  
**版本**: V7.3