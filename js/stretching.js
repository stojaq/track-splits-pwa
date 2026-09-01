// stretching.js

document.addEventListener('DOMContentLoaded', () => {
    

    // === Database Esercizi ===
    const dynamicExercises = [
        { id: 'd1', name: 'Slanci Frontali Gambe', target: 'Flessori / Femorali', duration: 30, desc: 'Slanci controllati in avanti e indietro per sbloccare l\'anca.', emoji: '🦵' },
        { id: 'd2', name: 'Slanci Laterali Gambe', target: 'Abduttori / Adduttori', duration: 30, desc: 'Slanci laterali a pendolo per aprire il bacino.', emoji: '🤸' },
        { id: 'd3', name: 'Rotazioni Caviglie', target: 'Caviglie', duration: 30, desc: 'Rotazioni ampie in senso orario e antiorario per entrambe le caviglie.', emoji: '🦶' },
        { id: 'd4', name: 'Affondi Dinamici', target: 'Quadricipiti / Glutei', duration: 40, desc: 'Passo in avanti piegando le ginocchia, ritorno immediato.', emoji: '🚶‍♂️' },
        { id: 'd5', name: 'Skip Basso Calciato', target: 'Polpacci / Reattività', duration: 30, desc: 'Piccoli saltelli reattivi alternando le gambe sul posto.', emoji: '⚡' }
    ];

    const staticExercises = [
        { id: 's1', name: 'Allungamento Quadricipite', target: 'Quadricipiti', duration: 40, desc: 'In piedi, afferra la caviglia e porta il tallone al gluteo. Mantieni il ginocchio dritto.', emoji: '🦿' },
        { id: 's2', name: 'Stretching Polpacci al Muro', target: 'Polpacci / Tendine Achille', duration: 40, desc: 'Mani al muro, una gamba dietro tesa col tallone a terra, una piegata avanti.', emoji: '🧱' },
        { id: 's3', name: 'Allungamento Flessori Anca', target: 'Ileo-psoas', duration: 40, desc: 'In ginocchio, porta un piede avanti in affondo. Spingi il bacino in avanti e in basso.', emoji: '🧘‍♂️' },
        { id: 's4', name: 'Allungamento Femorali (Sit&Reach)', target: 'Bicipite Femorale', duration: 40, desc: 'Seduto a terra, gambe tese, cerca di toccare le punte dei piedi senza piegare le ginocchia.', emoji: '🤸‍♂️' },
        { id: 's5', name: 'Farfalla (Aduttori)', target: 'Interno Coscia', duration: 40, desc: 'Seduto, unisci le piante dei piedi e spingi delicatamente le ginocchia verso il pavimento.', emoji: '🦋' }
    ];

    let currentMode = 'dynamic'; // 'dynamic' or 'static'
    const exerciseGrid = document.getElementById('exerciseGrid');
    const tabDynamicBtn = document.getElementById('tabDynamicBtn');
    const tabStaticBtn = document.getElementById('tabStaticBtn');

    const renderGrid = () => {
        const data = currentMode === 'dynamic' ? dynamicExercises : staticExercises;
        let html = '';
        data.forEach(ex => {
            html += `
                <div class="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <span class="text-3xl bg-gray-50 dark:bg-gray-800 p-2 rounded-xl">${ex.emoji}</span>
                            <div>
                                <h3 class="font-bold text-gray-800 dark:text-gray-100">${ex.name}</h3>
                                <span class="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md mt-1 inline-block">${ex.target}</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">${ex.desc}</p>
                    <div class="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 gap-1.5 bg-gray-50 dark:bg-gray-800/50 w-fit px-3 py-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${ex.duration} sec
                    </div>
                </div>
            `;
        });
        exerciseGrid.innerHTML = html;
    };

    const updateTabs = () => {
        if (currentMode === 'dynamic') {
            tabDynamicBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm transition-all transform scale-100';
            tabStaticBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all';
        } else {
            tabStaticBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm transition-all transform scale-100';
            tabDynamicBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all';
        }
        renderGrid();
    };

    tabDynamicBtn.addEventListener('click', () => { currentMode = 'dynamic'; updateTabs(); });
    tabStaticBtn.addEventListener('click', () => { currentMode = 'static'; updateTabs(); });

    // Inizializzazione griglia
    updateTabs();

    // === Routine Timer Logic ===
    const startRoutineBtn = document.getElementById('startRoutineBtn');
    const routineModal = document.getElementById('routineModal');
    const routineModalContent = document.getElementById('routineModalContent');
    const closeRoutineBtn = document.getElementById('closeRoutineBtn');
    const pauseRoutineBtn = document.getElementById('pauseRoutineBtn');
    const skipRoutineBtn = document.getElementById('skipRoutineBtn');
    
    const timerText = document.getElementById('timerText');
    const timerCircle = document.getElementById('timerCircle');
    const routineExName = document.getElementById('routineExName');
    const routineExTarget = document.getElementById('routineExTarget');
    const routineProgress = document.getElementById('routineProgress');

    let currentRoutine = [];
    let currentExIndex = 0;
    let timerInterval = null;
    let timeRemaining = 0;
    let totalTimeForPhase = 0;
    let isPaused = false;
    let phase = 'prep'; // 'prep' or 'work'

    const CIRCLE_CIRCUMFERENCE = 552.92; // 2 * pi * r (r=88)

    const updateCircle = () => {
        const progress = timeRemaining / totalTimeForPhase;
        const dashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);
        timerCircle.style.strokeDashoffset = dashoffset;
    };

    const playBeep = () => {
        // Fallback visivo se l'audio non è permesso
        timerCircle.classList.remove('text-primary-500', 'text-orange-500');
        timerCircle.classList.add('text-green-500');
        setTimeout(() => {
            timerCircle.classList.remove('text-green-500');
            timerCircle.classList.add(phase === 'prep' ? 'text-orange-500' : 'text-primary-500');
        }, 500);
    };

    const endRoutine = () => {
        clearInterval(timerInterval);
        routineExName.innerText = 'Routine Completata! 🎉';
        routineExTarget.innerText = 'Ottimo lavoro.';
        timerText.innerText = 'OK';
        timerCircle.style.strokeDashoffset = 0;
        timerCircle.classList.remove('text-primary-500', 'text-orange-500');
        timerCircle.classList.add('text-green-500');
        pauseRoutineBtn.classList.add('hidden');
        skipRoutineBtn.classList.add('hidden');
    };

    const nextPhase = () => {
        if (phase === 'prep') {
            // Move to work phase
            phase = 'work';
            const ex = currentRoutine[currentExIndex];
            timeRemaining = ex.duration;
            totalTimeForPhase = ex.duration;
            routineExName.innerText = ex.name;
            routineExTarget.innerText = ex.target;
            timerCircle.classList.remove('text-orange-500');
            timerCircle.classList.add('text-primary-500');
            playBeep();
        } else {
            // Move to next exercise prep phase
            currentExIndex++;
            if (currentExIndex >= currentRoutine.length) {
                endRoutine();
                return;
            }
            startPrepPhase();
        }
        updateTimerDisplay();
    };

    const startPrepPhase = () => {
        phase = 'prep';
        timeRemaining = 5; // 5 seconds prep
        totalTimeForPhase = 5;
        const nextEx = currentRoutine[currentExIndex];
        routineExName.innerText = 'Preparati per:';
        routineExTarget.innerText = nextEx.name;
        routineProgress.innerText = `Esercizio ${currentExIndex + 1} di ${currentRoutine.length}`;
        timerCircle.classList.remove('text-primary-500');
        timerCircle.classList.add('text-orange-500');
    };

    const updateTimerDisplay = () => {
        timerText.innerText = timeRemaining;
        updateCircle();
    };

    const tick = () => {
        if (isPaused) return;
        
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            nextPhase();
        } else if (timeRemaining <= 3 && phase === 'work') {
            // Optional: small visual warning for last 3 seconds
            timerText.classList.add('text-red-500');
            setTimeout(() => timerText.classList.remove('text-red-500'), 500);
        }
    };

    const startRoutine = () => {
        currentRoutine = currentMode === 'dynamic' ? dynamicExercises : staticExercises;
        if (currentRoutine.length === 0) return;

        currentExIndex = 0;
        isPaused = false;
        pauseRoutineBtn.innerText = 'Pausa';
        pauseRoutineBtn.classList.remove('hidden');
        skipRoutineBtn.classList.remove('hidden');
        timerCircle.classList.remove('text-green-500');

        routineModal.classList.remove('hidden');
        setTimeout(() => {
            routineModal.classList.remove('opacity-0');
            routineModalContent.classList.remove('scale-95');
        }, 10);

        startPrepPhase();
        updateTimerDisplay();
        
        clearInterval(timerInterval);
        timerInterval = setInterval(tick, 1000);
    };

    const stopRoutine = () => {
        clearInterval(timerInterval);
        routineModal.classList.add('opacity-0');
        routineModalContent.classList.add('scale-95');
        setTimeout(() => {
            routineModal.classList.add('hidden');
        }, 300);
    };

    startRoutineBtn.addEventListener('click', startRoutine);
    closeRoutineBtn.addEventListener('click', stopRoutine);

    pauseRoutineBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseRoutineBtn.innerText = isPaused ? 'Riprendi' : 'Pausa';
    });

    skipRoutineBtn.addEventListener('click', () => {
        if (phase === 'prep') {
            nextPhase(); // skip directly to work
        } else {
            timeRemaining = 0;
            tick(); // trigger next phase immediately
        }
    });

});
