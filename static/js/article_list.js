// article_list.js - Complete Search Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSearch();
    initLoadMore();
    initCardEffects();
    initKeyboardShortcuts();
    updateResultsCount();
});

// Store original articles data
let articles = [];
let filteredArticles = [];

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    const sortSelect = document.getElementById('sortSelect');
    const categorySelect = document.getElementById('categorySelect');
    
    // Store original articles
    articles = Array.from(document.querySelectorAll('.article-card'));
    
    // Search input event
    searchInput.addEventListener('input', function() {
        performSearch();
    });
    
    // Clear button
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        performSearch();
    });
    
    // Sort change
    sortSelect.addEventListener('change', function() {
        performSearch();
    });
    
    // Category change
    categorySelect.addEventListener('change', function() {
        performSearch();
    });
}

// Perform search with filters
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const sortBy = document.getElementById('sortSelect').value;
    const category = document.getElementById('categorySelect').value;
    
    // Filter articles
    filteredArticles = articles.filter(article => {
        const title = article.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const author = article.querySelector('.author-name')?.textContent.toLowerCase() || '';
        const preview = article.querySelector('.preview-text')?.textContent.toLowerCase() || '';
        
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            author.includes(searchTerm) || 
            preview.includes(searchTerm);
        
        // Category filter (you can customize this based on your data)
        let matchesCategory = true;
        if (category !== 'all') {
            const badge = article.querySelector('.card-badge');
            if (badge) {
                const badgeText = badge.classList.contains(category) || 
                                 badge.textContent.toLowerCase().includes(category);
                matchesCategory = badgeText;
            }
        }
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort articles
    sortArticles(filteredArticles, sortBy);
    
    // Update display
    updateDisplay(filteredArticles, searchTerm);
    
    // Update results count
    updateResultsCount(filteredArticles.length, articles.length);
    
    // Highlight search terms
    if (searchTerm !== '') {
        highlightSearchTerms(searchTerm);
    }
}

// Sort articles
function sortArticles(articlesToSort, sortBy) {
    articlesToSort.sort((a, b) => {
        const getTitle = (article) => article.querySelector('.article-title')?.textContent || '';
        const getDate = (article) => {
            const dateText = article.querySelector('.publish-date')?.textContent || '';
            // Extract date if available, otherwise use index
            return dateText;
        };
        
        switch(sortBy) {
            case 'recent':
                // Sort by date (newest first)
                return 1; // Placeholder - implement actual date comparison
            case 'oldest':
                return -1; // Placeholder - implement actual date comparison
            case 'title':
                return getTitle(a).localeCompare(getTitle(b));
            case 'title_desc':
                return getTitle(b).localeCompare(getTitle(a));
            default:
                return 0;
        }
    });
}

// Update display
function updateDisplay(articlesToShow, searchTerm) {
    const grid = document.getElementById('articlesGrid');
    
    // Hide all articles first
    articles.forEach(article => {
        article.style.display = 'none';
    });
    
    // Show filtered articles
    articlesToShow.forEach(article => {
        article.style.display = 'block';
    });
    
    // Show/hide no results message
    const existingNoResults = document.querySelector('.no-results-state');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    if (articlesToShow.length === 0 && searchTerm !== '') {
        showNoResults(searchTerm);
    }
}

// Show no results message
function showNoResults(searchTerm) {
    const grid = document.getElementById('articlesGrid');
    const noResults = document.createElement('div');
    noResults.className = 'no-results-state';
    noResults.innerHTML = `
        <div class="empty-illustration">🔍</div>
        <h3 class="empty-title">No Articles Found</h3>
        <p class="empty-message">We couldn't find any articles matching "${searchTerm}"</p>
        <button class="btn-primary" onclick="resetSearch()">
            <span class="btn-icon">↺</span>
            Clear Search
        </button>
    `;
    grid.appendChild(noResults);
}

// Reset search
window.resetSearch = function() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const categorySelect = document.getElementById('categorySelect');
    
    searchInput.value = '';
    sortSelect.value = 'recent';
    categorySelect.value = 'all';
    
    performSearch();
    
    // Remove highlights
    removeHighlights();
    
    // Focus search input
    searchInput.focus();
};

// Highlight search terms
function highlightSearchTerms(term) {
    removeHighlights();
    
    const elements = document.querySelectorAll('.article-title, .author-name, .preview-text');
    const regex = new RegExp(`(${term})`, 'gi');
    
    elements.forEach(el => {
        if (el.closest('.article-card')?.style.display !== 'none') {
            const originalText = el.textContent;
            el.innerHTML = originalText.replace(regex, '<span class="search-highlight">$1</span>');
        }
    });
}

// Remove highlights
function removeHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });
}

// Update results count
function updateResultsCount(count, total) {
    const statsElement = document.getElementById('resultsCount');
    if (statsElement) {
        if (count !== undefined) {
            statsElement.textContent = `Showing ${count} of ${total} articles`;
        } else {
            const visibleCount = document.querySelectorAll('.article-card[style="display: block;"]').length;
            const totalCount = articles.length;
            statsElement.textContent = `Showing ${visibleCount} of ${totalCount} articles`;
        }
    }
}

// Initialize load more
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        const btnText = this.querySelector('.btn-text');
        const spinner = this.querySelector('.btn-spinner');
        
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        this.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            this.disabled = false;
            showToast('More articles loaded!', 'success');
        }, 1500);
    });
}

// Card effects
function initCardEffects() {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach(card => {
        // Click card to read
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const link = this.querySelector('.read-btn');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Escape to clear
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput === document.activeElement) {
                searchInput.value = '';
                performSearch();
                searchInput.blur();
            }
        }
    });
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export functions for global use
window.performSearch = performSearch;
window.resetSearch = resetSearch;