# Tribal Wall - PRD 与开发计划

## 项目概述

**Tribal Wall** 是一个为 Tribal Coworking Space 设计的数字游民信息展示墙，解决传统物理信息墙的两个核心问题：

1. **查看不便** - 大家更习惯用手机看信息
2. **过期问题** - 信息放满了可能人也不在了

## 产品需求文档 (PRD)

### 核心功能

| 功能模块 | 描述 | 优先级 |
|---------|------|--------|
| 信息展示墙 | 卡片式展示活跃用户的 name、contact、about | P0 |
| 添加个人信息 | 简单表单录入，无需注册登录 | P0 |
| 📱 扫码添加 | 扫描二维码直接跳转添加页面 | P0 |
| 7 天自动归档 | 信息发布 7 天后自动移至归档区 | P0 |
| 手动续期 | 用户可点击续期按钮重置 7 天倒计时 | P0 |
| 归档区查看 | 单独页面展示已归档的历史信息 | P1 |
| 搜索筛选 | 按名字或技能关键词搜索 | P1 |
| 管理员功能 | 删除不当内容、手动归档 | P2 |

### 用户流程

```
                    ┌─────────────┐
                    │  扫描二维码  │ ◀── 物理空间的二维码海报
                    └──────┬──────┘
                           │
                           ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   访问首页   │────▶│  查看信息墙  │────▶│  搜索/筛选   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  添加信息    │     │  点击续期    │
└─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│ 7天后自动归档│     │ 重置7天倒计时│
└─────────────┘     └─────────────┘
```

### 扫码添加功能

**场景说明**：在 Tribal 物理空间放置二维码海报，用户扫码后直接跳转到添加信息页面。

**实现方案**：

1. **入口二维码** - 指向 `/add` 页面的静态二维码
   - 可打印成海报放置在前台、办公区等位置
   - 扫码后直接打开添加表单页面

2. **二维码生成** - 管理后台可生成/下载入口二维码
   - 支持下载 PNG/SVG 格式
   - 可自定义尺寸（适配不同海报大小）
   - 带 Tribal 品牌元素的美化二维码

### 数据模型

```typescript
interface Profile {
  id: string;           // UUID
  name: string;         // 名字
  contact: string;      // 联系方式（手机/IG/Telegram等）
  about: string;        // 自我介绍/技能
  createdAt: number;    // 创建时间戳
  expiresAt: number;    // 过期时间戳（创建时间 + 7天）
  isArchived: boolean;  // 是否已归档
}
```

### 页面设计

1. **首页 (/)** - 信息墙
   - 顶部：Tribal Logo + 搜索框 + 添加按钮
   - 主体：卡片网格展示活跃用户
   - 卡片信息：名字、联系方式、简介、剩余天数、续期按钮

2. **添加页 (/add)** - 扫码入口页面 🆕
   - 简洁的添加表单（name、contact、about）
   - 移动端优化的大输入框和按钮
   - 提交成功后跳转到首页查看自己的卡片
   - 显示 "Your card will be visible for 7 days" 提示

3. **归档页 (/archive)** - 历史记录
   - 展示已过期的用户信息
   - 可搜索查看

4. **管理页 (/admin)** - 简单管理后台
   - 密码保护
   - 列表展示所有信息
   - 删除/归档操作
   - 🆕 生成/下载入口二维码

---

## 技术方案

### 技术栈选型

```
┌─────────────────────────────────────────────────┐
│              Cloudflare Pages                   │
│        (Hono + JSX 全栈框架，SSR渲染)            │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              Cloudflare D1                      │
│             (SQLite 边缘数据库)                  │
└─────────────────────────────────────────────────┘
```

**为什么选择 Hono + JSX：**
- 原生支持 Cloudflare Workers/Pages
- 轻量级，一个项目搞定前后端
- JSX 语法熟悉，开发效率高
- 边缘渲染，性能极佳

### 项目结构

```
tribal-wall/
├── src/
│   ├── index.tsx          # 入口 + 路由定义
│   ├── db/
│   │   └── schema.ts      # D1 数据库 schema
│   ├── components/
│   │   ├── Layout.tsx     # 页面布局
│   │   ├── ProfileCard.tsx # 用户卡片
│   │   ├── AddForm.tsx    # 添加表单组件
│   │   ├── SearchBar.tsx  # 搜索栏
│   │   └── QRCode.tsx     # 二维码组件 🆕
│   ├── pages/
│   │   ├── Home.tsx       # 首页
│   │   ├── Add.tsx        # 添加页（扫码入口）🆕
│   │   ├── Archive.tsx    # 归档页
│   │   └── Admin.tsx      # 管理页
│   ├── api/
│   │   └── profiles.ts    # API 路由
│   └── styles/
│       └── global.css     # 全局样式 (Tailwind)
├── public/
│   └── assets/            # 静态资源
├── wrangler.toml          # Cloudflare 配置
├── package.json
└── tsconfig.json
```

### 数据库 Schema (D1)

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT,
  about TEXT,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  is_archived INTEGER DEFAULT 0
);

CREATE INDEX idx_expires_at ON profiles(expires_at);
CREATE INDEX idx_is_archived ON profiles(is_archived);
```

### API 设计

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/profiles | 获取活跃用户列表 |
| GET | /api/profiles/archived | 获取归档用户列表 |
| POST | /api/profiles | 添加新用户 |
| PUT | /api/profiles/:id/renew | 续期（重置7天） |
| DELETE | /api/profiles/:id | 删除用户（管理员） |
| POST | /api/profiles/:id/archive | 手动归档（管理员） |
| GET | /api/qrcode | 🆕 生成入口二维码（PNG/SVG） |

### 自动归档机制

**方案：Cloudflare Cron Triggers**

```typescript
// 每小时执行一次，检查过期用户并归档
export default {
  async scheduled(event, env, ctx) {
    const now = Date.now();
    await env.DB.prepare(
      'UPDATE profiles SET is_archived = 1 WHERE expires_at < ? AND is_archived = 0'
    ).bind(now).run();
  }
}
```

---

## 设计规范

### 品牌一致性

基于 [BrandWorks 为 Tribal 设计的品牌标识](https://www.brandworks.co/tribal)：

| 元素 | 规范 |
|------|------|
| 主色 | 放松绿色 `#2D5A3D` (成长与社区) |
| 强调色 | 活力黄色 `#F5C842` (归属感) |
| 视觉元素 | 涂鸦/Scribble 线条装饰 |
| 调性 | 温暖、包容、家的感觉 |
| 字体 | 手写风格标题 + 清晰正文 |

### 移动优先

- 卡片单列布局（移动端）→ 多列网格（桌面端）
- 大触摸目标（按钮 ≥ 44px）
- 底部固定添加按钮

---

## 开发计划

### Phase 1: 基础搭建 (Day 1)
- [ ] 初始化 Hono + Cloudflare Pages 项目
- [ ] 配置 Tailwind CSS v4
- [ ] 创建 D1 数据库和 Schema
- [ ] 导入初始数据

### Phase 2: 核心功能 (Day 2)
- [ ] 实现首页信息墙展示
- [ ] 实现添加页面 `/add`（扫码入口）🆕
- [ ] 实现续期功能
- [ ] 实现搜索筛选

### Phase 3: 归档与管理 (Day 3)
- [ ] 实现归档页面
- [ ] 配置 Cron Trigger 自动归档
- [ ] 实现简单管理后台
- [ ] 实现二维码生成与下载功能 🆕

### Phase 4: 设计与优化 (Day 4)
- [ ] 应用 Tribal 品牌设计
- [ ] 添加动画效果
- [ ] 移动端优化
- [ ] 性能优化

### Phase 5: 部署上线 (Day 5)
- [ ] Cloudflare Pages 部署
- [ ] 绑定域名
- [ ] 测试验收

---

## 待确认问题

1. **域名**：是否有现成域名？还是使用 Cloudflare 提供的子域名？
2. **管理员密码**：管理后台的访问密码如何设置？
3. **数据迁移**：初始 OCR 数据是否需要人工校对后再导入？
4. **续期机制**：续期是否需要任何验证（如输入联系方式确认）？

---

## 参考资料

- [Tribal Bali Brand Identity - BrandWorks](https://www.brandworks.co/tribal)
- [Hono Documentation](https://hono.dev)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
