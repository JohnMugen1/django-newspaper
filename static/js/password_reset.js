// ALL CODE IS STRICTLY SCOPED TO password-reset-wrapper
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordReset);
    } else {
        initPasswordReset();
    }

    function initPasswordReset() {
        const wrapper = document.querySelector('.password-reset-wrapper');
        if (!wrapper) return;

        // Flower petals animation
        const petalsContainer = document.getElementById('passwordResetFlowerPetals');
        if (petalsContainer) {
            createPetals(petalsContainer);
        }

        // Form elements
        const form = wrapper.querySelector('.password-reset-wrapper__form');
        const emailInput = wrapper.querySelector('input[type="email"]');
        const submitBtn = wrapper.querySelector('.password-reset-wrapper__btn');

        // Email validation
        if (emailInput) {
            setupEmailValidation(emailInput, wrapper);
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                if (!validateEmail(emailInput, wrapper)) {
                    e.preventDefault();
                } else {
                    // Show loading state
                    submitBtn.innerHTML = '<span class="password-reset-wrapper__btn-icon">⏳</span> Sending...';
                    submitBtn.disabled = true;
                    
                    // Add sending animation
                    simulateSending(wrapper);
                }
            });
        }

        // Add input animations
        setupInputAnimations(wrapper);

        // Check for saved email (optional)
        loadSavedEmail(emailInput);
    }

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
        petal.className = 'password-reset-wrapper__petal';
        
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

    function setupEmailValidation(input, wrapper) {
        input.addEventListener('input', function() {
            const email = this.value;
            
            if (email && !isValidEmail(email)) {
                this.classList.add('error');
                showFieldError(this, 'Please enter a valid email address', wrapper);
            } else {
                this.classList.remove('error');
                removeFieldError(this);
            }
        });

        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('error');
                showFieldError(this, 'Please enter a valid email address', wrapper);
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateEmail(input, wrapper) {
        if (!input.value) {
            showFieldError(input, 'Email address is required', wrapper);
            return false;
        }
        
        if (!isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address', wrapper);
            return false;
        }
        
        return true;
    }

    function showFieldError(field, message, wrapper) {
        // Remove existing error
        removeFieldError(field);
        
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'password-reset-wrapper__field-errors';
        errorDiv.innerHTML = `<span class="password-reset-wrapper__error-text">${message}</span>`;
        field.parentElement.parentElement.appendChild(errorDiv);
    }

    function removeFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentElement.parentElement.querySelector('.password-reset-wrapper__field-errors');
        if (existingError) {
            existingError.remove();
        }
    }

    function setupInputAnimations(wrapper) {
        wrapper.querySelectorAll('.password-reset-wrapper__form-group input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    function simulateSending(wrapper) {
        // Animate the help card while sending
        const helpCard = wrapper.querySelector('.password-reset-wrapper__help-card');
        if (helpCard) {
            helpCard.style.animation = 'password-reset-wrapper__pulse 1s infinite';
            
            // Add sending message
            const sendingMsg = document.createElement('div');
            sendingMsg.className = 'password-reset-wrapper__sending-message';
            sendingMsg.textContent = 'Checking your email...';
            sendingMsg.style.marginTop = '1rem';
            sendingMsg.style.textAlign = 'center';
            sendingMsg.style.color = '#667eea';
            sendingMsg.style.fontWeight = '500';
            
            helpCard.parentElement.insertBefore(sendingMsg, helpCard.nextSibling);
        }
    }

    function loadSavedEmail(input) {
        // Check if there's a previously used email in localStorage
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail && input) {
            input.value = savedEmail;
        }
    }

    // Add smooth scroll to errors
    document.querySelectorAll('.password-reset-wrapper__error-message').forEach(error => {
        error.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Track form interaction for analytics (optional)
    if (emailInput) {
        emailInput.addEventListener('focus', () => {
            console.log('User started password reset process');
        });
    }
})();

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    .password-reset-wrapper__field-errors {
        margin-top: 0.3rem;
        animation: password-reset-wrapper__fadeIn 0.3s ease-out;
    }
    
    .password-reset-wrapper input.error {
        border-color: #e53e3e;
        background-color: #fff5f5;
    }
    
    .password-reset-wrapper input.error:focus {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    .password-reset-wrapper__input-wrapper.focused .password-reset-wrapper__input-icon {
        color: #667eea;
    }
    
    .password-reset-wrapper__sending-message {
        animation: password-reset-wrapper__pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);