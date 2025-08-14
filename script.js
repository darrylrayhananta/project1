// Anniversary date - ganti dengan tanggal anniversary yang sesuai
const anniversaryDate = new Date('2024-08-14'); // Format: YYYY-MM-DD

// Function to calculate time difference
function calculateTimeDifference() {
    const now = new Date();
    const timeDiff = now - anniversaryDate;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor(timeDiff / (1000 * 60));
    
    return { days, hours, minutes };
}

// Update counters
function updateCounters() {
    const { days, hours, minutes } = calculateTimeDifference();
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toLocaleString();
    document.getElementById('minutes').textContent = minutes.toLocaleString();
}

// Animate counter numbers
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize counters with animation
function initializeCounters() {
    const { days, hours, minutes } = calculateTimeDifference();
    
    setTimeout(() => {
        animateCounter(document.getElementById('days'), 0, days, 2000);
    }, 500);
    
    setTimeout(() => {
        animateCounter(document.getElementById('hours'), 0, hours, 2500);
    }, 1000);
    
    setTimeout(() => {
        animateCounter(document.getElementById('minutes'), 0, minutes, 3000);
    }, 1500);
}

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for animations
const observeElements = () => {
    // Hanya apply animasi pada memory cards dan promise items, tidak pada message text
    const elements = document.querySelectorAll('.memory-card, .promise-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 6s linear';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// CSS for floating hearts animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // Only create sparkle 10% of the time
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '12px';
        sparkle.style.zIndex = '999';
        sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// CSS for sparkle effect
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Music Player functionality
let isPlaying = false;
let audio = null;

function initializeMusicPlayer() {
    audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (!audio || !playBtn || !volumeSlider) return;
    
    // Set initial volume
    audio.volume = 0.5;
    
    // Play/Pause functionality
    playBtn.addEventListener('click', toggleMusic);
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
    
    // Audio events
    audio.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
    });
    
    audio.addEventListener('error', (e) => {
        console.log('Audio loading error:', e);
        playBtn.textContent = '🚫';
        playBtn.disabled = true;
    });
}

function toggleMusic() {
    const playBtn = document.getElementById('playBtn');
    
    if (!audio) return;
    
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '🎵';
        playBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        // Many browsers require user interaction before playing audio
        audio.play().then(() => {
            playBtn.textContent = '⏸️';
            playBtn.classList.add('playing');
            isPlaying = true;
        }).catch((error) => {
            console.log('Audio play failed:', error);
            // Show a message to user
            showMusicMessage();
        });
    }
}

function showMusicMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: fixed; top: 80px; right: 20px; background: rgba(255, 107, 157, 0.9); color: white; padding: 10px 15px; border-radius: 15px; z-index: 1001; font-size: 14px; max-width: 200px;">
            Click to enable music 🎵
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCounters();
    observeElements();
    initializeMusicPlayer();
    
    // Update counters every minute
    setInterval(updateCounters, 60000);
    
    // Add a special welcome message
    setTimeout(() => {
        console.log('💕 Website anniversary dibuat dengan cinta untuk yang tersayang 💕');
    }, 2000);
});

// Add special effects on scroll
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const currentScrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    // Parallax effect untuk hero section saja, dengan batasan
    if (hero && currentScrollY < window.innerHeight) {
        const scrolled = currentScrollY * 0.3; // Kurangi intensitas parallax
        hero.style.transform = `translateY(${scrolled}px)`;
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Easter egg: Special message when user clicks the heart in footer
document.addEventListener('DOMContentLoaded', () => {
    const heartAnimation = document.querySelector('.heart-animation');
    let clickCount = 0;
    
    if (heartAnimation) {
        heartAnimation.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Create a special message overlay
                const overlay = document.createElement('div');
                overlay.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 107, 157, 0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; text-align: center; font-family: 'Dancing Script', cursive;">
                        <h1 style="font-size: 4rem; margin-bottom: 20px;">Surprise! 💕</h1>
                        <p style="font-size: 2rem; margin-bottom: 30px;">Kamu menemukan pesan rahasia!</p>
                        <p style="font-size: 1.5rem; max-width: 600px; line-height: 1.6;">Aku mencintaimu lebih dari bintang-bintang di langit, lebih dari ombak di lautan, dan lebih dari apapun di dunia ini. Terima kasih telah menjadi alasan aku tersenyum setiap hari.</p>
                        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 30px; padding: 15px 30px; background: white; color: #ff6b9d; border: none; border-radius: 25px; font-size: 1.2rem; cursor: pointer; font-weight: 600;">Close ❤️</button>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                clickCount = 0; // Reset counter
            }
        });
    }
});
