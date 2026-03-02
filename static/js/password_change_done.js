// ALL CODE IS STRICTLY SCOPED TO password-change-done-wrapper
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordChangeDone);
    } else {
        initPasswordChangeDone();
    }

    function initPasswordChangeDone() {
        const wrapper = document.querySelector('.password-change-done-wrapper');
        if (!wrapper) return;

        // Flower petals animation
        const petalsContainer = document.getElementById('passwordChangeDoneFlowerPetals');
        if (petalsContainer) {
            createPetals(petalsContainer);
        }

        // Optional confetti animation for celebration
        createConfetti(wrapper);

        // Add celebration effects
        celebrateSuccess(wrapper);

        // Auto redirect countdown (optional feature)
        // setupAutoRedirect(wrapper);
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
        petal.className = 'password-change-done-wrapper__petal';
        
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

    function createConfetti(wrapper) {
        const confettiCount = 50;
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffcccb'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'password-change-done-wrapper__confetti';
            
            // Random size
            const size = Math.random() * 8 + 4;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Random starting position
            confetti.style.left = Math.random() * 100 + '%';
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random shape (circle or square)
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            confetti.style.animationDuration = duration + 's';
            
            // Random delay
            confetti.style.animationDelay = Math.random() * -20 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }

    function celebrateSuccess(wrapper) {
        // Play success sound (optional - disabled by default)
        // const audio = new Audio('{% static "sounds/success.mp3" %}');
        // audio.volume = 0.3;
        // audio.play().catch(e => console.log('Audio playback failed:', e));

        // Add glow effect to success card
        const successCard = wrapper.querySelector('.password-change-done-wrapper__success-card');
        if (successCard) {
            successCard.style.transition = 'box-shadow 0.3s ease';
            successCard.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.3)';
            
            setTimeout(() => {
                successCard.style.boxShadow = 'none';
            }, 2000);
        }

        // Animate checkmark
        const checkmark = wrapper.querySelector('.password-change-done-wrapper__checkmark');
        if (checkmark) {
            checkmark.style.transform = 'scale(1.1)';
            setTimeout(() => {
                checkmark.style.transform = 'scale(1)';
            }, 500);
        }

        // Add success message animation
        const title = wrapper.querySelector('.password-change-done-wrapper__title');
        if (title) {
            title.style.animation = 'none';
            title.offsetHeight; // Trigger reflow
            title.style.animation = 'password-change-done-wrapper__bounce 1s ease-in-out';
        }
    }

    function setupAutoRedirect(wrapper) {
        // Optional: Auto redirect to home after 5 seconds
        let secondsLeft = 5;
        const redirectMsg = document.createElement('div');
        redirectMsg.className = 'password-change-done-wrapper__redirect-msg';
        redirectMsg.style.textAlign = 'center';
        redirectMsg.style.marginTop = '1rem';
        redirectMsg.style.color = '#718096';
        redirectMsg.style.fontSize = '0.9rem';
        redirectMsg.style.fontFamily = 'Inter, sans-serif';
        
        const helpSection = wrapper.querySelector('.password-change-done-wrapper__help-section');
        if (helpSection) {
            helpSection.appendChild(redirectMsg);
            
            const interval = setInterval(() => {
                secondsLeft--;
                if (secondsLeft > 0) {
                    redirectMsg.textContent = `Redirecting to home in ${secondsLeft} seconds...`;
                } else {
                    clearInterval(interval);
                    window.location.href = '/';
                }
            }, 1000);
        }
    }

    // Track user interaction for analytics (optional)
    document.querySelectorAll('.password-change-done-wrapper__btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnType = this.classList.contains('password-change-done-wrapper__btn--primary') ? 'home' : 'login';
            console.log(`User clicked ${btnType} button after password change`);
            // Send to analytics if needed
        });
    });

    // Add hover effect to reminder items
    document.querySelectorAll('.password-change-done-wrapper__reminder-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
})();

// Add dynamic style for redirect message if needed
const style = document.createElement('style');
style.textContent = `
    .password-change-done-wrapper__redirect-msg {
        text-align: center;
        margin-top: 1rem;
        color: #718096;
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
        animation: password-change-done-wrapper__fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);