// Get DOM elements
const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

// State management
let isOpen = false;

// Open envelope animation
function openEnvelope() {
    if (isOpen) return;

    isOpen = true;

    // Add opened class to envelope
    envelope.classList.add('opened');

    // Show letter with delay
    setTimeout(() => {
        letter.classList.add('visible');
    }, 300);

    // Update button states
    openBtn.classList.add('disabled');
    closeBtn.classList.remove('disabled');

    // Confetti effect (optional bonus!)
    createConfetti();
}

// Close envelope animation
function closeEnvelope() {
    if (!isOpen) return;

    isOpen = false;

    // Hide letter
    letter.classList.remove('visible');

    // Remove opened class from envelope after letter is hidden
    setTimeout(() => {
        envelope.classList.remove('opened');
    }, 300);

    // Update button states
    openBtn.classList.remove('disabled');
    closeBtn.classList.add('disabled');
}

// Event listeners
openBtn.addEventListener('click', openEnvelope);
closeBtn.addEventListener('click', closeEnvelope);

// Bonus: Confetti particles on open
function createConfetti() {
    const colors = ['#ff6b6b', '#ff9999', '#ffb3b3', '#ffd89b', '#f8a5d9'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';

        // Random position
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
        const startY = window.innerHeight / 2 - 50;

        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';

        document.body.appendChild(confetti);

        // Animate confetti falling
        const duration = 2000 + Math.random() * 1000;
        const startTime = Date.now();

        function animateConfetti() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress >= 1) {
                confetti.remove();
                return;
            }

            const vx = (Math.random() - 0.5) * 8;
            const vy = 3 + Math.random() * 3;
            const rotation = progress * 360;

            confetti.style.left = (startX + vx * elapsed / 100) + 'px';
            confetti.style.top = (startY + vy * elapsed / 100) + 'px';
            confetti.style.opacity = 1 - progress;
            confetti.style.transform = `rotate(${rotation}deg)`;

            requestAnimationFrame(animateConfetti);
        }

        animateConfetti();
    }
}

// Initialize button states
closeBtn.classList.add('disabled');

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isOpen) {
        openEnvelope();
    } else if (e.key === 'Escape' && isOpen) {
        closeEnvelope();
    }
});

// Optional: Click on envelope to open
envelope.addEventListener('click', () => {
    if (!isOpen) {
        openEnvelope();
    }
});