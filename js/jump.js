// js/jump.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const gameArea = document.getElementById('gameArea');
    const uiOverlay = document.getElementById('uiOverlay');
    const resultOverlay = document.getElementById('resultOverlay');
    const startBtn = document.getElementById('startBtn');
    const retryBtn = document.getElementById('retryBtn');
    
    const trackContent = document.getElementById('trackContent');
    const athlete = document.getElementById('athlete');
    
    const resultTitle = document.getElementById('resultTitle');
    const resultDistance = document.getElementById('resultDistance');
    const resultDesc = document.getElementById('resultDesc');
    const pbDisplay = document.getElementById('pb-display');
    const comboFeedback = document.getElementById('comboFeedback');

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

        if (type === 'rhythm_good') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.stop(now + 0.1);
        } else if (type === 'rhythm_bad') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.stop(now + 0.2);
        } else if (type === 'jump_perfect') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.stop(now + 0.3);
        } else if (type === 'foul') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.stop(now + 0.5);
        }
    }

    // --- Variables ---
    let isGameRunning = false;
    let animationFrameId = null;
    let worldX = 0;
    let speed = 0; // pixels per second
    
    // Configurazione distanze
    const startOffset = window.innerWidth; 
    const spacing = 800; // px tra i segni
    let objects = []; // Array of objects {type, x, el, active}

    // Load PB
    let personalBest = parseFloat(localStorage.getItem('track_arcade_jump_pb')) || Infinity;
    if (personalBest !== Infinity) {
        pbDisplay.textContent = personalBest.toFixed(1);
    }

    // --- Game Engine ---

    function resetGame() {
        isGameRunning = false;
        cancelAnimationFrame(animationFrameId);
        
        worldX = 0;
        trackContent.style.transform = `translateX(0px)`;
        trackContent.innerHTML = ''; // Clear elements
        objects = [];
        
        uiOverlay.classList.remove('hidden');
        resultOverlay.classList.add('hidden');
        resultOverlay.firstElementChild.classList.remove('scale-100');
        resultOverlay.firstElementChild.classList.add('scale-95');
    }

    function startGame() {
        uiOverlay.classList.add('hidden');
        resultOverlay.classList.add('hidden');
        
        // Spawn elements
        trackContent.innerHTML = '';
        objects = [];
        worldX = 0;
        trackContent.style.transform = `translateX(0px)`;
        
        // 3 Rhythm markers
        for (let i = 1; i <= 3; i++) {
            const x = startOffset + (i * spacing);
            
            const el = document.createElement('div');
            el.className = 'absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-white shadow-[0_0_15px_rgba(250,204,21,0.8)] rhythm-ring';
            el.style.left = x + 'px';
            
            trackContent.appendChild(el);
            objects.push({ type: 'rhythm', x: x, el: el, active: true, width: 32 });
        }
        
        // The Final Board
        const boardX = startOffset + (4 * spacing);
        const boardWidth = 120; // 120px total (white + red). Scale: 120px = 30cm (20cm white + 10cm red)
        
        const boardEl = document.createElement('div');
        boardEl.className = 'absolute top-0 h-full flex flex-row shadow-2xl';
        boardEl.style.left = boardX + 'px';
        boardEl.style.width = boardWidth + 'px';
        
        // Struttura Asse (Orizzontale)
        // White part = 20cm (80px), Red part = 10cm (40px)
        boardEl.innerHTML = `
            <div class="h-full bg-white border-x-2 border-gray-300" style="width: 80px;"></div>
            <div class="h-full bg-red-600 border-r-4 border-red-800" style="width: 40px;"></div>
            <div class="h-full w-[2000px] bg-[#e6c280] absolute left-[120px]"></div>
        `;
        trackContent.appendChild(boardEl);
        
        objects.push({ 
            type: 'board', 
            x: boardX, 
            el: boardEl, 
            active: true, 
            width: boardWidth,
            whiteWidth: 80, // pixels
            redWidth: 40
        });

        // Speed relative to screen width to keep timing similar on mobile and desktop
        // Takes ~0.8s to cover "spacing" distance
        speed = spacing / 0.8; 
        
        setTimeout(() => {
            isGameRunning = true;
            lastTime = performance.now();
            gameLoop(lastTime);
        }, 500);
    }

    let lastTime = 0;
    function gameLoop(currentTime) {
        if (!isGameRunning) return;
        
        const deltaTime = (currentTime - lastTime) / 1000; // in seconds
        lastTime = currentTime;
        
        // Increase speed slightly over time to simulate acceleration
        speed += 100 * deltaTime;
        
        worldX += speed * deltaTime;
        trackContent.style.transform = `translateX(${-worldX}px)`;
        
        // Check if passed without jumping
        const boardObj = objects.find(o => o.type === 'board');
        if (boardObj) {
            // Shoe toe X position in world coordinates
            const shoeRect = athlete.getBoundingClientRect();
            const shoeWorldX = worldX + shoeRect.right;
            
            // If the shoe has passed the entire board + 100px and no tap registered
            if (shoeWorldX > boardObj.x + boardObj.width + 100 && boardObj.active) {
                boardObj.active = false;
                endGame(false, null, null);
                return;
            }
        }
        
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function showFeedback(text, colorClass) {
        comboFeedback.innerHTML = `<span class="text-4xl md:text-6xl font-black italic ${colorClass} drop-shadow-lg">${text}</span>`;
        comboFeedback.classList.remove('opacity-0');
        comboFeedback.classList.remove('scale-150');
        
        // Force reflow to restart transition
        void comboFeedback.offsetWidth;
        
        comboFeedback.classList.add('scale-110');
        
        setTimeout(() => {
            comboFeedback.classList.add('opacity-0');
            comboFeedback.classList.remove('scale-110');
        }, 500);
    }

    const handleTap = (e) => {
        if (!isGameRunning) return;
        if (e.type === 'touchstart') e.preventDefault();
        
        // Get absolute toe X coordinate
        // Athlete is pointing right, so toe is at the right edge of the bounding box
        const shoeRect = athlete.getBoundingClientRect();
        // The green line is at x=190 in a 200px SVG, which is 95% of the width
        const toeScreenX = shoeRect.left + (shoeRect.width * 0.95);
        
        // Convert screen X to world X
        const toeWorldX = worldX + toeScreenX;
        
        // Find closest active object
        let closestObj = null;
        let minDistance = Infinity;
        
        for (const obj of objects) {
            if (!obj.active) continue;
            
            // Center of the object for calculation
            const objCenterWorldX = obj.x + (obj.width / 2);
            const dist = Math.abs(toeWorldX - objCenterWorldX);
            
            if (dist < minDistance) {
                minDistance = dist;
                closestObj = obj;
            }
        }
        
        if (!closestObj) return;
        
        if (closestObj.type === 'rhythm') {
            // Check tolerance (e.g. within 150px is a hit)
            if (minDistance < 150) {
                closestObj.active = false;
                closestObj.el.classList.remove('bg-yellow-400');
                closestObj.el.classList.add('bg-green-500', 'scale-150', 'opacity-0');
                closestObj.el.style.transition = 'all 0.3s';
                playTone('rhythm_good');
                
                if (minDistance < 50) {
                    showFeedback('PERFETTO!', 'text-yellow-400');
                } else {
                    showFeedback('BENE', 'text-green-400');
                }
            } else {
                closestObj.active = false;
                closestObj.el.classList.remove('bg-yellow-400');
                closestObj.el.classList.add('bg-red-600', 'opacity-30');
                playTone('rhythm_bad');
                showFeedback('FUORI TEMPO', 'text-red-500');
            }
        } 
        else if (closestObj.type === 'board') {
            // JUMP!
            closestObj.active = false;
            
            // Scale: Total board width in CSS is 120px (80px white, 40px red) = 30cm
            // -> pxPerCm = 120 / 30 = 4px per cm
            const pxPerCm = 4;
            
            // foulLine is the start of the red section
            const foulLineWorldX = closestObj.x + closestObj.whiteWidth;
            
            endGame(true, toeWorldX, foulLineWorldX, pxPerCm, closestObj.x);
        }
    };

    function endGame(didTap, toeWorldX, foulLineWorldX, pxPerCm, boardStartX) {
        isGameRunning = false;
        cancelAnimationFrame(animationFrameId);
        
        resultOverlay.classList.remove('hidden');
        setTimeout(() => {
            resultOverlay.firstElementChild.classList.remove('scale-95');
            resultOverlay.firstElementChild.classList.add('scale-100');
        }, 10);
        
        if (!didTap) {
            playTone('foul');
            showResultError('SALTO PASSATO', 'Non hai staccato! Sei corso oltre la pedana.');
            return;
        }
        
        // Calculate diff: Positive means valid (before line), Negative means foul (over line)
        const diffPx = foulLineWorldX - toeWorldX;
        const diffCm = diffPx / pxPerCm;
        
        if (diffCm < 0) {
            // Foul!
            playTone('foul');
            const foulAmount = Math.abs(diffCm);
            if (foulAmount > 10) {
                 showResultError('NULLO', `Hai staccato completamente oltre la pedana.`);
            } else {
                 showResultError('NULLO', `Hai pizzicato la plastilina di ${foulAmount.toFixed(1)} cm!`);
            }
        } else if (diffCm > 20) {
            // Took off before the board entirely (white board is 20cm)
            playTone('rhythm_bad');
            showResultError('FUORI ASSE', `Hai regalato ${diffCm.toFixed(1)} cm! Troppo lontano dall'asse.`);
        } else {
            // Valid jump!
            playTone('jump_perfect');
            showResultSuccess(diffCm);
        }
    }

    function showResultError(title, desc) {
        resultTitle.textContent = title;
        resultTitle.className = 'text-3xl font-black uppercase tracking-wider mb-2 text-red-500';
        
        resultDistance.innerHTML = `X`;
        resultDistance.className = 'text-6xl font-mono font-bold my-6 text-red-500';
        
        resultDesc.textContent = desc;
    }

    function showResultSuccess(diffCm) {
        resultTitle.textContent = 'STACCO VALIDO';
        resultTitle.className = 'text-3xl font-black uppercase tracking-wider mb-2 text-green-400';
        
        resultDistance.innerHTML = `${diffCm.toFixed(1)}<span class="text-2xl">cm</span>`;
        resultDistance.className = 'text-6xl font-mono font-bold my-6 text-white';
        
        if (diffCm <= 2.0) {
            resultDesc.textContent = 'P-E-R-F-E-T-T-O! Stacco da manuale.';
            resultTitle.className = 'text-3xl font-black uppercase tracking-wider mb-2 text-yellow-400 animate-pulse';
            resultDistance.className = 'text-6xl font-mono font-bold my-6 text-yellow-400';
        } else if (diffCm <= 5.0) {
            resultDesc.textContent = 'Ottimo stacco! Hai regalato pochissimo.';
        } else if (diffCm <= 10.0) {
            resultDesc.textContent = 'Buon salto, ma puoi essere più preciso.';
        } else {
            resultDesc.textContent = 'Salto salvo, ma hai regalato molti centimetri.';
        }
        
        // Update PB
        if (diffCm < personalBest) {
            personalBest = diffCm;
            localStorage.setItem('track_arcade_jump_pb', personalBest);
            pbDisplay.textContent = personalBest.toFixed(1);
            resultDesc.innerHTML += '<br><span class="text-yellow-400 font-bold mt-2 block">🔥 NUOVO RECORD PERSONALE!</span>';
        }
    }

    // --- Event Listeners ---

    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
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
