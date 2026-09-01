// predictor.js

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const baseDistanceSelect = document.getElementById('baseDistance');
    const perfHr = document.getElementById('perfHr');
    const perfMin = document.getElementById('perfMin');
    const perfSec = document.getElementById('perfSec');
    
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');

    

    // === Math Models ===

    // 1. Pete Riegel
    const predictRiegel = (t1, d1, d2) => {
        return t1 * Math.pow((d2 / d1), 1.06);
    };

    // 2. Cameron
    const cameronA = (d) => {
        // d is distance in meters
        // formula expects miles? No, meters is fine if constants match. Wait. 
        // Standard Cameron formula: a = 13.49681 - (0.000030363 * d) + (863.00479 / d^0.179) where d is meters.
        // Actually, let's use meters.
        return 13.49681 - (0.000030363 * d) + (863.00479 / Math.pow(d, 0.179));
    };
    const predictCameron = (t1, d1, d2) => {
        const a1 = cameronA(d1);
        const a2 = cameronA(d2);
        return t1 * (d2 / d1) * (a1 / a2);
    };

    // 3. VDOT (Jack Daniels)
    const calcVDOT = (distanceM, timeMin) => {
        const v = distanceM / timeMin;
        const vo2 = (0.182258 * v) + (0.000104 * Math.pow(v, 2)) - 4.6;
        const c = 0.2989558 * Math.exp(-0.19326 * timeMin) + 0.1894393 * Math.exp(-0.012778 * timeMin) + 0.8;
        return vo2 / c;
    };

    const predictVDOT = (t1_sec, d1, d2) => {
        const t1_min = t1_sec / 60;
        const vdot = calcVDOT(d1, t1_min);
        
        // Binary search to find t2_min
        let minTime = d2 / 1000; // very fast
        let maxTime = d2 / 50; // very slow
        
        for (let i = 0; i < 50; i++) {
            let midTime = (minTime + maxTime) / 2;
            let midVDOT = calcVDOT(d2, midTime);
            if (midVDOT > vdot) {
                minTime = midTime;
            } else {
                maxTime = midTime;
            }
        }
        
        const t2_min = (minTime + maxTime) / 2;
        return t2_min * 60; // return seconds
    };

    // === Helpers ===
    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);
        
        if (hrs > 0) {
            return `${hrs}h ${mins.toString().padStart(2, '0')}' ${secs.toString().padStart(2, '0')}"`;
        }
        return `${mins}' ${secs.toString().padStart(2, '0')}"`;
    };

    const formatPace = (totalSeconds, distanceMeters) => {
        const paceSecPerKm = (totalSeconds / distanceMeters) * 1000;
        const pMins = Math.floor(paceSecPerKm / 60);
        const pSecs = Math.floor(paceSecPerKm % 60);
        return `${pMins}:${pSecs.toString().padStart(2, '0')} /km`;
    };

    const DISTANCES = [
        { label: '1500m', value: 1500 },
        { label: '3000m', value: 3000 },
        { label: '5000m', value: 5000 },
        { label: '10km', value: 10000 },
        { label: 'Mezza Maratona', value: 21097.5 },
        { label: 'Maratona', value: 42195 }
    ];

    // === Main Calculation ===
    const calculatePredictions = () => {
        const baseD = parseFloat(baseDistanceSelect.value);
        const hr = parseInt(perfHr.value) || 0;
        const min = parseInt(perfMin.value) || 0;
        const sec = parseInt(perfSec.value) || 0;
        
        const totalBaseSec = (hr * 3600) + (min * 60) + sec;
        
        if (totalBaseSec <= 0) {
            alert('Inserisci un tempo valido.');
            return;
        }

        resultContainer.innerHTML = '';
        
        DISTANCES.forEach(dist => {
            if (Math.abs(dist.value - baseD) < 1) return; // Skip the base distance itself
            
            const rRiegel = predictRiegel(totalBaseSec, baseD, dist.value);
            const rVDOT = predictVDOT(totalBaseSec, baseD, dist.value);
            const rCameron = predictCameron(totalBaseSec, baseD, dist.value);

            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden card-transition';
            
            card.innerHTML = `
                <div class="bg-primary-50 dark:bg-primary-900/30 px-5 py-3 border-b border-primary-100 dark:border-primary-800 flex justify-between items-center">
                    <h3 class="font-outfit font-bold text-lg text-primary-900 dark:text-primary-300">${dist.label}</h3>
                </div>
                <div class="p-5 space-y-4">
                    <!-- Riegel -->
                    <div class="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-dark-border">
                        <div>
                            <p class="font-semibold text-gray-800 dark:text-gray-200">Riegel <span class="text-xs font-normal text-gray-400 ml-1">(Standard)</span></p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Ritmo: ${formatPace(rRiegel, dist.value)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-outfit font-bold text-xl text-blue-600 dark:text-blue-400">${formatTime(rRiegel)}</p>
                        </div>
                    </div>
                    
                    <!-- VDOT -->
                    <div class="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-dark-border">
                        <div>
                            <p class="font-semibold text-gray-800 dark:text-gray-200">VDOT <span class="text-xs font-normal text-gray-400 ml-1">(Fisiologico)</span></p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Ritmo: ${formatPace(rVDOT, dist.value)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-outfit font-bold text-xl text-primary-600 dark:text-primary-400">${formatTime(rVDOT)}</p>
                        </div>
                    </div>

                    <!-- Cameron -->
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-800 dark:text-gray-200">Cameron <span class="text-xs font-normal text-gray-400 ml-1">(Prudente)</span></p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Ritmo: ${formatPace(rCameron, dist.value)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-outfit font-bold text-xl text-purple-600 dark:text-purple-400">${formatTime(rCameron)}</p>
                        </div>
                    </div>
                </div>
            `;
            
            resultContainer.appendChild(card);
        });

        resultContainer.classList.remove('hidden');
        setTimeout(() => {
            resultContainer.classList.remove('opacity-0');
        }, 50);
        
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    calculateBtn.addEventListener('click', calculatePredictions);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculatePredictions();
        }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration failed: ', err));
        });
    }
});
