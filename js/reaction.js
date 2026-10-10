// js/reaction.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const gameArea = document.getElementById('gameArea');
    const mainText = document.getElementById('mainText');
    const subText = document.getElementById('subText');
    const gameIcon = document.getElementById('gameIcon');
    const resultBox = document.getElementById('resultBox');
    const reactionTimeDisplay = document.getElementById('reactionTimeDisplay');
    const resultMessage = document.getElementById('resultMessage');
    const pbDisplay = document.getElementById('pb-display');

    // --- State Constants ---
    const STATE_IDLE = 'idle';
    const STATE_ON_MARKS = 'on_marks';
    const STATE_SET = 'set';
    const STATE_BANG = 'bang';
    const STATE_RESULT = 'result';
    const STATE_FALSE_START = 'false_start';

    // --- Variables ---
    let currentState = STATE_IDLE;
    let timeoutOnMarks = null;
    let timeoutSet = null;
    let startTime = 0;
    let targetBangTime = 0; // For tracking early false starts

    // --- Sound Management ---
    let soundEnabled = true;
    let audioCtx = null;
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const iconSoundOff = document.getElementById('icon-sound-off');

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the game background click
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                iconSoundOn.classList.remove('hidden');
                iconSoundOff.classList.add('hidden');
            } else {
                iconSoundOn.classList.add('hidden');
                iconSoundOff.classList.remove('hidden');
            }
        });
    }

    function playTone(frequency, type, duration) {
        if (!soundEnabled) return;
        
        // Initialize AudioContext on first user interaction
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        // Envelope to avoid clicking sounds
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        oscillator.stop(audioCtx.currentTime + duration);
    }
    
    // Load PB
    let personalBest = parseFloat(localStorage.getItem('track_arcade_reaction_pb')) || Infinity;
    if (personalBest !== Infinity) {
        pbDisplay.textContent = personalBest.toFixed(3) + 's';
    }

    // --- State Management ---
    
    function resetToIdle() {
        currentState = STATE_IDLE;
        
        clearTimeout(timeoutOnMarks);
        clearTimeout(timeoutSet);
        
        // UI Reset
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors duration-200 game-bg-blue';
        gameIcon.classList.remove('hidden');
        resultBox.classList.add('hidden');
        
        mainText.textContent = 'Tocca per iniziare';
        subText.textContent = 'Mettiti sui blocchi di partenza.';
        mainText.classList.remove('hidden');
        subText.classList.remove('hidden');
    }

    function startOnMarks() {
        currentState = STATE_ON_MARKS;
        
        // UI Update
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors duration-200 game-bg-orange';
        gameIcon.classList.add('hidden');
        
        mainText.textContent = 'Ai vostri posti...';
        subText.textContent = 'Attendi il "Pronti"';
        playTone(300, 'sine', 0.4); // Bip basso
        
        // Transition to SET after 2 seconds
        timeoutOnMarks = setTimeout(() => {
            startSet();
        }, 2000);
    }

    function startSet() {
        currentState = STATE_SET;
        
        // UI Update
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors duration-100 game-bg-red';
        
        mainText.textContent = 'Pronti...';
        subText.textContent = 'Non muoverti!';
        
        // Random timeout between 1.5s and 2.5s (official athletics rules style)
        const randomDelay = Math.floor(Math.random() * 1000) + 1500;
        targetBangTime = performance.now() + randomDelay;
        
        playTone(400, 'sine', 0.4); // Bip medio
        
        timeoutSet = setTimeout(() => {
            startBang();
        }, randomDelay);
    }

    function startBang() {
        currentState = STATE_BANG;
        
        // UI Update
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer game-bg-green';
        
        mainText.textContent = 'PARTI!';
        subText.classList.add('hidden');
        playTone(800, 'square', 0.3); // BANG (Bip alto e tagliente)
        
        // Record precise start time
        startTime = performance.now();
    }

    function showResult(reactionTimeMs) {
        currentState = STATE_RESULT;
        
        const timeInSeconds = (reactionTimeMs / 1000).toFixed(3);
        
        // Check new PB
        let isNewPb = false;
        if (timeInSeconds < personalBest) {
            personalBest = timeInSeconds;
            localStorage.setItem('track_arcade_reaction_pb', personalBest);
            pbDisplay.textContent = personalBest + 's';
            isNewPb = true;
        }
        
        // UI Update
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer game-bg-blue';
        mainText.classList.add('hidden');
        
        resultBox.classList.remove('hidden');
        reactionTimeDisplay.innerHTML = `${timeInSeconds}<span class="text-2xl md:text-4xl">s</span>`;
        
        if (isNewPb) {
            resultMessage.textContent = '🔥 NUOVO RECORD PERSONALE! 🔥';
            resultMessage.className = 'mt-4 text-xl font-bold bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full inline-block backdrop-blur-sm animate-bounce';
        } else if (reactionTimeMs < 130) {
            resultMessage.textContent = 'Velocità impressionante! 🚀';
            resultMessage.className = 'mt-4 text-xl font-bold bg-white/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm';
        } else if (reactionTimeMs < 160) {
            resultMessage.textContent = 'Ottima reazione! ⚡';
            resultMessage.className = 'mt-4 text-xl font-bold bg-white/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm';
        } else {
            resultMessage.textContent = 'Puoi fare meglio! 🐢';
            resultMessage.className = 'mt-4 text-xl font-bold bg-white/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm';
        }
    }

    function showFalseStart(reason = 'Movimento anticipato', timeDiffMs = 0) {
        currentState = STATE_FALSE_START;
        
        clearTimeout(timeoutOnMarks);
        clearTimeout(timeoutSet);
        
        // UI Update
        gameArea.className = 'flex-grow flex flex-col items-center justify-center w-full h-full cursor-pointer game-bg-darkred shake-animation';
        gameIcon.classList.add('hidden');
        resultBox.classList.add('hidden');
        
        mainText.classList.remove('hidden');
        subText.classList.remove('hidden');
        
        mainText.textContent = 'Falsa Partenza!';
        
        if (reason === '<100ms') {
            subText.textContent = `Squalificato: Hai toccato in soli ${timeDiffMs.toFixed(0)}ms. Inferiore ai 100ms consentiti.`;
        } else if (reason === 'set_early' && timeDiffMs > 0) {
            subText.textContent = `Squalificato: Hai anticipato lo sparo di ${(timeDiffMs/1000).toFixed(3)}s!`;
        } else {
            subText.textContent = 'Squalificato: Ti sei mosso troppo presto.';
        }
        
        // Allow resetting after a small delay to avoid accidental immediate reset
        setTimeout(() => {
            subText.innerHTML += '<br><br><span class="font-bold opacity-70">Tocca per riprovare</span>';
        }, 500);
    }

    // --- Event Listeners ---
    
    // Support both mouse click and touch for faster response on mobile
    const handleAction = (e) => {
        // Prevent default behavior to avoid double firing on touch devices (touch + click)
        if (e.type === 'touchstart') {
            e.preventDefault();
        }

        switch (currentState) {
            case STATE_IDLE:
                startOnMarks();
                break;
                
            case STATE_ON_MARKS:
                showFalseStart('movimento');
                break;
                
            case STATE_SET:
                const earlyDiff = targetBangTime - performance.now();
                showFalseStart('set_early', earlyDiff);
                break;
                
            case STATE_BANG:
                const reactionTimeMs = performance.now() - startTime;
                
                // Rule 162.5 World Athletics: Reaction time < 100ms is a false start
                if (reactionTimeMs < 100) {
                    showFalseStart('<100ms', reactionTimeMs);
                } else {
                    showResult(reactionTimeMs);
                }
                break;
                
            case STATE_RESULT:
            case STATE_FALSE_START:
                resetToIdle();
                break;
        }
    };

    gameArea.addEventListener('mousedown', handleAction);
    gameArea.addEventListener('touchstart', handleAction, { passive: false });
    
    // Initialize
    resetToIdle();
});
