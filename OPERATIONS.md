# Yolongtec 网站运营规范

> 本文件定义网站内容管理的工作流程，所有运营人员必须遵守。

---

## 一、内容存放位置

所有内容文件存放在仓库根目录的 `content/` 文件夹下：

```
content/
├── products/          ← 产品页面（Markdown 文件）
│   ├── zpt-cd-18502.md   ← 示例：电钻产品
│   ├── zpt-hm-22602.md   ← 示例：电锤产品
│   └── ...               ← 新产品按此格式添加
│
└── articles/          ← 新闻文章（Markdown 文件）
    ├── 2026-award.md     ← 示例：获奖报道
    └── ...               ← 新文章按此格式添加
```

**重要：** 不要修改 `content/` 之外的其他文件（如 `index.html`、`styles.css` 等），除非明确知道自己在做什么。

---

## 二、产品添加/修改流程

### 标准步骤

**第 1 步：进入 GitHub 仓库**
打开 https://github.com/Heyxier/yolongtec-website-demo/tree/main/content/products

**第 2 步：新建或编辑文件**

- **添加新产品：** 点 `Add file` → `Create new file`
- **修改现有产品：** 点击文件名 → 点右上角铅笔图标

**第 3 步：复制模板格式**

新建文件时，文件名使用以下格式：
```
zpt-产品型号.md
示例：zpt-hm-22602.md（对应 ZPT-HM-22602 产品）
```

复制以下模板到文件内容区：

```yaml
---
model: "产品型号"
name: "产品名称"
category: "产品分类"        # drill / fastening / grinder-cutter / hammer / saw / sander-polisher / cleanning / lighting
voltage: "电压"
torque: "扭矩/冲击能量"
motorType: "standard" 或 "brushless"
speed: "转速"
weight: "重量"
image: "/images/图片路径"  # 暂时用 /images/hammer-placeholder.jpg 占位
features:
  - "特点1"
  - "特点2"
accessories:
  - "配件1"
  - "配件2"
certifications: "CE / UL / RoHS"
description: "产品描述文字"
status: true
---

# 产品标题

正文内容，使用 Markdown 格式。

## 技术参数

| 参数 | 规格 |
|------|------|
| 电压 | 20V |
| ... | ... |
```

**第 4 步：提交保存**

- 点 `Commit changes`
- 提交信息填写格式：`Add product: 产品型号 - 产品名称`
- 示例：`Add product: ZPT-HM-22602 - 无刷充电式电锤`

**第 5 步：等待自动构建**

- 提交后自动触发 GitHub Actions 构建（约 1-2 分钟）
- 打开 https://github.com/Heyxier/yolongtec-website-demo/actions 查看状态
- 看到绿色 ✅ 即构建成功，网站自动更新

---

## 三、文章发布流程

**文件存放位置：** `content/articles/`

**文件名格式：** `yyyy-article-slug.md`
**示例：** `2026-05-01-new-product-launch.md`

**模板格式：**

```yaml
---
title: "文章标题"
category: "news" 或 "product" 或 "about"  # news=新闻动态 product=产品发布 about=企业动态
publishedAt: "2026-05-01T10:00:00+08:00"
excerpt: "文章摘要，不超过100字"
coverImage: "/images/文章封面图.jpg"
tags:
  - "标签1"
  - "标签2"
status: true
---

# 文章标题

正文内容，使用 Markdown 格式。
```

**提交流程：** 同产品流程，只是路径为 `content/articles/`。

---

## 四、更新何时生效

| 操作 | 生效时间 | 说明 |
|------|---------|------|
| 提交产品/文章文件 | **约 1-2 分钟** | GitHub Actions 自动构建 |
| 构建失败（红色 ❌）| 不生效 | 需修复错误后重新提交 |
| 修改静态页面（html/css）| 约 1-2 分钟 | 同上 |

**如何确认更新成功：**
1. 打开 https://github.com/Heyxier/yolongtec-website-demo/actions
2. 确认最新 workflow run 为 **绿色 ✅**
3. 打开网站对应页面刷新确认内容

---

## 五、构建失败处理

如果构建出现 **红色 ❌**，点击失败的 workflow run 查看日志。

**常见错误及解决方法：**

| 错误信息 | 原因 | 解决方法 |
|---------|------|---------|
| `YAML syntax error` | `---` 之间的字段格式错误 | 检查冒号、引号、缩进是否正确 |
| `file not found` | 引用了不存在的图片路径 | 确认 `/images/图片名.jpg` 文件存在 |
| ` Jekyll build failed` | MD 文件里有语法问题 | 检查 Markdown 格式 |

遇到构建失败可以截图错误信息，联系技术支持。

---

## 六、图片上传

图片文件存放在仓库根目录的 `images/` 文件夹。

**上传方式：**
1. 打开 https://github.com/Heyxier/yolongtec-website-demo/tree/main/images
2. 点 `Add file` → `Upload files`
3. 拖拽或选择图片文件
4. 提交时记得 commit

**引用图片的路径格式：**
```
/images/文件名.jpg
示例：/images/product-hammer-01.jpg
```

---

## 七、产品分类参考

在 frontmatter 的 `category` 字段中使用以下值：

| 分类 | category 值 | 说明 |
|------|-------------|------|
| 电钻 | `drill` | 充电式/有线式电钻 |
| 扳手 | `fastening` | 冲击扳手、螺丝批 |
| 角磨与切割机 | `grinder-cutter` | 角磨机、切割机 |
| 电锤 | `hammer` | 混凝土冲击钻 |
| 电锯 | `saw` | 往复锯、圆锯 |
| 砂光机 | `sander-polisher` | 抛光机、砂光机 |
| 除尘设备 | `cleanning` | 工业吸尘器 |
| 照明设备 | `lighting` | 工作灯、手电筒 |

---

## 八、网站地址

| 环境 | 地址 |
|------|------|
| **正式网站** | https://heyxier.github.io/yolongtec-website-demo/ |
| GitHub 仓库 | https://github.com/Heyxier/yolongtec-website-demo |
| 构建记录 | https://github.com/Heyxier/yolongtec-website-demo/actions |

---

**文档版本：** V1.0
**最后更新：** 2026-05-01
**维护人员：** 灰色（AI 助手）