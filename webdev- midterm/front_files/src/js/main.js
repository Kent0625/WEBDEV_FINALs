// QuarkNet - Main JavaScript File
// Frontend-only social media prototype

class QuarkNet {
    constructor() {
        this.currentUser = null;
        this.posts = [];
        this.notifications = [];
        this.apiBaseUrl = 'http://127.0.0.1:8000';
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkAuth();
        this.initializeTheme();
    }

    // Data Management
    loadData() {
        // Load current user from localStorage (Session persistence)
        const currentUserData = localStorage.getItem('quarknet_current_user');
        this.currentUser = currentUserData ? JSON.parse(currentUserData) : null;
    }

    saveData() {
        if (this.currentUser) {
            localStorage.setItem('quarknet_current_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('quarknet_current_user');
        }
    }

    // Authentication
    async login(email, password) {
        try {
            const response = await axios.post(`${this.apiBaseUrl}/users/login`, {
                email: email,
                password: password
            });
            
            if (response.data.success) {
                this.currentUser = response.data.user;
                this.saveData();
                return { success: true, user: this.currentUser };
            } else {
                return { success: false, message: response.data.message || 'Login failed' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Connection error' };
        }
    }

    async signup(userData) {
        try {
            const response = await axios.post(`${this.apiBaseUrl}/users/signup`, userData);
            
            if (response.data.success) {
                this.currentUser = response.data.user;
                this.saveData();
                return { success: true, user: this.currentUser };
            } else {
                return { success: false, message: response.data.message || 'Signup failed' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Connection error' };
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('quarknet_current_user');
        
        // Check if we are in the pages directory
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    checkAuth() {
        const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'); 
        
        if (this.currentUser && isAuthPage) {
            window.location.href = 'feed.html';
        }
        
        if (!this.currentUser && !isIndex && !isAuthPage) {
            window.location.href = 'login.html';
        }
    }

    // Posts Management
    async createPost(content) {
        if (!this.currentUser) return { success: false, message: 'Not authenticated' };

        // Brainrot detection
        if (this.detectBrainrot(content)) {
            this.showBrainrotWarning();
            return { success: false, message: 'Content detected as brainrot and has been atomized' };
        }

        try {
            const response = await axios.post(`${this.apiBaseUrl}/posts`, {
                userId: this.currentUser.id,
                content: content
            });

            if (response.data.success) {
                // Add to local list immediately or reload feed
                // For simplicity, we just reload feed or unshift
                const newPost = response.data.post;
                this.posts.unshift(newPost);
                
                // Update local user post count
                if (this.currentUser) {
                    this.currentUser.posts_count = (this.currentUser.posts_count || 0) + 1;
                    this.saveData();
                }
                
                return { success: true, post: newPost };
            }
            return { success: false, message: 'Failed to create post' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error creating post' };
        }
    }

    likePost(postId) {
        // Placeholder for backend like implementation
        // For now just update UI locally
        const post = this.posts.find(p => p.id === postId);
        if (!post) return { success: false };

        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        
        // In a real app, send PUT/POST to backend here
        
        return { success: true, post };
    }

    // Brainrot Detection (Easter Egg Feature)
    detectBrainrot(content) {
        const brainrotKeywords = [
            'no cap', 'fr fr', 'bussin', 'slay', 'periodt', 'bet', 'lowkey', 'highkey',
            'stan', 'simp', 'yeet', 'flex', 'clout', 'vibe check', 'main character',
            'pick me', 'not like other girls', 'sigma', 'alpha', 'beta', 'chad',
            'based', 'cringe', 'sus', 'mid', 'fire', 'goals', 'aesthetic',
            '✨', '💅', 'period', 'queen', 'king', 'bestie', 'sis'
        ];

        const lowerContent = content.toLowerCase();
        const brainrotCount = brainrotKeywords.filter(keyword => 
            lowerContent.includes(keyword.toLowerCase())
        ).length;

        return brainrotCount > 2;
    }

    showBrainrotWarning() {
        const warning = document.createElement('div');
        warning.className = 'brainrot-warning';
        warning.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                z-index: 1000;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: atomize 2s ease-in-out forwards;
            ">
                <h2>⚠️ BRAINROT DETECTED ⚠️</h2>
                <p>Your content has been reduced to atoms!</p>
                <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;">
                    QuarkNet only accepts quality, thoughtful content.
                </p>
            </div>
        `;
        
        document.body.appendChild(warning);
        
        setTimeout(() => {
            document.body.removeChild(warning);
        }, 3000);
    }

    // Notifications - kept local/static for now as requested focus is backend connection
    addNotification(type, message, userId = null) {
        // Implementation would need backend
        return null;
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('quarknet_theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('quarknet_theme', theme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Event Listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.logout-btn')) {
                this.logout();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                const postId = parseInt(e.target.closest('.like-btn').dataset.postId);
                this.likePost(postId);
                this.updatePostDisplay(postId);
            }
        });

        // Note: Post submission listener should be handled in specific page scripts 
        // if they need async/await, but we can keep a generic one here if we handle the promise
    }

    // UI Updates
    updatePostDisplay(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const likeBtn = document.querySelector(`[data-post-id="${postId}"]`);
        if (!likeBtn) return;
        
        const likeCount = likeBtn.querySelector('.like-count');
        
        if (likeCount) {
            likeCount.textContent = post.likes;
        }
        
        if (post.liked) {
            likeBtn.classList.add('liked');
        } else {
            likeBtn.classList.remove('liked');
        }
    }

    async loadFeed() {
        const postsContainer = document.querySelector('.posts-container');
        if (!postsContainer) return;
        
        postsContainer.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

        try {
            const response = await axios.get(`${this.apiBaseUrl}/posts`);
            this.posts = response.data;
            
            if (this.posts.length === 0) {
                 postsContainer.innerHTML = `
                    <div class="empty-state" style="text-align: center; padding: 3rem;">
                        <i class="fas fa-pen" style="font-size: 2rem; color: #ccc;"></i>
                        <h3>No posts yet</h3>
                        <p>Be the first to share your thoughts!</p>
                    </div>
                `;
            } else {
                postsContainer.innerHTML = this.posts.map(post => this.renderPost(post)).join('');
            }
        } catch (error) {
            console.error(error);
            postsContainer.innerHTML = '<div style="text-align:center; color: red;">Failed to load posts.</div>';
        }
    }

    async getUserPosts(userId) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/users/${userId}/posts`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    renderPost(post) {
        const timeAgo = this.getTimeAgo(post.timestamp);
        return `
            <div class="post fade-in">
                <div class="post-header">
                    <div class="post-avatar">${post.avatar || 'U'}</div>
                    <div class="post-user-info">
                        <h4>${post.fullName || post.username}</h4>
                        <span>@${post.username} • ${timeAgo}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p class="post-text">${this.formatPostContent(post.content)}</p>
                </div>
                <div class="post-actions">
                    <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${post.likes}</span>
                    </button>
                    <button class="action-btn">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments}</span>
                    </button>
                    <button class="action-btn">
                        <i class="fas fa-share"></i>
                        <span>Share</span>
                    </button>
                </div>
            </div>
        `;
    }

    formatPostContent(content) {
        if (!content) return "";
        return content
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
            .replace(/@(\w+)/g, '<a href="#" class="mention">@$1</a>')
            .replace(/#(\w+)/g, '<a href="#" class="hashtag">#$1</a>');
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - postTime) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }

    // Utilities
    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showInfoMessage(message) {
        this.showMessage(message, 'info');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// Global function for password toggle
window.togglePassword = function(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.quarknet = new QuarkNet();
});
