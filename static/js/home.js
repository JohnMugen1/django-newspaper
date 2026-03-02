// home.js - Simple and Error-Free

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user is authenticated by looking for stats elements
    const articleCount = document.getElementById('articleCount');
    
    if (articleCount) {
        // User is authenticated - load stats and recent articles
        loadUserStats();
        loadRecentArticles();
    }
    
    // Add smooth hover effects to cards
    addHoverEffects();
    
});

// Load user statistics
function loadUserStats() {
    // Get stat elements
    const articleCount = document.getElementById('articleCount');
    const likesCount = document.getElementById('likesCount');
    const viewsCount = document.getElementById('viewsCount');
    
    // Simulate loading from backend
    setTimeout(function() {
        if (articleCount) articleCount.textContent = '12';
        if (likesCount) likesCount.textContent = '234';
        if (viewsCount) viewsCount.textContent = '1.2k';
    }, 800);
}

// Load recent articles
function loadRecentArticles() {
    const recentArticles = document.getElementById('recentArticles');
    
    if (!recentArticles) return;
    
    // Show loading skeleton first
    recentArticles.innerHTML = `
        <div class="activity-item skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
        <div class="activity-item skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
        <div class="activity-item skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `;
    
    // Simulate loading from backend
    setTimeout(function() {
        const articles = [
            { title: 'Getting Started with Django', date: '2 hours ago', likes: 45 },
            { title: 'Web Design Trends 2026', date: 'Yesterday', likes: 32 },
            { title: 'Python Tips and Tricks', date: '3 days ago', likes: 78 }
        ];
        
        let html = '';
        
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            html += `
                <div class="activity-item">
                    <div class="activity-icon">📄</div>
                    <div class="activity-details">
                        <h4 class="activity-title">${escapeHtml(article.title)}</h4>
                        <div class="activity-meta">
                            <span class="activity-time">${escapeHtml(article.date)}</span>
                            <span class="activity-likes">❤️ ${article.likes}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        recentArticles.innerHTML = html;
    }, 1500);
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add hover effects to cards
function addHoverEffects() {
    // Stat items hover effect
    const statItems = document.querySelectorAll('.stat-item');
    for (let i = 0; i < statItems.length; i++) {
        statItems[i].addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        statItems[i].addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Activity items hover effect
    const activityItems = document.querySelectorAll('.activity-item:not(.skeleton)');
    for (let i = 0; i < activityItems.length; i++) {
        activityItems[i].addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        activityItems[i].addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    }
}

// Handle logout confirmation (optional)
const logoutForms = document.querySelectorAll('.logout-form');
for (let i = 0; i < logoutForms.length; i++) {
    logoutForms[i].addEventListener('submit', function(e) {
        if (!confirm('Are you sure you want to sign out?')) {
            e.preventDefault();
        }
    });
}