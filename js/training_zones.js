// training_zones.js

document.addEventListener('DOMContentLoaded', () => {
    

    // === Tabs Management ===
    const tabHeartBtn = document.getElementById('tabHeartBtn');
    const tabPaceBtn = document.getElementById('tabPaceBtn');
    const tabHeartRate = document.getElementById('tabHeartRate');
    const tabPace = document.getElementById('tabPace');

    const setActiveTab = (isHeart) => {
        if (isHeart) {
            tabHeartRate.classList.remove('hidden');
            tabPace.classList.add('hidden');
            
            tabHeartBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm transition-all transform scale-100';
            tabPaceBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all';
        } else {
            tabHeartRate.classList.add('hidden');
            tabPace.classList.remove('hidden');
            
            tabPaceBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm transition-all transform scale-100';
            tabHeartBtn.className = 'flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all';
        }
    };

    tabHeartBtn.addEventListener('click', () => setActiveTab(true));
    tabPaceBtn.addEventListener('click', () => setActiveTab(false));

    // === Karvonen Toggle ===
    const useKarvonen = document.getElementById('useKarvonen');
    const fcRestContainer = document.getElementById('fcRestContainer');
    
    useKarvonen.addEventListener('change', (e) => {
        if (e.target.checked) {
            fcRestContainer.classList.remove('hidden');
            setTimeout(() => fcRestContainer.classList.remove('opacity-0'), 10);
        } else {
            fcRestContainer.classList.add('opacity-0');
            setTimeout(() => fcRestContainer.classList.add('hidden'), 300);
        }
    });

    // === Data Rendering Helpers ===
    const ZONES = [
        { id: 'Z1', name: 'Z1 Recupero', bg: 'bg-gray-100 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700', text: 'text-gray-700 dark:text-gray-300', desc: 'Defaticamento, recupero attivo' },
        { id: 'Z2', name: 'Z2 Lento', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-400', desc: 'Fondo lento, resistenza di base' },
        { id: 'Z3', name: 'Z3 Medio', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-400', desc: 'Corsa media, potenza aerobica' },
        { id: 'Z4', name: 'Z4 Soglia', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-400', desc: 'Soglia anaerobica, ripetute lunghe' },
        { id: 'Z5', name: 'Z5 VO2Max', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-400', desc: 'Massimo sforzo, ripetute brevi (VAM)' }
    ];

    const formatPace = (kmh) => {
        if (!kmh || kmh <= 0) return '0:00';
        const minsPerKm = 60 / kmh;
        const m = Math.floor(minsPerKm);
        const s = Math.round((minsPerKm - m) * 60);
        if (s === 60) return `${m + 1}:00`;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const createZoneCard = (zone, valueHtml) => {
        return `
            <div class="${zone.bg} border ${zone.border} rounded-2xl p-4 flex items-center justify-between transition-colors">
                <div>
                    <p class="font-bold ${zone.text}">${zone.name}</p>
                    <p class="text-xs ${zone.text} opacity-80 mt-0.5">${zone.desc}</p>
                </div>
                <div class="text-right">
                    <p class="font-outfit font-bold text-xl ${zone.text}">${valueHtml}</p>
                </div>
            </div>
        `;
    };

    // === HR Calculator ===
    const fcMaxInput = document.getElementById('fcMax');
    const fcRestInput = document.getElementById('fcRest');
    const calcHrBtn = document.getElementById('calcHrBtn');
    const hrResultContainer = document.getElementById('hrResultContainer');

    const calculateHR = () => {
        const fcMax = parseInt(fcMaxInput.value);
        if (!fcMax || fcMax < 100) return alert('Inserisci una FC Massima valida (es. 190)');
        
        let isKarvonen = useKarvonen.checked;
        let fcRest = 0;
        if (isKarvonen) {
            fcRest = parseInt(fcRestInput.value);
            if (!fcRest || fcRest < 30) return alert('Inserisci una FC a riposo valida (es. 50)');
        }

        const getBpm = (percent) => {
            if (isKarvonen) {
                return Math.round(((fcMax - fcRest) * percent) + fcRest);
            }
            return Math.round(fcMax * percent);
        };

        const zonesData = [
            { min: 0.50, max: 0.60 }, // Z1
            { min: 0.60, max: 0.70 }, // Z2
            { min: 0.70, max: 0.80 }, // Z3
            { min: 0.80, max: 0.90 }, // Z4
            { min: 0.90, max: 1.00 }  // Z5
        ];

        let html = '';
        zonesData.forEach((zd, index) => {
            const minBpm = getBpm(zd.min);
            const maxBpm = getBpm(zd.max);
            const valueHtml = `${minBpm} - ${maxBpm} <span class="text-sm font-medium">bpm</span>`;
            html += createZoneCard(ZONES[index], valueHtml);
        });

        hrResultContainer.innerHTML = html;
        hrResultContainer.classList.remove('hidden');
        setTimeout(() => hrResultContainer.classList.remove('opacity-0'), 10);
        
        // Scroll to results
        setTimeout(() => hrResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    };

    calcHrBtn.addEventListener('click', calculateHR);

    // === VAM Calculator ===
    const vamDistanceSelect = document.getElementById('vamDistance');
    const vamMinInput = document.getElementById('vamMin');
    const vamSecInput = document.getElementById('vamSec');
    const calcPaceBtn = document.getElementById('calcPaceBtn');
    const vamResultContainer = document.getElementById('vamResultContainer');
    const paceResultContainer = document.getElementById('paceResultContainer');
    
    const vamSpeedOut = document.getElementById('vamSpeedOut');
    const vamPaceOut = document.getElementById('vamPaceOut');

    const calculateVAM = () => {
        const d = parseInt(vamDistanceSelect.value); // meters
        const m = parseInt(vamMinInput.value) || 0;
        const s = parseInt(vamSecInput.value) || 0;
        
        const totalSecs = (m * 60) + s;
        if (totalSecs <= 0) return alert('Inserisci un tempo valido.');

        const speedKmh = (d / 1000) / (totalSecs / 3600);
        
        // Estima VAM basata sulla distanza
        let vam = 0;
        if (d === 1500) vam = speedKmh / 1.06; // 1500m si corre al 106% della VAM
        else if (d === 3000) vam = speedKmh;   // 3000m si corre al 100% della VAM
        else if (d === 5000) vam = speedKmh / 0.95; // 5000m si corre al 95% della VAM
        else if (d === 10000) vam = speedKmh / 0.90; // 10km si corre al 90% della VAM

        vamSpeedOut.innerHTML = `${vam.toFixed(1)} <span class="text-lg font-medium">km/h</span>`;
        vamPaceOut.innerText = `${formatPace(vam)}/km`;

        const zonesData = [
            { min: 0.60, max: 0.65 }, // Z1 Recupero
            { min: 0.70, max: 0.75 }, // Z2 Lento
            { min: 0.80, max: 0.85 }, // Z3 Medio
            { min: 0.90, max: 0.95 }, // Z4 Soglia
            { min: 1.00, max: 1.05 }  // Z5 VAM
        ];

        let html = '';
        zonesData.forEach((zd, index) => {
            const minKmh = vam * zd.min;
            const maxKmh = vam * zd.max;
            
            // Pace is inverted (maxKmh = minPace, minKmh = maxPace)
            const minPace = formatPace(maxKmh);
            const maxPace = formatPace(minKmh);
            
            const valueHtml = `${minPace} - ${maxPace} <span class="text-sm font-medium">/km</span>`;
            html += createZoneCard(ZONES[index], valueHtml);
        });

        paceResultContainer.innerHTML = html;
        vamResultContainer.classList.remove('hidden');
        setTimeout(() => vamResultContainer.classList.remove('opacity-0'), 10);

        setTimeout(() => vamResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    };

    calcPaceBtn.addEventListener('click', calculateVAM);
});
