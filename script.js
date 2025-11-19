document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AUDIO UNMUTE FIX ---
    const audio = document.getElementById('bdayAudio');
    const unmutePrompt = document.getElementById('unmute-prompt');

    if (unmutePrompt) {
        // Function to unmute the audio on click
        function unmuteAudio() {
            if (audio) {
                // Unmute the audio element
                audio.muted = false; 
                // In some browsers, we might need to call play() again, just in case
                audio.play(); 
            }
            // Hide the prompt once the music is started
            unmutePrompt.style.display = 'none'; 

            // Remove the listeners
            unmutePrompt.removeEventListener('click', unmuteAudio);
            unmutePrompt.removeEventListener('touchstart', unmuteAudio);
        }

        // Attach the function to the prompt button for both click and touch
        unmutePrompt.addEventListener('click', unmuteAudio);
        unmutePrompt.addEventListener('touchstart', unmuteAudio);
    }
    
    // --- 2. CONFETTI ANIMATION LOGIC ---
    const confettiContainer = document.getElementById('confetti-container');

    // Function to create a single confetti particle (rest of confetti logic remains the same)
    function createConfetti() {
        // ... (existing confetti code) ...
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