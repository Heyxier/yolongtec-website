# Yolongtec V7.3 TODO

**版本**: V7.3  
**核心目标**: 打通 Jekyll 全链路，让 Markdown 产品文件自动呈现在前端页面  
**版本基础**: V7.2 (Jekyll 集成基础)

---

## 阶段一：结构搭建

- [ ] 新建 `_layouts/category.html` — 分类产品列表模板
- [ ] 清理 `content/products/index.html` — 从集合目录移除（与 `products/index.html` 路径冲突）
- [ ] 改造 `products/index.html` — 加上 frontmatter，从 `_data/categories.yml` 动态渲染分类网格
- [ ] 改造 `products/drill/index.html` — → Jekyll Page，frontmatter + category layout
- [ ] 改造 `products/fastening/index.html` — 同上
- [ ] 改造 `products/grinder-cutter/index.html` — 同上
- [ ] 改造 `products/hammer/index.html` — 同上
- [ ] 改造 `products/saw/index.html` — 同上
- [ ] 改造 `products/sander-polisher/index.html` — 同上
- [ ] 改造 `products/cleanning/index.html` — 同上
- [ ] 改造 `products/lighting/index.html` — 同上

## 阶段二：文档同步

- [ ] 更新 `SPEC.md` — 版本号 V7.2 → V7.3，补充新结构描述
- [ ] 更新 `CHANGELOG.md` — 添加 V7.3 变更记录
- [ ] 更新 `README.md` — 反映 V7.3 架构
- [ ] 更新 `OPERATIONS.md` — 内容管理流程调整（如有需要）

## 阶段三：验证

- [ ] 验证 GitHub Actions 构建通过
- [ ] 验证 `products/` 分类网格动态渲染
- [ ] 验证各分类页面产品列表正确
- [ ] 验证产品详情页可正常访问
- [ ] 验证导航链接正确

---

**最后更新**: 2026-05-02  
**状态**: 初始化
