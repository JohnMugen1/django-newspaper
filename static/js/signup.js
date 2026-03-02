// ALL CODE IS STRICTLY SCOPED TO signup-page-wrapper ELEMENTS
// No global selectors - everything targets signup-page-wrapper classes

(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignupPage);
    } else {
        initSignupPage();
    }

    function initSignupPage() {
        // Only run if we're on the signup page
        const signupWrapper = document.querySelector('.signup-page-wrapper');
        if (!signupWrapper) return;

        // Flower petals animation - scoped
        const petalsContainer = document.getElementById('signupFlowerPetals');
        if (petalsContainer) {
            createPetals(petalsContainer);
        }

        // Form elements - scoped to signup-wrapper
        const signupForm = signupWrapper.querySelector('.signup-page-wrapper__form');
        const passwordInput = signupWrapper.querySelector('input[type="password"]');
        const termsCheckbox = signupWrapper.querySelector('.signup-page-wrapper__terms-checkbox');
        const submitBtn = signupWrapper.querySelector('.signup-page-wrapper__btn');

        // Add password strength indicator - scoped
        if (passwordInput) {
            createPasswordStrengthIndicator(passwordInput, signupWrapper);
        }

        // Form submission enhancement - scoped
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                if (!validateForm(signupWrapper)) {
                    e.preventDefault();
                } else {
                    submitBtn.innerHTML = '<span class="signup-page-wrapper__btn-icon">⏳</span> Creating Account...';
                    submitBtn.disabled = true;
                }
            });
        }

        // Terms checkbox enhancement - scoped
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', function() {
                const termsSection = this.closest('.signup-page-wrapper__terms-section');
                if (this.checked) {
                    termsSection.classList.add('checked');
                } else {
                    termsSection.classList.remove('checked');
                }
            });
        }

        // Add input animations - scoped
        setupInputAnimations(signupWrapper);
    }

    // Create falling petals - scoped function
    function createPetals(container) {
        const petalCount = 30;
        
        for (let i = 0; i < petalCount; i++) {
            createPetal(container);
        }
        
        setInterval(() => {
            if (container.children.length > petalCount) {
                const oldestPetal = container.firstChild;
                if (oldestPetal) {
                    oldestPetal.remove();
                }
            }
            createPetal(container);
        }, 2000);
    }

    function createPetal(container) {
        const petal = document.createElement('div');
        petal.className = 'signup-page-wrapper__petal';
        
        const size = Math.random() * 20 + 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        
        const duration = Math.random() * 14 + 8;
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = Math.random() * -20 + 's';
        petal.style.opacity = Math.random() * 0.4 + 0.3;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(petal);
    }

    // Password strength indicator - scoped
    function createPasswordStrengthIndicator(passwordInput, wrapper) {
        const indicator = document.createElement('div');
        indicator.className = 'signup-page-wrapper__password-strength';
        indicator.innerHTML = `
            <div class="signup-page-wrapper__strength-bar">
                <div class="signup-page-wrapper__strength-fill"></div>
            </div>
            <span class="signup-page-wrapper__strength-text"></span>
        `;
        
        passwordInput.parentElement.appendChild(indicator);
        
        passwordInput.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updateStrengthIndicator(strength, indicator, wrapper);
        });
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 1;
        if (password.match(/[a-z]+/)) score += 1;
        if (password.match(/[A-Z]+/)) score += 1;
        if (password.match(/[0-9]+/)) score += 1;
        if (password.match(/[$@#&!]+/)) score += 1;
        
        return Math.min(score, 4);
    }

    function updateStrengthIndicator(strength, indicator, wrapper) {
        const fill = indicator.querySelector('.signup-page-wrapper__strength-fill');
        const text = indicator.querySelector('.signup-page-wrapper__strength-text');
        
        const strengthLevels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#319795'];
        
        fill.style.width = (strength * 25) + '%';
        fill.style.backgroundColor = colors[strength];
        text.textContent = strengthLevels[strength];
        text.style.color = colors[strength];
    }

    // Input animations - scoped
    function setupInputAnimations(wrapper) {
        wrapper.querySelectorAll('.signup-page-wrapper__form-group input').forEach(input => {
            input.addEventListener('input', function() {
                this.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    // Form validation - scoped
    function validateForm(wrapper) {
        let isValid = true;
        // Add your custom validation logic here
        return isValid;
    }

    // Add scoped styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .signup-page-wrapper__password-strength {
            margin-top: 0.5rem;
        }
        
        .signup-page-wrapper__strength-bar {
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.3rem;
        }
        
        .signup-page-wrapper__strength-fill {
            height: 100%;
            width: 0;
            transition: width 0.3s ease, background-color 0.3s ease;
        }
        
        .signup-page-wrapper__strength-text {
            font-size: 0.8rem;
            font-family: 'Inter', sans-serif;
        }
        
        .signup-page-wrapper__terms-section.checked {
            opacity: 0.8;
        }
    `;
    
    document.head.appendChild(style);
})();