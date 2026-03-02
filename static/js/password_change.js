// ALL CODE IS STRICTLY SCOPED TO password-change-wrapper
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordChange);
    } else {
        initPasswordChange();
    }

    function initPasswordChange() {
        const wrapper = document.querySelector('.password-change-wrapper');
        if (!wrapper) return;

        // Flower petals animation
        const petalsContainer = document.getElementById('passwordChangeFlowerPetals');
        if (petalsContainer) {
            createPetals(petalsContainer);
        }

        // Form elements
        const form = wrapper.querySelector('.password-change-wrapper__form');
        const oldPassword = wrapper.querySelector('#id_old_password');
        const newPassword1 = wrapper.querySelector('#id_new_password1');
        const newPassword2 = wrapper.querySelector('#id_new_password2');
        const submitBtn = wrapper.querySelector('.password-change-wrapper__btn');

        // Toggle password visibility
        setupPasswordToggles(wrapper);

        // Password strength checker
        if (newPassword1) {
            setupPasswordStrength(newPassword1, wrapper);
        }

        // Password match checker
        if (newPassword1 && newPassword2) {
            setupPasswordMatch(newPassword1, newPassword2, wrapper);
        }

        // Password requirements checker
        if (newPassword1) {
            setupPasswordRequirements(newPassword1, wrapper);
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                if (!validateForm(wrapper)) {
                    e.preventDefault();
                } else {
                    submitBtn.innerHTML = '<span class="password-change-wrapper__btn-icon">⏳</span> Changing Password...';
                    submitBtn.disabled = true;
                }
            });
        }
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
        petal.className = 'password-change-wrapper__petal';
        
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

    function setupPasswordToggles(wrapper) {
        wrapper.querySelectorAll('.password-change-wrapper__toggle-password').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                // Update eye icon
                this.innerHTML = type === 'password' 
                    ? '<svg class="password-change-wrapper__eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
                    : '<svg class="password-change-wrapper__eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            });
        });
    }

    function setupPasswordStrength(input, wrapper) {
        const strengthBar = wrapper.querySelector('.password-change-wrapper__strength-fill');
        const strengthText = wrapper.querySelector('.password-change-wrapper__strength-text');

        input.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updateStrengthIndicator(strength, strengthBar, strengthText);
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

    function updateStrengthIndicator(strength, bar, text) {
        const strengthLevels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#319795'];
        
        bar.style.width = (strength * 25) + '%';
        bar.style.backgroundColor = colors[strength];
        text.textContent = strengthLevels[strength];
        text.style.color = colors[strength];
    }

    function setupPasswordMatch(pass1, pass2, wrapper) {
        const matchIndicator = wrapper.querySelector('.password-change-wrapper__match-indicator');

        function checkMatch() {
            if (pass2.value) {
                if (pass1.value === pass2.value) {
                    matchIndicator.textContent = '✓ Passwords match';
                    matchIndicator.className = 'password-change-wrapper__match-indicator match';
                    pass2.classList.remove('error');
                } else {
                    matchIndicator.textContent = '✗ Passwords do not match';
                    matchIndicator.className = 'password-change-wrapper__match-indicator no-match';
                    pass2.classList.add('error');
                }
            } else {
                matchIndicator.textContent = '';
            }
        }

        pass1.addEventListener('input', checkMatch);
        pass2.addEventListener('input', checkMatch);
    }

    function setupPasswordRequirements(input, wrapper) {
        const requirements = {
            length: wrapper.querySelector('[data-requirement="length"]'),
            lowercase: wrapper.querySelector('[data-requirement="lowercase"]'),
            uppercase: wrapper.querySelector('[data-requirement="uppercase"]'),
            number: wrapper.querySelector('[data-requirement="number"]'),
            special: wrapper.querySelector('[data-requirement="special"]')
        };

        input.addEventListener('input', function() {
            const password = this.value;
            
            // Length check
            if (password.length >= 8) {
                requirements.length.classList.add('met');
                requirements.length.querySelector('.requirement-icon').textContent = '✓';
            } else {
                requirements.length.classList.remove('met');
                requirements.length.querySelector('.requirement-icon').textContent = '○';
            }
            
            // Lowercase check
            if (password.match(/[a-z]+/)) {
                requirements.lowercase.classList.add('met');
                requirements.lowercase.querySelector('.requirement-icon').textContent = '✓';
            } else {
                requirements.lowercase.classList.remove('met');
                requirements.lowercase.querySelector('.requirement-icon').textContent = '○';
            }
            
            // Uppercase check
            if (password.match(/[A-Z]+/)) {
                requirements.uppercase.classList.add('met');
                requirements.uppercase.querySelector('.requirement-icon').textContent = '✓';
            } else {
                requirements.uppercase.classList.remove('met');
                requirements.uppercase.querySelector('.requirement-icon').textContent = '○';
            }
            
            // Number check
            if (password.match(/[0-9]+/)) {
                requirements.number.classList.add('met');
                requirements.number.querySelector('.requirement-icon').textContent = '✓';
            } else {
                requirements.number.classList.remove('met');
                requirements.number.querySelector('.requirement-icon').textContent = '○';
            }
            
            // Special character check
            if (password.match(/[$@#&!]+/)) {
                requirements.special.classList.add('met');
                requirements.special.querySelector('.requirement-icon').textContent = '✓';
            } else {
                requirements.special.classList.remove('met');
                requirements.special.querySelector('.requirement-icon').textContent = '○';
            }
        });
    }

    function validateForm(wrapper) {
        let isValid = true;
        
        const oldPassword = wrapper.querySelector('#id_old_password');
        const newPassword1 = wrapper.querySelector('#id_new_password1');
        const newPassword2 = wrapper.querySelector('#id_new_password2');
        
        if (!oldPassword.value) {
            showFieldError(oldPassword, 'Old password is required', wrapper);
            isValid = false;
        }
        
        if (!newPassword1.value) {
            showFieldError(newPassword1, 'New password is required', wrapper);
            isValid = false;
        }
        
        if (newPassword1.value !== newPassword2.value) {
            showFieldError(newPassword2, 'Passwords do not match', wrapper);
            isValid = false;
        }
        
        return isValid;
    }

    function showFieldError(field, message, wrapper) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'password-change-wrapper__error-text';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
            field.classList.remove('error');
        }, 3000);
    }
})();