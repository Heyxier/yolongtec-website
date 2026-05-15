# YolongCMS — 多网站统一管理后台架构文档

> 版本: v1 (草案)
> 最后更新: 2026-05-08
> 定位: 一套后台管理多个独立 Jekyll/GitHub Pages 企业官网

---

## 一、核心理念

**不是为每个网站单独搭后台，而是一个后台管所有网站。**

```
┌──────────────────────────────────────────────────────────────────┐
│                    YolongCMS 统一管理后台                         │
│                                                                  │
│  登录后看到所有站点 → 选择站点 → 管理该站点的全部内容            │
│                                                                  │
│  ┌─ 亚隆官网 (yolongtec)     ─ 内容 / 图片 / 留言 / 发布        │
│  ├─ XX公司官网 (brand-x)     ─ 内容 / 图片 / 留言 / 发布        │
│  ├─ XX品牌站 (brand-y)       ─ 内容 / 图片 / 留言 / 发布        │
│  └─ ...随时添加新站点                                            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 二、多站点架构

```
┌──────────────────────────────────────────────────────────────┐
│                    阿里云服务器 (YolongCMS)                    │
│                                                              │
│  FastAPI 应用                                                │
│  ├── 认证模块                                                │
│  ├── 站点管理 (CRUD)          ← 新增：管理多站点的入口        │
│  ├── 站点选择器               ← 当前管理哪个站点              │
│  ├── 产品管理 (通用)           ← 作用在当前选中的站点         │
│  ├── 文章管理 (通用)                                          │
│  ├── 分类管理 (通用)                                          │
│  ├── 图片管理 (通用)                                          │
│  ├── 客户留言 (通用)                                          │
│  └── Git 发布模块                                             │
│                                                              │
│  数据库 (SQLite)                                              │
│  ├── sites 表                  ← 站点注册信息                 │
│  ├── messages 表               ← 所有站点的留言 (site_id)     │
│  └── sessions 表               ← 登录会话                    │
│                                                              │
│  站点仓库目录:                                                │
│  /var/sites/                                                 │
│  ├── yolongtec/               ← git clone 亚隆官网           │
│  │   ├── _products/*.md                                     │
│  │   ├── _articles/*.md                                     │
│  │   ├── _data/categories.yml                               │
│  │   └── images/                                             │
│  ├── brand-x/                 ← git clone 品牌X官网          │
│  │   └── ...                                                 │
│  └── brand-y/                                                 │
│      └── ...                                                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 三、为什么需要后端服务器（不在 GitHub）

| 能力 | GitHub Pages | GitHub Actions | 自有服务器 |
|------|-------------|---------------|-----------|
| 运行后端进程 | ❌ | ❌ (6h 限制) | ✅ |
| 持久化数据库 | ❌ | ❌ | ✅ |
| 实时读写文件 | ❌ (需 commit) | ❌ | ✅ |
| 图片上传实时可用 | ❌ | ❌ | ✅ |
| 多个站点的文件管理 | ❌ | ❌ | ✅ |
| **结论** | 只适合前端展示 | 只适合 CI/CD | **✅ 唯一可行的后端位置** |

---

## 四、域名字段设计（多站点访问方式）

每个站点可以有三种访问方式：

```
方式 A: 后台子路径访问 (默认)
  https://<CMS服务器>/sites/yolongtec/admin/
  https://<CMS服务器>/sites/brand-x/admin/

方式 B: 独立域名反向代理 (可选)
  https://yolong.your-server.com/  → 指向 /var/sites/yolongtec/_site/
  https://brandx.your-server.com/  → 指向 /var/sites/brand-x/_site/

方式 C: GitHub Pages + 后端独立 (推荐初始阶段)
  前端: https://heyxier.github.io/yolongtec-website-demo/
  后台: https://<CMS服务器>/admin/ (登录后选站点)
```

**初始阶段建议方式 C**——前台展示继续走 GitHub Pages，后台管理在自建服务器上。

---

## 五、技术选型（更新）

| 层 | 技术 | 理由 |
|---|------|------|
| 框架 | Python FastAPI | 轻量、自动文档、async |
| 数据库 | SQLite | 单用户后台，够用 |
| 模板 | Jinja2 | 服务器端渲染，无需前端构建 |
| 认证 | Session + 密码 | 简单安全 |
| Git | GitPython | 纯 Python 操作 Git |
| 进程管理 | systemd | 开机自启 + 自动重启 |
| 反向代理 | Nginx (可选) | HTTPS 终结 + 域名转发 |

**多站点特殊依赖：**

| 依赖 | 用途 |
|------|------|
| PyYAML | 读写 `_data/categories.yml` |
| frontmatter | 读写 Jekyll Markdown Frontmatter |
| Markdown | 渲染产品/文章内容 |

---

## 六、数据库设计

### 6.1 sites 表

```sql
CREATE TABLE sites (
    id              TEXT PRIMARY KEY,           -- 站点唯一标识 (如 'yolongtec')
    name            TEXT NOT NULL,              -- 显示名 (如 '亚隆电动工具')
    repo_url        TEXT NOT NULL,              -- GitHub 仓库地址
    repo_branch     TEXT NOT NULL DEFAULT 'main',
    local_path      TEXT NOT NULL,              -- 服务器上克隆路径
    base_url        TEXT DEFAULT '',            -- site.baseurl (如 '/yolongtec-website-demo')
    domain          TEXT DEFAULT '',            -- 可选独立域名
    contact_email   TEXT DEFAULT '',            -- 客户留言转发邮箱
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_published  DATETIME,                   -- 最近一次发布时间
    is_active       BOOLEAN DEFAULT 1
);
```

### 6.2 messages 表

```sql
CREATE TABLE messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id     TEXT NOT NULL REFERENCES sites(id),  -- 所属站点
    name        TEXT NOT NULL,
    company     TEXT,
    email       TEXT NOT NULL,
    phone       TEXT,
    message     TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    read        BOOLEAN DEFAULT 0
);
```

### 6.3 sessions 表

```sql
CREATE TABLE sessions (
    id          TEXT PRIMARY KEY,               -- session token
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at  DATETIME
);
```

---

## 七、API 路由设计

### 7.1 认证

```
GET    /admin/login             → 登录页面
POST   /admin/login             → 提交登录
POST   /admin/logout            → 登出
```

### 7.2 站点管理

```
GET    /admin/sites             → 站点列表 (仪表盘主页)
GET    /admin/sites/new         → 新增站点表单
POST   /admin/sites             → 创建站点:
                                  1. 写入 sites 表
                                  2. git clone repo 到 local_path
                                  3. 初始化站点目录
GET    /admin/sites/{id}        → 站点详情 / 编辑表单
PUT    /admin/sites/{id}        → 更新站点配置
DELETE /admin/sites/{id}        → 删除站点 (需确认)
POST   /admin/sites/{id}/sync  → 重新拉取最新代码 (git pull)
```

### 7.3 站点选择器

```
GET    /admin/switch/{id}       → 切换到指定站点 (session 中记录当前站点)
                                → 之后所有内容管理操作均作用于此站点
```

### 7.4 产品管理（作用于当前选中站点）

```
GET    /admin/products                   → 产品列表
GET    /admin/products/new               → 新增产品表单
POST   /admin/products                   → 创建产品
GET    /admin/products/{slug}            → 编辑产品表单
PUT    /admin/products/{slug}            → 更新产品
DELETE /admin/products/{slug}            → 删除产品
```

### 7.5 文章管理（作用于当前选中站点）

```
GET    /admin/articles                   → 文章列表
GET    /admin/articles/new               → 新增文章表单
POST   /admin/articles                   → 创建文章
GET    /admin/articles/{slug}            → 编辑文章表单
PUT    /admin/articles/{slug}            → 更新文章
DELETE /admin/articles/{slug}            → 删除文章
```

### 7.6 分类管理（作用于当前选中站点）

```
GET    /admin/categories                 → 分类列表
POST   /admin/categories                 → 新增分类
PUT    /admin/categories/{key}           → 修改分类
DELETE /admin/categories/{key}           → 删除分类
```

### 7.7 图片管理（作用于当前选中站点）

```
GET    /admin/images                     → 图片浏览 (按目录分组)
POST   /admin/images/upload              → 上传图片
DELETE /admin/images                     → 删除图片 (传路径)
```

### 7.8 客户留言

```
POST   /api/contact/{site_id}            → 公开 API，接收前端表单提交

GET    /admin/messages                   → 当前站点的留言列表
GET    /admin/messages/{id}              → 留言详情
DELETE /admin/messages/{id}              → 删除留言
```

### 7.9 发布（作用于当前选中站点）

```
POST   /admin/publish                    → git add → commit → push
GET    /admin/publish/status             → 查看发布状态
```

---

## 八、项目目录结构

```
yolongcms/                              # 后端项目根目录
├── app/
│   ├── __init__.py
│   ├── main.py                         # FastAPI 入口
│   ├── config.py                       # 全局配置
│   ├── database.py                     # SQLite 初始化
│   │
│   ├── routers/
│   │   ├── auth.py                     # 登录认证
│   │   ├── sites.py                    # 站点 CRUD
│   │   ├── products.py                 # 产品 CRUD
│   │   ├── articles.py                 # 文章 CRUD
│   │   ├── categories.py              # 分类 CRUD
│   │   ├── images.py                   # 图片管理
│   │   ├── messages.py                 # 客户留言
│   │   └── publish.py                  # Git 发布
│   │
│   ├── services/
│   │   ├── site_manager.py             # 站点生命周期 (clone/init/sync)
│   │   ├── md_handler.py               # Markdown 文件读写 (支持多站点路径)
│   │   ├── yml_handler.py              # YAML 文件读写
│   │   └── git_service.py              # Git 操作封装
│   │
│   ├── models/
│   │   ├── site.py                     # Site Pydantic model
│   │   ├── product.py                  # Product Pydantic model
│   │   ├── article.py                  # Article Pydantic model
│   │   ├── category.py                 # Category Pydantic model
│   │   └── message.py                  # Message Pydantic model
│   │
│   ├── templates/
│   │   ├── base.html                   # 后台公共布局 (含站点选择器)
│   │   ├── login.html
│   │   ├── dashboard.html              # 站点列表 (所有站点概览)
│   │   ├── sites/
│   │   │   ├── form.html               # 新增/编辑站点
│   │   │   └── detail.html             # 站点详情 (域名/仓库/发布状态)
│   │   ├── products/
│   │   │   ├── list.html
│   │   │   └── form.html
│   │   ├── articles/
│   │   │   ├── list.html
│   │   │   └── form.html
│   │   ├── categories/
│   │   │   └── list.html
│   │   ├── images/
│   │   │   └── gallery.html
│   │   ├── messages/
│   │   │   └── list.html
│   │   └── publish.html
│   │
│   └── static/
│       └── admin.css / admin.js
│
├── sites/                              # 所有站点的 Git 仓库 (git clone)
│   ├── yolongtec/                      # 站点 A
│   ├── brand-x/                        # 站点 B
│   └── ...
│
├── data/
│   └── yolongcms.db                    # SQLite 数据库
│
├── .env                                # 环境变量
├── requirements.txt
├── CHANGELOG.md
└── README.md
```

---

## 九、关键设计决策

### 9.1 站点如何注册到系统？

```
管理员操作:
1. 后台点击"新增站点"
2. 填写:
   - 站点标识 (如 yolongtec)
   - 站点显示名 (如 亚隆电动工具)
   - GitHub 仓库地址
   - 分支名 (默认 main)
   - site.baseurl (如 /yolongtec-website-demo)
   - 联系邮箱 (可选，客户留言通知)
3. 系统自动:
   - 写入 sites 表
   - git clone 仓库到 /var/sites/{id}/
   - 初始化站点目录
4. 完成 → 该站点出现在仪表盘列表
```

### 9.2 站点间如何隔离？

| 维度 | 隔离方式 |
|------|---------|
| 文件 | 每个站点的 Git 仓库在独立目录 `/sites/{id}/` |
| 数据 | messages 表通过 `site_id` 字段区分 |
| 图片 | 存放在对应站点的 `images/` 目录下 |
| 配置 | 站点信息在 `sites` 表中独立记录 |
| API | Contact API 路径含 `{site_id}` 参数 |

### 9.3 如何切换当前管理的站点？

```
1. 进入后台首页 → 看到所有站点卡片
2. 点击目标站点 → 进入该站点的内容管理
3. 顶部导航栏显示当前站点名 + 下拉切换器
4. 所有内容操作 (产品/文章/图片/留言/发布) 均作用于当前站点
```

### 9.4 新增网站需要什么条件才能接入？

一个 Jekyll 网站要接入 YolongCMS，需要满足：

- 项目结构含有 `_products/`、`_articles/`、`_data/categories.yml`、`images/` 目录
- 使用 GitHub Pages + GitHub Actions 部署
- 项目根目录下有 `contact/index.html`（含 contact 表单）
- 表单使用固定 HTML class `.contact-form`（或可配置选择器）
- 表单字段包含 name, email, message

**如果不完全匹配，可以通过站点配置中的"页面模板"字段进行适配——后期可扩展为模板化配置。**

---

## 十、安全设计

| 维度 | 措施 |
|------|------|
| 传输 | HTTPS 全站加密 |
| 认证 | Session 密码登录，密码存环境变量 |
| 授权 | 所有管理路由需登录守卫 |
| 跨站 | API 端 CORS 限制（仅允许配置的域名）|
| 频率 | Contact API 每个 IP 每小时限 N 次 |
| 文件 | 上传校验类型 + 限制 5MB |
| Git | 使用专用 Deploy Key，最小权限 |
| 防火墙 | 管理后台可限制 IP 白名单 |

---

## 十一、开发规划

### Phase 1：基础框架（1 天）

- FastAPI 项目骨架搭建
- SQLite 初始化 + 建表
- 认证系统 (Session 登录/登出)
- 站点管理 CRUD (新增/编辑/删除站点)
- 站点选择器 (切换当前站点)
- 部署到阿里云服务器 (systemd + Nginx)

### Phase 2：内容管理核心（2 天）

- 产品 CRUD (Markdown 文件操作)
- 文章 CRUD
- 分类管理 (YAML 文件操作)
- 图片管理 (上传/浏览/删除)
- 所有模块均适配多站点路径

### Phase 3：客户留言 + 发布（1 天）

- Contact API (/api/contact/{site_id})
- 留言列表后台查看
- Git 发布模块 (commit + push)
- Contact 页面表单改造 (POST 到后端 API)

### Phase 4：完善 + 文档（0.5 天）

- 后台 UI 打磨
- 使用文档
- 接入第二个站点的验证测试
- .env 模板 + 部署脚本

---

## 十二、已知局限与未来扩展

### 当前局限

| 局限 | 说明 |
|------|------|
| 仅支持 Jekyll 站点 | 当前按 Jekyll Collection 结构设计 |
| 仅支持 GitHub | Git 发布模块目前只兼容 GitHub 远程 |
| 单管理员 | 尚无多用户/权限分级 |
| 站点模板固定 | 站点内容模型 (products/articles/categories) 暂不可自定义 |

### 未来可扩展方向

| 方向 | 说明 |
|------|------|
| 多用户 + 角色权限 | 每个站点可分配不同管理员 |
| 自定义内容模型 | 不同类型的站点可定义不同的内容字段 |
| 支持更多生成器 | 除了 Jekyll，支持 Hugo/Next.js 等 |
| 支持更多 Git 平台 | Gitee/GitLab |
| 站点克隆模板 | 新站点可从已有站点模板快速创建 |
| 媒体 CDN | 集成阿里云 OSS 等 CDN 加速图片访问 |
| 数据看板 | 站点访问统计、留言趋势等 |
