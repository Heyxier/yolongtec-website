/**
 * Yolong 亚隆 - 官网交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initStatsAnimation();
    initSmoothScroll();
    initTabs();
    initScrollAnimations();
    initMobileMenu();
    initSearch();
    initFormSubmit();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 导航链接激活状态
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 数字滚动动画
 */
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateNumber(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

function animateNumber(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 移动端关闭菜单
                const mobileMenu = document.getElementById('navMenu');
                if (mobileMenu && window.innerWidth <= 768) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

/**
 * 解决方案标签页切换
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.solution-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // 移除所有激活状态
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // 激活当前标签
            btn.classList.add('active');
            const panel = document.getElementById(tabId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.product-card, .news-card, .stat-item, .solution-card, .reveal'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // 点击菜单项关闭菜单（跳过 PRODUCTS 下拉触发链接）
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // 不要关闭移动菜单 - PRODUCTS 需要展开子菜单
            if (window.innerWidth <= 768 && link.closest('.nav-dropdown')) {
                e.preventDefault();
                return;
            }
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Mobile dropdown toggle for PRODUCTS
    const navDropdown = navMenu.querySelector('.nav-dropdown');
    if (navDropdown) {
        const dropdownLink = navDropdown.querySelector('.nav-link');
        
        // 移动端：把 PRODUCTS 链接变成纯触发按钮，不再有导航行为
        if (window.innerWidth <= 768) {
            dropdownLink.setAttribute('data-href', dropdownLink.getAttribute('href'));
            dropdownLink.setAttribute('href', 'javascript:void(0)');
        }
        
        // 移动端：点击 PRODUCTS 展开/收起子菜单
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                navDropdown.classList.toggle('open');
            }
        });
        
        // 次级菜单项点击 -> 关闭整个移动菜单
        navDropdown.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // 记住目标地址，等菜单收起后导航
                const href = link.getAttribute('href');
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                // 延迟导航，让 CSS 动画有时间播放
                setTimeout(() => { window.location.href = href; }, 200);
            });
        });
    }
}

/**
 * 表单提交
 */
function initFormSubmit() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            // 自动记录来源页面 URL
            data.source_url = window.location.href;
            
            // 提交按钮状态
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'SENDING...';
            btn.disabled = true;
            
            try {
                const response = await fetch('https://api.yolongtec.com/api/contact/yolongtec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.status === 'ok') {
                    alert('✅ 留言已提交！我们的工作人员将尽快与您联系。');
                    form.reset();
                } else {
                    alert('❌ 提交失败，请稍后重试。');
                }
            } catch (err) {
                alert('❌ 网络错误，请检查网络连接后重试。');
                console.error('Contact form error:', err);
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
}

/**
 * 搜索功能
 */
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const closeSearch = document.getElementById('closeSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchBtn || !searchBar) return;
    
    // Open search bar
    searchBtn.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });
    
    // Close search bar
    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
            if (searchResults) searchResults.classList.remove('active');
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchInput.value = '';
            if (searchResults) searchResults.classList.remove('active');
        }
    });
    
    // Search on input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                if (searchResults) searchResults.classList.remove('active');
                return;
            }
            
            // Search products
            const results = searchProducts(query);
            displaySearchResults(results, searchResults);
        });
    }
}

/**
 * 搜索功能（数据驱动 + 中英文）
 * 数据源：由 _layouts/default.html 注入的 window.__SEARCH_DATA__
 * 新增搜索内容：在 _data/search.yml 中添加即可
 */
function searchProducts(query) {
    var data = window.__SEARCH_DATA__;
    if (!data) return [];
    var isZh = window.location.pathname.indexOf('/zh/') !== -1;
    var q = query.toLowerCase();
    
    return data.products.filter(function(p) {
        var searchName = isZh ? p.name_zh : p.name;
        var searchCat = isZh ? p.category_zh : p.category;
        return searchName.toLowerCase().indexOf(q) !== -1 ||
               p.model.toLowerCase().indexOf(q) !== -1 ||
               searchCat.toLowerCase().indexOf(q) !== -1;
    });
}

/**
 * 显示搜索结果（中英文版）
 */
function displaySearchResults(results, container) {
    if (!container) return;
    var isZh = window.location.pathname.indexOf('/zh/') !== -1;
    var base = window.location.pathname.match(/^\/[^\/]+/);
    var baseUrl = base ? base[0] : '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-no-results">' +
            (isZh ? '未找到相关产品' : 'No products found') + '</div>';
        container.classList.add('active');
        return;
    }
    
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        var name = isZh ? r.name_zh : r.name;
        var cat = isZh ? r.category_zh : r.category;
        var path = isZh
            ? baseUrl + '/zh/products/' + r.slug + '/'
            : baseUrl + '/products/' + r.slug + '.html';
        html += '<a href="' + path + '" class="search-result-item">' +
            '<div class="result-name">' + name + '</div>' +
            '<div class="result-model">' + r.model + ' | ' + cat + '</div>' +
            '</a>';
    }
    
    container.innerHTML = html;
    container.classList.add('active');
}

// 移动端菜单 CSS - handled by styles.css

// 页面加载完成后的淡入效果 - 已移除 body opacity hack 防止闪白

// 导出函数供外部使用
window.Yolong = {
    initStatsAnimation,
    initScrollAnimations
};
