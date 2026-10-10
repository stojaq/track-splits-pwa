// js/throw.js

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const uiOverlay = document.getElementById('uiOverlay');
    const resultOverlay = document.getElementById('resultOverlay');
    const startBtn = document.getElementById('startBtn');
    const retryBtn = document.getElementById('retryBtn');
    
    const powerCursor = document.getElementById('powerCursor');
    const powerContainer = document.getElementById('powerContainer');
    const angleContainer = document.getElementById('angleContainer');
    const hudElements = document.getElementById('hudElements');
    
    const worldContainer = document.getElementById('worldContainer');
    const distanceMarkers = document.getElementById('distanceMarkers');
    const athlete = document.getElementById('athlete');
    const javelin = document.getElementById('javelin');
    
    const powerValDisplay = document.getElementById('powerValDisplay');
    const statusText = document.getElementById('statusText');
    const pbDisplay = document.getElementById('pb-display');
    
    const resultScore = document.getElementById('resultScore');
    const resultDesc = document.getElementById('resultDesc');
    const resPower = document.getElementById('resPower');
    const resAngle = document.getElementById('resAngle');

    // --- Sound Management ---
    let soundEnabled = true;
    let audioCtx = null;
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const iconSoundOff = document.getElementById('icon-sound-off');

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

    function playTone(type) {
        if (!soundEnabled) return;
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        const now = audioCtx.currentTime;
        gain.gain.setValueAtTime(0.5, now);

        if (type === 'tick') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.stop(now + 0.1);
        } else if (type === 'throw') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 1.0); // Longer swoosh
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
            osc.stop(now + 1.5);
        } else if (type === 'thud') { // Lands in grass
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.stop(now + 0.2);
        } else if (type === 'win') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(800, now + 0.1);
            osc.frequency.setValueAtTime(1200, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.stop(now + 0.6);
        }
    }

    // Costanti Fisiche/Mondo
    const OPTIMAL_ANGLE = 38;
    const MAX_DISTANCE = 100.0; // metri
    const PX_PER_METER = 40; 
    const FOUL_LINE_X = 350; // Posizione assoluta della linea di fallo nel worldContainer
    const JAVELIN_START_X = 220; // Hand X 
    const JAVELIN_START_Y = 160; // Hand Y from bottom of world

    let isRunning = false;
    let phase = 0; // 0: Idle, 1: Power, 2: Angle, 3: Flight, 4: Result
    let animationId = null;
    let startTime = 0;
    
    let powerVal = 0; // 0 to 100
    let angleVal = 0; // 0 to 90
    
    // Flight vars
    let flightDuration = 0;
    let finalDistancePx = 0;
    let maxHeightPx = 0;

    let pb = parseFloat(localStorage.getItem('track_arcade_throw_pb')) || 0;
    if (pb > 0) pbDisplay.textContent = pb.toFixed(2);

    // Setup Field Markers
    function setupField() {
        distanceMarkers.innerHTML = '';
        // Create lines every 10 meters up to 120m
        for(let m = 10; m <= 120; m+=10) {
            const pxX = FOUL_LINE_X + (m * PX_PER_METER);
            const line = document.createElement('div');
            line.className = 'absolute top-0 w-1 h-full bg-white/40 shadow-sm';
            line.style.left = `${pxX}px`;
            
            const label = document.createElement('div');
            label.className = 'absolute top-2 -translate-x-1/2 text-white/80 font-bold text-xl drop-shadow-md';
            label.style.left = `${pxX}px`;
            label.textContent = `${m}m`;
            
            distanceMarkers.appendChild(line);
            distanceMarkers.appendChild(label);
        }
    }
    setupField();

    function resetGame() {
        isRunning = false;
        cancelAnimationFrame(animationId);
        phase = 0;
        powerVal = 0;
        angleVal = 10;
        
        worldContainer.style.transform = `translateX(0px)`;
        
        powerCursor.style.left = `0%`;
        
        // Reset Javelin Position (in hand)
        javelin.style.bottom = `${JAVELIN_START_Y}px`;
        javelin.style.left = `${JAVELIN_START_X}px`;
        javelin.style.transform = `rotate(10deg)`;
        
        athlete.classList.remove('opacity-0');
        hudElements.classList.remove('opacity-0');
        
        powerValDisplay.textContent = '0%';
        powerValDisplay.classList.add('text-gray-300');
        powerValDisplay.classList.remove('text-white', 'scale-125');
        
        powerContainer.classList.remove('opacity-50');
        angleContainer.classList.add('opacity-50');
        
        statusText.textContent = '';
        
        uiOverlay.classList.remove('hidden');
        resultOverlay.classList.add('hidden');
    }

    function startGame() {
        uiOverlay.classList.add('hidden');
        resultOverlay.classList.add('hidden');
        
        // Reset position for sure
        javelin.style.bottom = `${JAVELIN_START_Y}px`;
        javelin.style.left = `${JAVELIN_START_X}px`;
        worldContainer.style.transform = `translateX(0px)`;

        phase = 1;
        statusText.textContent = 'TAP: FERMA FORZA';
        
        isRunning = true;
        startTime = performance.now();
        gameLoop(startTime);
    }

    function gameLoop(time) {
        if (!isRunning) return;
        const elapsed = (time - startTime) / 1000;
        
        if (phase === 1) {
            // Oscilla Forza
            const sine = Math.sin(elapsed * Math.PI * 4); 
            powerVal = ((sine + 1) / 2) * 100;
            
            powerCursor.style.left = `${powerVal}%`;
            powerValDisplay.textContent = `${Math.round(powerVal)}%`;
            
            const pullBack = (powerVal / 100) * -20; 
            athlete.style.transform = `translateX(${pullBack}px)`;
            
        } else if (phase === 2) {
            // Oscilla Angolo
            const sine = Math.sin(elapsed * Math.PI * 3);
            angleVal = 45 + (sine * 45); 
            
            const visualRotation = -angleVal; 
            javelin.style.transform = `rotate(${visualRotation}deg)`;
            
        } else if (phase === 3) {
            // Fase di Volo Parabolica
            // progress va da 0 a 1
            const progress = Math.min(elapsed / flightDuration, 1.0);
            
            // X lineare
            const currentX = JAVELIN_START_X + (progress * finalDistancePx);
            
            // Y Parabolica: Y = 4 * H * (p - p^2)
            const currentY = JAVELIN_START_Y + (4 * maxHeightPx * (progress - progress * progress));
            
            // Inclinazione: derivata della parabola o mappatura semplice
            // Parte puntato verso l'alto (es. -38deg), arriva puntato verso il basso (es. +45deg)
            // Se angolo è brutto (es. 0 o 90), cade male.
            let currentRot = 0;
            if (angleVal > 70) {
                // Cade dritto di punta
                currentRot = -angleVal + (progress * 160);
            } else {
                currentRot = -angleVal + (progress * (angleVal * 2.2));
            }

            // Applica posizione al giavellotto
            javelin.style.left = `${currentX}px`;
            javelin.style.bottom = `${currentY}px`;
            javelin.style.transform = `rotate(${currentRot}deg)`;
            
            // Applica telecamera al mondo
            // Vogliamo mantenere il giavellotto circa al 30% dello schermo (salvo a inizio e fine)
            let camX = currentX - (window.innerWidth * 0.3);
            if (camX < 0) camX = 0;
            worldContainer.style.transform = `translateX(${-camX}px)`;
            
            if (progress >= 1.0) {
                // Atterrato!
                phase = 4;
                playTone('thud');
                
                // Javelin sticks in ground (adjust slight depth)
                javelin.style.bottom = '20px'; // sunk in grass
                
                setTimeout(() => {
                    calculateAndShowResult();
                }, 1500);
            }
        }

        if (phase < 4) {
            animationId = requestAnimationFrame(gameLoop);
        }
    }

    function handleTap(e) {
        if (!isRunning) return;
        if (e.type === 'touchstart') e.preventDefault();

        if (phase === 1) {
            // Stop Power
            phase = 2;
            playTone('tick');
            
            powerValDisplay.classList.remove('text-gray-300');
            powerValDisplay.classList.add('text-white', 'scale-125');
            powerContainer.classList.add('opacity-50');
            angleContainer.classList.remove('opacity-50');
            
            statusText.textContent = 'TAP: FERMA ANGOLO';
            startTime = performance.now();
            
        } else if (phase === 2) {
            // Throw!
            phase = 3;
            
            angleContainer.classList.add('opacity-50');
            statusText.textContent = '';
            hudElements.classList.add('opacity-0'); // Hide HUD during flight
            
            // Reset athlete pull-back
            athlete.style.transform = `translateX(0px)`;
            
            // Audio
            if (powerVal > 20) playTone('throw');
            
            // Pre-calculate flight path
            const baseDistanceMeters = (powerVal / 100) * MAX_DISTANCE;
            const diffAngle = Math.abs(angleVal - OPTIMAL_ANGLE);
            let efficiency = 1 - (diffAngle * 0.025);
            if (efficiency < 0) efficiency = 0;
            
            const finalDistanceMeters = baseDistanceMeters * efficiency;
            // The Javelin must land exactly at finalDistanceMeters from FOUL_LINE_X
            finalDistancePx = (FOUL_LINE_X + (finalDistanceMeters * PX_PER_METER)) - JAVELIN_START_X;
            if (finalDistancePx < 50) finalDistancePx = 50; // Minimum flop
            
            // Altezza max basata sull'angolo (angolo alto = picco alto) e potenza
            maxHeightPx = (powerVal * 3) * (angleVal / 45); 
            
            // Durata in base alla distanza e all'altezza (Hangtime)
            flightDuration = 1.0 + (finalDistanceMeters / 100) * 1.5 + (angleVal / 90) * 1.0;
            
            startTime = performance.now();
        }
    }

    function calculateAndShowResult() {
        const baseDistance = (powerVal / 100) * MAX_DISTANCE;
        const diffAngle = Math.abs(angleVal - OPTIMAL_ANGLE);
        let efficiency = 1 - (diffAngle * 0.025);
        if (efficiency < 0) efficiency = 0;
        
        const dist = baseDistance * efficiency;
        
        resultOverlay.classList.remove('hidden');
        
        resPower.textContent = `${Math.round(powerVal)}%`;
        resAngle.textContent = `${Math.round(angleVal)}°`;
        
        resultScore.innerHTML = `${dist.toFixed(2)}<span class="text-2xl">m</span>`;
        
        if (dist > 85) {
            playTone('win');
            resultDesc.textContent = 'LANCIO MONDIALE! Hai disintegrato il record.';
            resultScore.className = 'text-6xl font-mono font-bold my-4 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]';
        } else if (dist > 70) {
            playTone('win');
            resultDesc.textContent = 'Lancio eccellente. Tecnica quasi perfetta.';
            resultScore.className = 'text-6xl font-mono font-bold my-4 text-green-400';
        } else if (dist > 40) {
            resultDesc.textContent = 'Buon lancio, ma puoi migliorare potenza e angolo.';
            resultScore.className = 'text-6xl font-mono font-bold my-4 text-white';
        } else {
            resultDesc.textContent = 'Lancio debole o fuori asse. Concentrati!';
            resultScore.className = 'text-6xl font-mono font-bold my-4 text-gray-400';
        }

        if (dist > pb) {
            pb = dist;
            localStorage.setItem('track_arcade_throw_pb', pb);
            pbDisplay.textContent = pb.toFixed(2);
            resultDesc.innerHTML += '<br><span class="text-yellow-400 font-bold mt-2 block">🔥 NUOVO RECORD!</span>';
        }
    }

    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetGame(); // Ensure clean slate
        startGame();
    });
    retryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetGame();
        startGame();
    });
    
    gameArea.addEventListener('mousedown', handleTap);
    gameArea.addEventListener('touchstart', handleTap, { passive: false });
    
    uiOverlay.addEventListener('mousedown', e => e.stopPropagation());
    uiOverlay.addEventListener('touchstart', e => e.stopPropagation(), {passive: false});
    resultOverlay.addEventListener('mousedown', e => e.stopPropagation());
    resultOverlay.addEventListener('touchstart', e => e.stopPropagation(), {passive: false});
});
