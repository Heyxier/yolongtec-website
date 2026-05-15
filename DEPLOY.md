# Yolongtec V7.2 部署指南

---

## 一、创建 GitHub 仓库

### 1.1 创建新仓库

1. 登录 GitHub，点击右上角 **+** → **New repository**
2. 填写仓库信息：
   - **Repository name**: `yolongtec`（或你喜欢的名字）
   - **Visibility**: Private（推荐，防止内容被随意修改）
   - **Initialize**: 不勾选任何选项
3. 点击 **Create repository**

### 1.2 上传代码

```bash
cd yolongtec-v7.2

git init
git add .
git commit -m "Initial commit: Yolongtec V7.2 with Decap CMS"
git branch -M main
git remote add origin https://github.com/你的用户名/yolongtec.git
git push -u origin main
```

---

## 二、配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. 配置 Source：
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` 分支，`/ (root)` 路径
3. 点击 **Save**
4. 等待 1-2 分钟，网站将上线至：`https://你的用户名.github.io/yolongtec/`

---

## 三、配置 Decap CMS OAuth 认证

### 3.1 创建 GitHub OAuth App

1. 进入 GitHub **Settings** → **Developer settings** → **OAuth Apps**
2. 点击 **New OAuth App**
3. 填写信息：
   - **Application name**: Yolongtec CMS
   - **Homepage URL**: `https://你的用户名.github.io/yolongtec/`
   - **Authorization callback URL**: 
     - 如果使用 GitHub Pages，则填：`https://你的用户名.github.io/yolongtec/admin/index.html`
     - 或者使用 Netlify Identity（更简单）
4. 点击 **Register application**
5. 生成 **Client ID** 和 **Client Secret**

### 3.2 配置 Decap CMS

编辑 `_config.yml`：
```yaml
backend:
  name: github
  repo: your-username/yolongtec
  branch: main
  # 如果使用 Netlify Identity，可以这样配置：
  # name: git-gateway
  # branch: main
```

---

## 四、测试完整流程

### 4.1 访问 CMS

1. 打开：`https://你的用户名.github.io/yolongtec/admin/`
2. 点击 "Login with GitHub"
3. 授权后进入 CMS 管理界面

### 4.2 测试产品发布

1. 点击 "产品" → "添加产品"
2. 填写表单（型号、名称、分类等）
3. 点击 "保存"
4. 检查 GitHub 仓库是否有新的 Markdown 文件

### 4.3 验证自动构建

1. 进入仓库 **Actions** 页面
2. 应该看到一个新的 workflow run
3. 等待构建完成（约 1-3 分钟）
4. 访问网站验证更新

---

## 五、使用图床（如需）

如果图片较多，建议使用图床服务：

### 方案一：Cloudflare R2（推荐）
- 10GB 存储免费
- 配置简单

### 方案二：Imgur
- 免费
- 无需配置

### 方案三：GitHub LFS
- 免费额度 1GB
- 在 `_config.yml` 中配置：
```yaml
media_folder: "images"
public_folder: "/images"
```

---

## 六、故障排除

### 构建失败

检查 `.github/workflows/build.yml` 是否正确，查看 Actions 日志定位问题。

### CMS 登录失败

1. 确认 OAuth App 的 Callback URL 正确
2. 确认仓库是 public 或已授权用户访问
3. 尝试清除浏览器缓存后重新登录

### 图片上传失败

1. 检查 Git LFS 配额
2. 检查图片大小是否超过限制（通常 5MB）
3. 尝试使用图床

---

## 七、日常维护

### 内容更新
1. 直接在 CMS 界面编辑
2. 保存后自动构建部署

### 代码更新
1. 本地修改代码
2. `git add .` → `git commit` → `git push`

### 监控
- 定期查看 GitHub Actions 日志
- 监控网站可用性

---

**最后更新**: 2026-04-30