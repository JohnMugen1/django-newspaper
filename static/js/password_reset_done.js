// ALL CODE IS STRICTLY SCOPED TO password-reset-done-wrapper
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordResetDone);
    } else {
        initPasswordResetDone();
    }

    function initPasswordResetDone() {
        const wrapper = document.querySelector('.password-reset-done-wrapper');
        if (!wrapper) return;

        // Flower petals animation
        const petalsContainer = document.getElementById('passwordResetDoneFlowerPetals');
        if (petalsContainer) {
            createPetals(petalsContainer);
        }

        // Add celebration effects
        celebrateEmailSent(wrapper);

        // Start countdown timer for visual effect
        startCountdown(wrapper);

        // Add hover animations to info items
        setupHoverEffects(wrapper);

        // Simulate email checking animation
        simulateEmailCheck(wrapper);
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
        petal.className = 'password-reset-done-wrapper__petal';
        
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

    function celebrateEmailSent(wrapper) {
        // Animate paper plane
        const paperPlane = wrapper.querySelector('.password-reset-done-wrapper__paper-plane');
        if (paperPlane) {
            setInterval(() => {
                paperPlane.style.animation = 'none';
                paperPlane.offsetHeight; // Trigger reflow
                paperPlane.style.animation = 'password-reset-done-wrapper__fly 2s ease-in-out infinite';
            }, 4000);
        }

        // Add success glow to message card
        const messageCard = wrapper.querySelector('.password-reset-done-wrapper__message-card');
        if (messageCard) {
            messageCard.style.transition = 'box-shadow 0.3s ease';
            
            setInterval(() => {
                messageCard.style.boxShadow = '0 0 20px rgba(66, 153, 225, 0.3)';
                setTimeout(() => {
                    messageCard.style.boxShadow = 'none';
                }, 1000);
            }, 3000);
        }
    }

    function startCountdown(wrapper) {
        // Add a subtle countdown timer for email arrival expectation
        const noteElement = wrapper.querySelector('.password-reset-done-wrapper__note-text');
        if (noteElement) {
            let minutes = 5;
            const countdownInterval = setInterval(() => {
                if (minutes > 0) {
                    minutes--;
                } else {
                    clearInterval(countdownInterval);
                }
            }, 60000); // Update every minute
        }
    }

    function setupHoverEffects(wrapper) {
        // Add hover effects to info items
        wrapper.querySelectorAll('.password-reset-done-wrapper__info-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#edf2f7';
                this.style.padding = '0.5rem';
                this.style.borderRadius = '8px';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.padding = '0';
            });
        });

        // Add click effect to buttons
        wrapper.querySelectorAll('.password-reset-done-wrapper__btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });
    }

    function createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        ripple.className = 'password-reset-done-wrapper__ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size/2) + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function simulateEmailCheck(wrapper) {
        // Simulate checking email with progress indicator
        const emailNote = wrapper.querySelector('.password-reset-done-wrapper__email-note');
        
        if (emailNote) {
            // Add a subtle progress indicator
            const progress = document.createElement('div');
            progress.className = 'password-reset-done-wrapper__email-progress';
            progress.style.height = '3px';
            progress.style.background = 'linear-gradient(90deg, #48bb78, #4299e1)';
            progress.style.width = '0%';
            progress.style.transition = 'width 5s linear';
            
            emailNote.appendChild(progress);
            
            // Animate progress
            setTimeout(() => {
                progress.style.width = '100%';
            }, 100);
            
            // Reset after animation
            setTimeout(() => {
                progress.style.width = '0%';
            }, 5100);
        }
    }

    // Track user interactions
    document.querySelectorAll('.password-reset-done-wrapper__btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnType = this.classList.contains('password-reset-done-wrapper__btn--primary') ? 'login' : 'try-again';
            console.log(`User clicked ${btnType} button on email sent page`);
        });
    });

    // Add smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
})();

// Add dynamic styles for ripple effect
const style = document.createElement('style');
style.textContent = `
    .password-reset-done-wrapper__btn {
        position: relative;
        overflow: hidden;
    }
    
    .password-reset-done-wrapper__ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: password-reset-done-wrapper__ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes password-reset-done-wrapper__ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .password-reset-done-wrapper__email-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 0 10px 10px;
    }
    
    .password-reset-done-wrapper__email-note {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);