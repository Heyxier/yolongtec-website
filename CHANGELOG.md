# 变更记录 (Changelog)

> 所有版本变更都记录在此文件，按时间倒序排列。

---


## [V7.3] - 2026-05-02

### 架构重构

- **打通 Jekyll 内容全链路**: `content/products/` 下的 Markdown 文件自动呈现在前端页面
- **分类页动态化**: 8 个产品分类页 (`products/drill/` `hammer/` 等) 从 `site.products` 集合动态筛选渲染
- **分类网格动态化**: `products/index.html` 从 `_data/categories.yml` 动态读取分类，增删分类只需改 YAML
- **清理冲突文件**: 移除 `content/products/` 下的 8 个分类占位符 `.md` 文件和 `index.html`（与静态页面 URL 冲突）

### 新增

- `_layouts/category.html` — 分类产品列表布局模板（增强版）

### 操作变化

- 新增产品: 只需在 `content/products/` 下添加 `.md` 文件，自动出现在对应分类页
- 增删分类: 只需修改 `_data/categories.yml`，无需改动 HTML 页面
- 旧静态产品详情页 (`.html`) 暂保留，待逐步迁移至 Markdown

---

## [V7] - 2026-04-27

### 新增

- **产品分类扩展**: 从 4 类扩展为 8 类
  - DRILL（电钻）- 含真实图片
  - FASTENING（扳手）- 含真实图片
  - GRINDER & CUTTER（角磨与切割机）- 含真实图片
  - HAMMER（电锤）- 占位符
  - SAW（电锯）- 含真实图片
  - SANDER & POLISHER（砂光机）- 占位符
  - CLEANNING（除尘设备）- 占位符
  - LIGHTING（照明设备）- 占位符

- **导航下拉菜单**: PRODUCTS 改为弹出式下拉菜单
  - 桌面端: hover 展开
  - 移动端: 点击展开/收起
  - 橙色高亮当前分类

- **新建文件**:
  - `products/drill/index.html`
  - `products/fastening/index.html`
  - `products/grinder-cutter/index.html`
  - `products/hammer/index.html`
  - `products/saw/index.html`
  - `products/sander-polisher/index.html`
  - `products/cleanning/index.html`
  - `products/lighting/index.html`
  - `products-dropdown.css`
  - `SPEC.md`
  - `VERSION_GUIDE_V7.md`

### 修改

- `products/index.html` — 重构为 8 分类网格
- `index.html` — 添加 PRODUCTS 下拉菜单
- `solutions/index.html` — 添加 PRODUCTS 下拉菜单
- `innovation/index.html` — 添加 PRODUCTS 下拉菜单
- `support/index.html` — 添加 PRODUCTS 下拉菜单
- `contact/index.html` — 添加 PRODUCTS 下拉菜单
- `about/index.html` — 添加 PRODUCTS 下拉菜单
- `script.js` — 添加移动端下拉交互

### 设计保留

- 主色: Pantone 357 C (#006847)
- 强调色: Pantone 158 C (#FF3F00)
- 字体: Helvetica Neue
- 深色背景风格

---

## [V6] - 2026-04-17

### 新增

- **多层架构网站**: 首页 + 6 个二级页面
- **产品目录页面**: `products/index.html`
- **解决方案页面**: `solutions/index.html`
- **创新技术页面**: `innovation/index.html`
- **服务支持页面**: `support/index.html`
- **联系我们页面**: `contact/index.html`
- **关于我们页面**: `about/index.html`

### 版本确认

> V5 (V6) 被确认为冻结版本，作为后续开发的基础。

---

## [V5 冻结说明]

> V5 是基于 yolongtec-website-demo 重构的确认版本。
> V4.1、V4.2、V4.3 均被否定，V5 成为最终确认版本。

### 版本历史 (V4 时期)

| 版本 | 状态 | 说明 |
|------|------|------|
| V4 | 冻结 | 初始确认版本 |
| V4.1 | ❌ 否定 | Milwaukee 风格尝试 |
| V4.2 | ❌ 否定 | 2 列布局尝试 |
| V4.3 | ❌ 否定 | Hero/CTA 修复尝试 |
| V5 | ✅ 确认 | 最终确认版本 |

---

## [yolongtec-website-demo] - 2026-04-16

### 概述

> Demo 版本冻结，标记为 V10 Demo。

- **样式**: 深色厚重背景，主色占比 50%+
- **字体**: Helvetica Neue
- **页面**: HOME / PRODUCTS / SOLUTIONS / INNOVATION / SUPPORT / CONTACT
- **图片**: 13 张本地图片，可离线预览

### 文件结构

```
yolongtec-website-demo/
├── index.html
├── styles.css
├── script.js
├── logo-green.png / svg
├── logo-white.png / svg
└── images/ (13张)
```

---

**格式说明**: 使用 [Keep a Changelog](https://keepachangelog.com/) 规范  
**版本历史**: V7 → V7.2 (Decap CMS 尝试) → V7.3 (Jekyll 全链路打通)  
**类型说明**: Features / Bug Fixes / Refactoring / Documentation / Dependencies