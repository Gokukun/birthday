document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AUDIO AUTOPLAY FIX (CRITICAL) ---
    // Get the audio element using the ID we added in index.html
    const audio = document.getElementById('bdayAudio');

    // Function to start audio on the first click/touch
    function startAudio() {
        // Attempt to play the audio. This MUST be inside a user event handler.
        audio.play().catch(error => {
            // This catches the error if the browser still blocks it, which is rare after a click.
            console.log('Audio playback prevented:', error);
        });
        
        // Remove the listeners after the first successful attempt 
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
    }

    // Attach the startAudio function to the first user click/touch event on the entire page
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio); 
    
    // --- 2. CONFETTI ANIMATION LOGIC ---
    const confettiContainer = document.getElementById('confetti-container');

    // Function to create a single confetti particle
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random starting position (mostly near the top center for a blast effect)
        const startX = Math.random() * window.innerWidth;
        const startY = -Math.random() * 50; 

        // Random ending position (fall off screen)
        const endX = Math.random() * window.innerWidth * 2 - window.innerWidth; 
        const endY = window.innerHeight * (0.8 + Math.random() * 0.5); 

        // Random rotation
        const rotationEnd = Math.random() * 720; 

        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;

        // Pass variables to CSS animation
        confetti.style.setProperty('--end-x', `${endX}px`);
        confetti.style.setProperty('--end-y', `${endY}px`);
        confetti.style.setProperty('--rotation-end', `${rotationEnd}deg`);

        // Random animation duration and delay for variety
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`; 
        confetti.style.animationDelay = `${Math.random() * 1.5}s`; 

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation to prevent DOM clutter
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Function to launch multiple confetti particles
    function launchConfettiBlast() {
        const numberOfConfetti = 80; 
        for (let i = 0; i < numberOfConfetti; i++) {
            createConfetti();
        }
    }

    // Launch confetti automatically after a short delay on page load (0.5 seconds)
    setTimeout(launchConfettiBlast, 500); 
});