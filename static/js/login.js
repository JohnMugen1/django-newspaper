// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== PASSWORD TOGGLE FUNCTIONALITY =====
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                
                // Add animation effect
                this.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-50%) scale(1)';
                }, 200);
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                
                // Add animation effect
                this.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-50%) scale(1)';
                }, 200);
            }
            
            // Add ripple effect
            createRipple(this);
        });
    });

    // ===== FORM SUBMISSION ANIMATION =====
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // Add loading state to button
            loginBtn.classList.add('loading');
            
            // Disable button to prevent double submission
            loginBtn.disabled = true;
            
            // Optional: Add validation before submission
            if (!validateForm()) {
                e.preventDefault();
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
                showNotification('Please fill all fields correctly', 'error');
            }
        });
    }

    // ===== FORM VALIDATION =====
    function validateForm() {
        const username = document.querySelector('#id_username');
        const password = document.querySelector('#id_password');
        let isValid = true;

        // Reset previous error states
        removeErrorStates();

        // Validate username
        if (!username.value.trim()) {
            showFieldError(username, 'Username is required');
            isValid = false;
        } else if (username.value.length < 3) {
            showFieldError(username, 'Username must be at least 3 characters');
            isValid = false;
        }

        // Validate password
        if (!password.value) {
            showFieldError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showFieldError(password, 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        if (!existingError) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            errorElement.style.cssText = `
                color: #f72585;
                font-size: 12px;
                margin-top: 5px;
                animation: slideDown 0.3s ease;
            `;
            formGroup.appendChild(errorElement);
        }
        
        field.style.borderColor = '#f72585';
        field.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    function removeErrorStates() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
        document.querySelectorAll('.form-group input').forEach(input => {
            input.style.borderColor = '';
        });
    }

    // ===== INPUT ANIMATIONS =====
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            const label = this.closest('.form-group').querySelector('label');
            if (label) {
                label.style.color = 'var(--primary-color)';
            }
        });

        input.addEventListener('blur', function() {
            const label = this.closest('.form-group').querySelector('label');
            if (label) {
                label.style.color = '';
            }
        });

        // Add input validation indicator
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.background = 'rgba(76, 201, 240, 0.05)';
            } else {
                this.style.background = '';
            }
        });
    });

    // ===== REMEMBER ME CHECKBOX ANIMATION =====
    const rememberCheckbox = document.querySelector('.remember-me input');
    
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', function() {
            const span = this.nextElementSibling;
            
            if (this.checked) {
                span.style.animation = 'checkPulse 0.3s ease';
                setTimeout(() => {
                    span.style.animation = '';
                }, 300);
            }
        });
    }

    // ===== CREATE RIPPLE EFFECT =====
    function createRipple(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size/2}px`;
        ripple.style.top = `${event.clientY - rect.top - size/2}px`;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== SHOW NOTIFICATION =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'error' ? '#f72585' : '#4361ee'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== ADD KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter to submit form
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            inputs.forEach(input => {
                if (input === document.activeElement) {
                    input.value = '';
                }
            });
        }
    });

    // ===== ADD ANIMATION KEYFRAMES =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes checkPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); color: var(--primary-color); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .field-error {
            color: #f72585;
            font-size: 12px;
            margin-top: 5px;
            padding-left: 10px;
            animation: slideDown 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }
    `;
    
    document.head.appendChild(style);

    // ===== MOUSE MOVE PARALLAX EFFECT =====
    const card = document.querySelector('.login-card');
    const decoration = document.querySelector('.login-decoration');
    
    if (card && decoration) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            decoration.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // ===== PREVENT FORM RESUBMISSION ON PAGE REFRESH =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});