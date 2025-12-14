# 🌐 BigDataView - 大数据全景解析交互报告

一个基于现代 Web 技术构建的大数据主题交互式研究报告网页，通过精美的可视化和流畅的交互体验，深入剖析大数据的技术原理、行业应用与社会影响。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)

## ✨ 功能特性

### 🎨 视觉效果
- **玻璃拟态设计 (Glassmorphism)** - 现代化的毛玻璃 UI 风格
- **粒子背景动画** - 动态交互式粒子效果
- **深色/浅色主题切换** - 支持一键切换，自动保存偏好
- **流畅过渡动画** - 精心设计的 CSS 动画与过渡效果

### 📊 交互式图表
- **4V特征雷达图** - 悬停卡片高亮对应维度
- **技能需求热度图** - 横向柱状图展示未来技能趋势
- **影响对比图表** - 正面/负面影响可视化对比
- **示例交互图表** - 支持缩放、平移、数据切换、导出 PNG

### 📱 响应式设计
- 完美适配桌面端、平板和移动设备
- 移动端专属侧边导航菜单
- 触控友好的交互体验

### ♿ 无障碍支持
- 键盘导航支持
- ARIA 标签完善
- 跳转链接 (Skip Link)
- 屏幕阅读器友好

## 📁 项目结构

```
project_04/
├── index.html          # 主 HTML 文件
├── css/
│   └── styles.css      # 自定义 CSS 样式
├── js/
│   └── main.js         # JavaScript 逻辑代码
└── README.md           # 项目说明文档
```

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 语义化页面结构 |
| **TailwindCSS** | 原子化 CSS 框架（CDN） |
| **Chart.js** | 数据可视化图表库 |
| **chartjs-plugin-zoom** | 图表缩放/平移插件 |
| **原生 JavaScript** | 交互逻辑实现 |
| **CSS3** | 自定义动画与玻璃拟态效果 |

## 🚀 快速开始

### 直接打开
由于项目使用 CDN 引入依赖，无需安装任何包，直接用浏览器打开即可：

```bash
# 方式一：直接双击打开
index.html

# 方式二：使用 VS Code Live Server 插件
# 右键 index.html -> Open with Live Server
```

### 本地服务器（可选）
如果需要本地服务器环境：

```bash
# 使用 Python
python -m http.server 8080

# 使用 Node.js
npx serve .

# 然后访问 http://localhost:8080
```

## 📖 内容模块

1. **首页 (Hero)** - 打字机效果展示核心主题
2. **4V特征** - 大数据四大特征的交互式雷达图
3. **数据生命周期** - 从采集到分析的完整流程展示
4. **技术演进** - 三波浪潮的时间线切换
5. **行业应用** - 金融、零售、医疗、娱乐四大领域
6. **示例图表** - 可缩放、切换数据集的交互演示
7. **影响与挑战** - 效率与隐私的双刃剑分析
8. **未来能力图谱** - T型人才结构与职业成长路径

## 🎯 主要交互功能

| 功能 | 描述 |
|------|------|
| `toggleTheme()` | 切换深色/浅色主题 |
| `setLifecycleStep(index)` | 切换数据生命周期阶段 |
| `updateTimeline(index)` | 切换技术演进时期 |
| `highlightChart(key)` | 高亮雷达图特定维度 |
| `toggleImpact(type)` | 切换正面/负面影响展示 |
| `toggleMobileMenu()` | 移动端菜单开关 |

## 🌙 主题系统

项目支持深色/浅色主题自动切换，通过 CSS 变量实现：

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
}

.dark {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
}
```

## 📝 开发说明

### 添加新图表
```javascript
// 在 main.js 中使用 Chart.js 创建图表
new Chart(ctx, {
    type: 'bar', // 或 'radar', 'line' 等
    data: { /* 数据配置 */ },
    options: { /* 选项配置 */ }
});
```

### 自定义样式
在 `css/styles.css` 中添加自定义样式，或使用 TailwindCSS 的工具类。

## 📄 许可证

本项目仅供教育学习目的使用。

---

<p align="center">
  <strong>BigDataView</strong> - 用数据讲述未来的故事 📊
</p>
