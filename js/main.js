// === 1. Particle System (Neural Network Style) ===
const initParticles = () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if(this.x < 0 || this.x > width) this.vx *= -1;
            if(this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(14, 165, 233, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fill();
        }
    }

    const init = () => {
        particles = [];
        const count = window.innerWidth < 768 ? 40 : 80;
        for(let i=0; i<count; i++) particles.push(new Particle());
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.classList.contains('dark');
        
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            // Connect
            for(let j=i+1; j<particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = isDark 
                        ? `rgba(56, 189, 248, ${0.15 * (1 - dist/120)})` 
                        : `rgba(14, 165, 233, ${0.15 * (1 - dist/120)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); animate();
};

// === 2. Charts Config ===
let charts = {};
const getColors = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        text: isDark ? '#94a3b8' : '#64748b',
        grid: isDark ? '#334155' : '#e2e8f0',
        brand: '#0ea5e9'
    };
};

const initCharts = () => {
    const colors = getColors();
    Chart.defaults.font.family = "'Noto Sans SC', sans-serif";
    Chart.defaults.color = colors.text;

    // 1. Radar Chart (Characteristics)
    const ctx1 = document.getElementById('characteristicsChart').getContext('2d');
    charts.radar = new Chart(ctx1, {
        type: 'radar',
        data: {
            labels: ['Volume (量)', 'Variety (多)', 'Velocity (快)', 'Value (值)', 'Veracity (真)'],
            datasets: [{
                label: '大数据特征',
                data: [95, 90, 95, 20, 60],
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderColor: '#0ea5e9',
                pointBackgroundColor: '#0ea5e9',
                borderWidth: 2
            }, {
                label: '传统数据',
                data: [30, 20, 20, 80, 95],
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                borderColor: '#94a3b8',
                pointBackgroundColor: '#94a3b8',
                borderWidth: 2,
                borderDash: [5, 5]
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: { color: colors.grid },
                    angleLines: { color: colors.grid },
                    pointLabels: { color: colors.text, font: {size: 12} },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // 2. Impact Bar Chart
    const ctx2 = document.getElementById('impactChart').getContext('2d');
    charts.impact = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['决策效率', '资源优化', '隐私风险', '信息茧房'],
            datasets: [{
                label: '影响指数',
                data: [85, 80, 20, 15],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)', // Green
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(203, 213, 225, 0.5)', // Gray
                    'rgba(203, 213, 225, 0.5)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: { display: false, max: 100 },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });

    // 3. Skills Chart (Horizontal Bar)
    const ctx3 = document.getElementById('skillsChart').getContext('2d');
    charts.skills = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['数据分析(Python/SQL)', '机器学习原理', '业务理解能力', '数据可视化', '数据伦理'],
            datasets: [{
                data: [90, 75, 95, 80, 70],
                backgroundColor: (ctx) => {
                    const val = ctx.raw;
                    const alpha = val > 90 ? 0.9 : 0.6;
                    return `rgba(56, 189, 248, ${alpha})`;
                },
                borderRadius: 4,
                barThickness: 20
            }]
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            scales: {
                x: { display: false, max: 100 },
                y: { 
                    grid: { display: false },
                    ticks: { color: '#e2e8f0' }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
};

// === 3. Interactive Data Logic ===

// --- Lifecycle Data ---
const lifecycleData = [
    {
        title: "1. 数据采集 (Acquisition)",
        desc: "大数据的源头。除了传统的数据库记录，主要来源变为传感器信号（IoT）、网络日志、用户点击流、摄像头视频等。数据呈现出多源异构的特点。",
        challenge: "高并发写入、协议多样性",
        tech: "Flume, Kafka, Logstash",
        example: "智能手环每秒上传心率数据；电商APP记录每一次滑动。"
    },
    {
        title: "2. 存储管理 (Storage)",
        desc: "传统单机数据库无法容纳PB级数据。分布式文件系统（HDFS）和NoSQL数据库应运而生，采用'分而治之'的思想，将数据切片存储在成千上万台廉价服务器上。",
        challenge: "扩展性、容错性、一致性(CAP)",
        tech: "HDFS, HBase, Cassandra, S3",
        example: "Facebook存储几十亿用户的照片和社交关系图谱。"
    },
    {
        title: "3. 计算处理 (Computing)",
        desc: "分为离线计算（T+1，跑批处理）和实时计算（秒级，流处理）。计算引擎负责调度资源，并行处理海量数据。",
        challenge: "计算资源调度、低延迟",
        tech: "MapReduce, Spark, Flink",
        example: "每晚计算全平台昨日销售额（离线）；实时监控双11交易大屏（实时）。"
    },
    {
        title: "4. 分析挖掘 (Analysis)",
        desc: "数据的终点是价值。通过统计分析、机器学习算法，从数据中发现规律、预测未来，并以可视化报表呈现。",
        challenge: "算法准确度、可解释性",
        tech: "Python, TensorFlow, Tableau",
        example: "Netflix猜你喜欢什么电影；银行预测这笔交易是否为盗刷。"
    }
];

function setLifecycleStep(index) {
    // Update Buttons
    document.querySelectorAll('.lifecycle-step').forEach((btn, i) => {
        if(i === index) {
            btn.classList.add('border-brand-500', 'bg-brand-50', 'dark:bg-brand-900/30', 'scale-105', 'shadow-lg');
            btn.classList.remove('border-transparent', 'hover:bg-black/5', 'dark:hover:bg-white/5');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('border-brand-500', 'bg-brand-50', 'dark:bg-brand-900/30', 'scale-105', 'shadow-lg');
            btn.classList.add('border-transparent', 'hover:bg-black/5', 'dark:hover:bg-white/5');
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    // Update Content with smooth fade
    const d = lifecycleData[index];
    const container = document.getElementById('lifecycle-display');
    
    // Apply transition style if not already there
    if (!container.style.transition) {
        container.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
    }
    
    // Fade out and slide up
    container.style.opacity = 0;
    container.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        document.getElementById('ls-title').innerText = d.title;
        document.getElementById('ls-desc').innerText = d.desc;
        document.getElementById('ls-challenge').innerText = d.challenge;
        document.getElementById('ls-tech').innerText = d.tech;
        document.getElementById('ls-example').innerText = d.example;
        
        // Fade in and slide down
        container.style.opacity = 1;
        container.style.transform = 'translateY(0)';
    }, 150);
}

// --- Timeline Data ---
const historyData = [
    {
        title: "Wave 1: 基础设施构建期 (2003-2010)",
        desc: "这一阶段标志着大数据技术的诞生。Google发表了划时代的'三驾马车'论文（GFS, MapReduce, BigTable），解决了海量数据的存储与计算难题。Doug Cutting基于此开发了开源的Hadoop，使得普通企业也能利用廉价PC集群处理PB级数据。",
        tags: ["Hadoop", "MapReduce", "Data Warehouse"]
    },
    {
        title: "Wave 2: 移动与实时化 (2011-2016)",
        desc: "智能手机普及，数据从PC端向移动端转移，数据量呈指数级爆发。Spark的出现解决了Hadoop计算慢的问题，将计算移入内存。同时，流处理技术（Storm, Flink）兴起，满足了对实时性的渴求。",
        tags: ["Spark", "NoSQL", "Mobile Internet"]
    },
    {
        title: "Wave 3: AI与云原生 (2017-Present)",
        desc: "大数据与人工智能深度融合（Data + AI）。'数据湖'概念兴起，不仅存储数据，更直接支撑深度学习训练。云原生架构（Snowflake, Databricks）让存算分离，企业可以按需租用算力，数据成为核心资产。",
        tags: ["AI/ML", "Cloud Native", "Data Lakehouse"]
    }
];

function updateTimeline(index) {
    document.querySelectorAll('.timeline-nav').forEach((btn, i) => {
        if(i === index) {
            btn.classList.add('active', 'border-brand-500', 'bg-white/60', 'dark:bg-slate-800/60', 'shadow-md');
            btn.classList.remove('border-transparent', 'hover:bg-white/30', 'opacity-70');
        } else {
            btn.classList.remove('active', 'border-brand-500', 'bg-white/60', 'dark:bg-slate-800/60', 'shadow-md');
            btn.classList.add('border-transparent', 'hover:bg-white/30', 'opacity-70');
        }
    });

    const d = historyData[index];
    document.getElementById('hist-title').innerText = d.title;
    document.getElementById('hist-desc').innerText = d.desc;
    document.getElementById('hist-tags').innerHTML = d.tags.map(t => `<span class="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-mono">${t}</span>`).join('');
}

// --- Impact Toggle ---
function toggleImpact(type) {
    const btnPos = document.getElementById('btn-pos');
    const btnNeg = document.getElementById('btn-neg');
    const textBox = document.getElementById('impact-text');
    const isDark = document.documentElement.classList.contains('dark');

    if(type === 'pos') {
        btnPos.className = `px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-all bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400`;
        btnNeg.className = "px-4 py-2 rounded-md text-sm font-bold text-slate-500 hover:text-rose-500 transition-all";
        
        textBox.innerHTML = `
            <h4 class="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">决策科学化与效率提升</h4>
            <p class="text-sm text-[var(--text-secondary)]">以前的决策依赖经验和直觉，现在依赖数据。例如，UPS通过大数据优化送货路线，每年节省数千万加仑燃油；精准医疗通过基因数据分析，为癌症患者提供定制化治疗方案，显著提高生存率。</p>
        `;
        
        charts.impact.data.datasets[0].data = [85, 80, 20, 15];
        charts.impact.data.datasets[0].backgroundColor = ['rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(203, 213, 225, 0.5)', 'rgba(203, 213, 225, 0.5)'];
    } else {
        btnNeg.className = `px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-all bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400`;
        btnPos.className = "px-4 py-2 rounded-md text-sm font-bold text-slate-500 hover:text-emerald-500 transition-all";

        textBox.innerHTML = `
            <h4 class="font-bold text-lg mb-2 text-rose-600 dark:text-rose-400">隐私泄露与信息茧房</h4>
            <p class="text-sm text-[var(--text-secondary)]">"大数据杀熟"让老用户支付更高价格；推荐算法不断推送符合你喜好的内容，制造"回声室效应"，窄化用户视野。更严重的是，当我们的生物特征、行踪被数字化存储，一旦泄露，我们将毫无隐私可言。</p>
        `;

        charts.impact.data.datasets[0].data = [30, 40, 90, 85];
        charts.impact.data.datasets[0].backgroundColor = ['rgba(203, 213, 225, 0.5)', 'rgba(203, 213, 225, 0.5)', 'rgba(244, 63, 94, 0.8)', 'rgba(244, 63, 94, 0.8)'];
    }
    charts.impact.update();
}

// === 4. Chart Interactivity ===
function highlightChart(type) {
    if (!charts || !charts.radar) return;

    // Map incoming type to radar index
    const map = { vol: 0, var: 1, vel: 2, val: 3 };
    const idx = type && map.hasOwnProperty(type) ? map[type] : -1;

    const chart = charts.radar;
    const ds = chart.data.datasets[0];

    // Prepare default and highlight styles
    const defaultPointColor = '#0ea5e9';
    const mutedPointColor = '#94a3b8';
    const highlightRadius = 8;
    const normalRadius = 4;

    if (idx === -1) {
        // reset to defaults
        ds.pointBackgroundColor = defaultPointColor;
        ds.pointRadius = normalRadius;
        // 恢复区域与边框到正常状态
        ds.backgroundColor = 'rgba(14, 165, 233, 0.2)';
        ds.borderColor = '#0ea5e9';
        ds.borderWidth = 2;
    } else {
        // 高亮点样式（点颜色、半径）
        ds.pointBackgroundColor = ds.data.map((_, i) => i === idx ? defaultPointColor : mutedPointColor);
        ds.pointRadius = ds.data.map((_, i) => i === idx ? highlightRadius : normalRadius);

        // 增强整体视觉：加粗边框并增强填充透明度
        ds.backgroundColor = 'rgba(14, 165, 233, 0.32)';
        ds.borderColor = '#0ea5e9';
        ds.borderWidth = 4;
    }

    chart.update('none');
}

// Tooltip text for each dimension
const characteristicTips = {
    vol: 'Volume (海量)：数据量巨大，存储与传输是核心挑战。',
    var: 'Variety (多样)：非结构化数据占主流，预处理难度大。',
    vel: 'Velocity (高速)：实时性要求高，需要低延迟计算。',
    val: 'Value (低密)：有效信息稀少，需强力筛选与建模。'
};

let lifecycleActive = null; // track touch/click active key

function showChartTooltip(text) {
    const t = document.getElementById('chart-tooltip');
    if (!t) return;
    if (!text) {
        t.classList.remove('visible');
        t.classList.add('hidden');
        t.textContent = '';
        return;
    }
    t.textContent = text;
    t.classList.remove('hidden');
    t.classList.add('visible');
}

function onLifecycleCardClick(key, e) {
    // prevent page-level click handler from immediately resetting
    e.stopPropagation();
    // Toggle on touch/click
    if (lifecycleActive === key) {
        lifecycleActive = null;
        highlightChart();
        showChartTooltip();
    } else {
        lifecycleActive = key;
        highlightChart(key);
        showChartTooltip(characteristicTips[key]);
        // 将 tooltip 放置在卡片附近
        try {
            const card = e.currentTarget || e.target.closest('.lifecycle-card');
            if (card) {
                const cardRect = card.getBoundingClientRect();
                positionChartTooltipAt(cardRect.left + cardRect.width/2, cardRect.top + 10);
            }
        } catch (err) {
            // ignore
        }
    }
}

function onLifecycleCardKey(e, key) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onLifecycleCardClick(key, e);
    }
}

// 将 tooltip 定位到相对于图表容器的位置（clientX/Y 来自 pointer 事件）
function positionChartTooltipAt(clientX, clientY) {
    const t = document.getElementById('chart-tooltip');
    const wrapper = document.querySelector('#characteristics .chart-wrapper') || document.querySelector('.chart-wrapper');
    if (!t || !wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const margin = 8;

    // 先设置文本以便拿到尺寸
    t.style.left = ''; t.style.top = '';
    const tipRect = t.getBoundingClientRect();
    
    // 计算相对于 wrapper 的位置（优先靠近鼠标，必要时限制在 wrapper 内）
    let left = clientX - wrapperRect.left + 10;
    let top = clientY - wrapperRect.top - tipRect.height - 10;

    // 防止溢出右/左/上/下
    if (left + tipRect.width + margin > wrapperRect.width) left = wrapperRect.width - tipRect.width - margin;
    if (left < margin) left = margin;
    if (top < margin) top = clientY - wrapperRect.top + 10; // 如果上方不够，放到鼠标下方
    if (top + tipRect.height + margin > wrapperRect.height) top = wrapperRect.height - tipRect.height - margin;
    
    // 应用位置（以 px）
    t.style.left = `${left}px`;
    t.style.top = `${top}px`;
}

// 注册 pointer 事件以实现鼠标跟随 tooltip 定位（同时兼容触控/桌面）
function attachLifecycleCardHandlers() {
    const cards = document.querySelectorAll('.lifecycle-card');
    const tooltip = document.getElementById('chart-tooltip');
    if (!cards || !tooltip) return;

    cards.forEach(card => {
        const key = card.dataset.key;
        
        // pointerenter -> 高亮并显示 tooltip
        card.addEventListener('pointerenter', (ev) => {
            // 如果是触控（pointerType === 'touch'），不要因 pointerenter 触发（以点击为准）
            if (ev.pointerType === 'touch') return;
            highlightChart(key);
            showChartTooltip(characteristicTips[key]);
            positionChartTooltipAt(ev.clientX, ev.clientY);
        }, { passive: true });

        // pointermove -> 跟随鼠标定位
        card.addEventListener('pointermove', (ev) => {
            if (ev.pointerType === 'touch') return;
            positionChartTooltipAt(ev.clientX, ev.clientY);
        }, { passive: true });

        // pointerleave -> 若非通过点击激活则重置
        card.addEventListener('pointerleave', (ev) => {
            if (lifecycleActive === key) {
                // 点击激活后，鼠标离开不取消（保持激活）
                return;
            }
            highlightChart();
            showChartTooltip();
        }, { passive: true });
    });
}

// Reset highlight when clicking outside any lifecycle card
document.addEventListener('click', (e) => {
    if (!e.target.closest('.lifecycle-step') && !e.target.closest('.glass-card')) {
        lifecycleActive = null;
        highlightChart();
        showChartTooltip();
    }
}, { capture: true });

function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// === 5. Theme Toggle ===
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.theme = 'dark';
    }
    // Update charts color
    const colors = getColors();
    Chart.defaults.color = colors.text;
    Object.values(charts).forEach(c => {
        if(c.options.scales.r) {
            c.options.scales.r.grid.color = colors.grid;
            c.options.scales.r.angleLines.color = colors.grid;
            c.options.scales.r.pointLabels.color = colors.text;
        }
        c.update();
    });
}

// --- Typewriter Effect Class (from data.html)
class Typewriter {
    constructor(elementId, phrases, waitTime = 2000) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.waitTime = waitTime;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];

        if (this.isDeleting) {
            this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = 100;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.charIndex === currentPhrase.length) {
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Theme
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.add('light');
}

window.onload = () => {
    initParticles();
    initCharts();

    // 初始化示例交互图表
    initInteractiveChart();

    // 初始化卡片事件处理（鼠标跟随 tooltip）
    attachLifecycleCardHandlers();

    // Start Typewriter in hero (phrases can be adjusted)
    const phrases = [
        "华北水利水电大学",
        "信息工程学院",
        "202305825徐艺博",
        "大数据基础结课作业"
    ];
    // Guard: only start if element exists
    if (document.getElementById('typewriter-text')) {
        new Typewriter('typewriter-text', phrases, 2000);
    }
};

// Scroll Spy for Nav
window.addEventListener('scroll', () => {
    const sections = ['hero', 'characteristics', 'lifecycle', 'evolution', 'industries', 'impact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (window.scrollY >= (element.offsetTop - 150)) {
            current = '#' + section;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu controls
function toggleMobileMenu() {
    const wrapper = document.getElementById('mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    const btn = document.getElementById('mobile-menu-button');
    const hamburger = document.getElementById('hamburger-icon');
    const close = document.getElementById('close-icon');

    if (wrapper.classList.contains('hidden')) {
        wrapper.classList.remove('hidden');
        // allow next tick for transition
        setTimeout(() => panel.classList.remove('translate-x-full'), 20);
        wrapper.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        hamburger.classList.add('hidden');
        close.classList.remove('hidden');
        // focus first menu item
        const first = wrapper.querySelector('[role="menuitem"]');
        if (first) first.focus();
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const wrapper = document.getElementById('mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    const btn = document.getElementById('mobile-menu-button');
    const hamburger = document.getElementById('hamburger-icon');
    const close = document.getElementById('close-icon');

    panel.classList.add('translate-x-full');
    wrapper.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('hidden');
    close.classList.add('hidden');
    // wait for transition then hide wrapper
    setTimeout(() => wrapper.classList.add('hidden'), 300);
    // restore focus to toggle
    if (btn) btn.focus();
}

// Close mobile menu on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const wrapper = document.getElementById('mobile-menu');
        if (wrapper && !wrapper.classList.contains('hidden')) {
            closeMobileMenu();
        }
    }
});

// === 示例交互图表逻辑 ===
function generateSeries(type) {
    const labels = [];
    const data = [];
    const now = Date.now();

    if (type === 'sales') {
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now - i * 30 * 24 * 3600 * 1000);
            labels.push(d.toLocaleString('zh-CN', { month: 'short' }));
            data.push(Math.round(200 + Math.random() * 800));
        }
    } else if (type === 'users') {
        for (let i = 11; i >= 0; i--) {
            labels.push('W' + (12 - i));
            data.push(Math.round(1000 + Math.random() * 5000));
        }
    } else {
        for (let i = 11; i >= 0; i--) {
            labels.push((11 - i) + ':00');
            data.push(parseFloat((Math.random() * 5).toFixed(2)));
        }
    }

    return { labels, data };
}

let interactiveChart = null;
function initInteractiveChart() {
    const ctx = document.getElementById('interactiveChart').getContext('2d');
    const ds = generateSeries('sales');

    interactiveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ds.labels,
            datasets: [{
                label: '销售额',
                data: ds.data,
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14,165,233,0.12)',
                fill: true,
                tension: 0.3,
                pointRadius: 4
            }]
        },
        options: {
            maintainAspectRatio: false,
            interaction: { mode: 'nearest', intersect: false },
            plugins: {
                legend: { display: true },
                zoom: {
                    pan: { enabled: true, mode: 'x' },
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true }
            }
        }
    });

    // Controls
    document.getElementById('datasetSelect').addEventListener('change', (e) => {
        const val = e.target.value;
        const newSeries = generateSeries(val);
        interactiveChart.data.labels = newSeries.labels;
        interactiveChart.data.datasets[0].data = newSeries.data;
        interactiveChart.data.datasets[0].label = val === 'sales' ? '销售额' : (val === 'users' ? '活跃用户' : '错误率');
        interactiveChart.update();
    });

    document.getElementById('randomizeBtn').addEventListener('click', () => {
        const ds = interactiveChart.data.datasets[0];
        ds.data = ds.data.map(() => Math.round(Math.random() * (ds.label === '错误率' ? 5 : 5000)));
        interactiveChart.update();
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = interactiveChart.toBase64Image('image/png', 1);
        link.download = 'interactive-chart.png';
        document.body.appendChild(link);
        link.click();
        link.remove();
    });
}
