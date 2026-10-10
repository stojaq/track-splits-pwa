// js/relay.js

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const uiOverlay = document.getElementById('uiOverlay');
    const resultOverlay = document.getElementById('resultOverlay');
    const startBtn = document.getElementById('startBtn');
    const retryBtn = document.getElementById('retryBtn');
    
    const world = document.getElementById('world');
    const runnerIn = document.getElementById('runnerIn');
    const runnerOut = document.getElementById('runnerOut');
    const baton = document.getElementById('baton');
    const statusText = document.getElementById('statusText');
    const pbDisplay = document.getElementById('pb-display');
    const hudChange = document.getElementById('hudChange');
    const hudScore = document.getElementById('hudScore');
    const resultTitle = document.getElementById('resultTitle');
    const resultScore = document.getElementById('resultScore');
    const resultDesc = document.getElementById('resultDesc');

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

        if (type === 'start') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(500, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.stop(now + 0.1);
        } else if (type === 'hop') {
            // Outgoing runner starts (Tap 1)
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.stop(now + 0.15);
        } else if (type === 'pass') {
            // Baton passed (Tap 2)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.stop(now + 0.2);
        } else if (type === 'fail') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.stop(now + 0.5);
        } else if (type === 'win') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.setValueAtTime(500, now + 0.1);
            osc.frequency.setValueAtTime(600, now + 0.2);
            osc.frequency.setValueAtTime(800, now + 0.3);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.stop(now + 0.6);
        }
    }

    // Costanti della pista (px)
    const MARK_X = 400;
    const ZONE_START = 700;
    const ZONE_END = 1300;
    const MAX_SPEED_IN = 700; // px/s
    const MAX_SPEED_OUT = 750; // px/s
    const ACCEL_OUT = 400; // px/s^2

    // Variabili di stato
    let isRunning = false;
    let phase = 0; // 0: Wait start, 1: Wait handoff, 2: Finished single, 3: Failed completely
    let inX = 0;
    let outX = ZONE_START;
    let speedIn = MAX_SPEED_IN;
    let speedOut = 0;
    let cameraX = 0;
    let lastTime = 0;
    let animationId = null;

    let currentChange = 1; // 1, 2, 3
    let totalScore = 0;

    let pb = parseInt(localStorage.getItem('track_arcade_relay_pb')) || 0;
    if (pb > 0) pbDisplay.textContent = pb;

    function resetFullGame() {
        isRunning = false;
        cancelAnimationFrame(animationId);
        
        currentChange = 1;
        totalScore = 0;
        hudChange.textContent = `Cambio: 1/3`;
        hudScore.textContent = `Punti: 0`;
        
        resetSingleChange();
        
        uiOverlay.classList.remove('hidden');
        resultOverlay.classList.add('hidden');
    }

    function resetSingleChange() {
        phase = 0;
        inX = 0;
        outX = ZONE_START;
        speedIn = MAX_SPEED_IN * (0.9 + Math.random() * 0.2); // Randomize speed every change
        speedOut = 0;
        cameraX = 0;
        
        runnerIn.style.transform = `translateX(${inX}px)`;
        runnerOut.style.transform = `translateX(${outX}px)`;
        world.style.transform = `translateX(0px)`;
        
        baton.style.right = '-10px';
        baton.style.left = 'auto';
        runnerIn.appendChild(baton);
        
        statusText.textContent = 'IN ATTESA';
        statusText.className = 'absolute top-20 text-3xl font-black text-white/50 pointer-events-none uppercase tracking-widest z-30 transition-colors';
    }

    function startGame() {
        uiOverlay.classList.add('hidden');
        resultOverlay.classList.add('hidden');
        
        startSingleChange();
    }
    
    function startSingleChange() {
        hudChange.textContent = `Cambio: ${currentChange}/3`;
        statusText.textContent = 'ASPETTA IL SEGNO...';
        
        setTimeout(() => {
            isRunning = true;
            lastTime = performance.now();
            gameLoop(lastTime);
        }, 500);
    }

    function gameLoop(time) {
        if (!isRunning) return;
        const dt = (time - lastTime) / 1000;
        lastTime = time;

        // Muovi incoming runner
        inX += speedIn * dt;
        
        // Muovi outgoing runner se è partito
        if (phase >= 1) {
            speedOut += ACCEL_OUT * dt;
            if (speedOut > MAX_SPEED_OUT) speedOut = MAX_SPEED_OUT;
            outX += speedOut * dt;
        }

        // Camera segue il testimone
        let targetCamX = inX;
        if (phase === 1) targetCamX = (inX + outX) / 2;
        if (phase === 2) targetCamX = outX;
        
        // Centra sullo schermo (viewport / 3 approx for horizontal centering)
        cameraX = targetCamX - window.innerWidth / 3;
        if (cameraX < 0) cameraX = 0;

        // Aggiorna DOM
        runnerIn.style.transform = `translateX(${inX}px)`;
        runnerOut.style.transform = `translateX(${outX}px)`;
        world.style.transform = `translateX(${-cameraX}px)`;

        // Controlli di fallimento automatico
        if (phase === 0 && inX > outX) {
            failGame('TAMPONAMENTO', `Cambio ${currentChange} fallito! Sei rimasto fermo e ti ha travolto!`);
            return;
        }
        if (phase === 1) {
            if (inX > outX + 20) {
                failGame('TAMPONAMENTO', `Cambio ${currentChange} fallito! Sei partito troppo tardi.`);
                return;
            }
            if (inX > ZONE_END && outX > ZONE_END) {
                failGame('FUORI SETTORE', `Cambio ${currentChange} fallito! Siete usciti dalla zona senza passare il testimone.`);
                return;
            }
        }

        animationId = requestAnimationFrame(gameLoop);
    }

    function handleTap(e) {
        if (!isRunning) return;
        if (e.type === 'touchstart') e.preventDefault();

        if (phase === 0) {
            // Partenza!
            phase = 1;
            statusText.textContent = 'ZONA CAMBIO!';
            playTone('hop');
            
            // Check precision of start (ideal is exactly at MARK_X)
            const diff = inX - MARK_X;
            if (Math.abs(diff) < 20) {
                statusText.textContent = 'PARTENZA PERFETTA!';
                statusText.classList.add('text-green-400');
            } else if (diff < 0) {
                statusText.textContent = 'PARTENZA ANTICIPATA';
                statusText.classList.add('text-yellow-400');
            } else {
                statusText.textContent = 'PARTENZA RITARDATA';
                statusText.classList.add('text-orange-400');
            }
            
            setTimeout(() => {
                if (phase === 1) statusText.textContent = '';
                statusText.className = 'absolute top-20 text-3xl font-black text-white/50 pointer-events-none uppercase tracking-widest z-30 transition-colors';
            }, 1500);

        } else if (phase === 1) {
            // Cambio!
            
            // Entrambi devono essere nella zona gialla
            if (inX < ZONE_START || outX > ZONE_END || inX > ZONE_END || outX < ZONE_START) {
                failGame('FUORI SETTORE', `Cambio ${currentChange} avvenuto fuori dalla zona gialla. Squalificati!`);
                return;
            }

            // Distanza tra i due
            const dist = outX - inX;
            if (dist < -10) {
                 failGame('DISASTRO', `Cambio ${currentChange}: Vi siete scontrati!`);
                 return;
            } else if (dist > 80) {
                 failGame('TESTIMONE CADUTO', `Cambio ${currentChange}: Eravate troppo lontani, testimone a terra!`);
                 return;
            } 
            
            // Success!
            phase = 2;
            playTone('pass');
            
            // Passa il testimone visivamente
            baton.style.right = 'auto';
            baton.style.left = '-10px';
            runnerOut.appendChild(baton);
            
            // Calcola punteggio parziale
            let score = (speedIn + speedOut) / 10; 
            const zoneProgress = (outX - ZONE_START) / (ZONE_END - ZONE_START);
            score += (zoneProgress * 50); // Bonus for deep change
            const optDist = Math.abs(40 - dist);
            score -= optDist; // Malus for bad distance
            
            score = Math.max(10, Math.round(score));
            totalScore += score;
            hudScore.textContent = `Punti: ${totalScore}`;
            
            statusText.textContent = `CAMBIO ${currentChange} OK! +${score}pt`;
            statusText.className = 'absolute top-20 text-3xl font-black text-green-400 pointer-events-none uppercase tracking-widest z-30 transition-colors scale-125';
            
            // Wait a bit, then move to next change or win
            setTimeout(() => {
                if (currentChange < 3) {
                    currentChange++;
                    resetSingleChange();
                    startSingleChange();
                } else {
                    winGame();
                }
            }, 1500);
        }
    }

    function failGame(title, desc) {
        isRunning = false;
        phase = 3;
        cancelAnimationFrame(animationId);
        statusText.textContent = '';
        playTone('fail');
        
        resultOverlay.classList.remove('hidden');
        resultTitle.textContent = title;
        resultTitle.className = `text-3xl font-black uppercase tracking-wider mb-2 text-red-500`;
        
        resultScore.innerHTML = `SQUALIFICATI`;
        resultScore.className = `text-4xl md:text-6xl font-mono font-bold my-4 text-red-500`;
        
        resultDesc.textContent = desc;
    }

    function winGame() {
        isRunning = false;
        cancelAnimationFrame(animationId);
        statusText.textContent = '';
        playTone('win');
        
        resultOverlay.classList.remove('hidden');
        resultTitle.textContent = 'GARA COMPLETATA';
        resultTitle.className = `text-3xl font-black uppercase tracking-wider mb-2 text-green-400`;
        
        resultScore.innerHTML = `${totalScore}<span class="text-2xl">pt</span>`;
        resultScore.className = `text-6xl font-mono font-bold my-4 text-white`;
        
        resultDesc.textContent = 'Siete arrivati al traguardo con 3 cambi perfetti!';

        if (totalScore > pb) {
            pb = totalScore;
            localStorage.setItem('track_arcade_relay_pb', pb);
            pbDisplay.textContent = pb;
            resultDesc.innerHTML += '<br><span class="text-yellow-400 font-bold mt-2 block">🔥 NUOVO RECORD DI SQUADRA!</span>';
        }
    }

    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startGame();
    });
    retryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetFullGame();
        startGame();
    });
    
    gameArea.addEventListener('mousedown', handleTap);
    gameArea.addEventListener('touchstart', handleTap, { passive: false });
    
    uiOverlay.addEventListener('mousedown', e => e.stopPropagation());
    uiOverlay.addEventListener('touchstart', e => e.stopPropagation(), {passive: false});
    resultOverlay.addEventListener('mousedown', e => e.stopPropagation());
    resultOverlay.addEventListener('touchstart', e => e.stopPropagation(), {passive: false});
});
