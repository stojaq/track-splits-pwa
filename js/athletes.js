document.addEventListener('DOMContentLoaded', () => {

    // --- State ---
    let athletes = window.athletesData || [];
    let currentAthleteId = null;
    let currentChart = null;
    let currentRadarChart = null;
    let currentAthleteRaces = [];

    // --- Elements ---
    const athletesListContainer = document.getElementById('athletesListContainer');
    const emptyState = document.getElementById('emptyState');
    const noResultsState = document.getElementById('noResultsState');
    const resetEmptyStateBtn = document.getElementById('resetEmptyStateBtn');

    // Dashboard Filters Elements
    const athletesFilterToolbar = document.getElementById('athletesFilterToolbar');
    const athleteSearchInput = document.getElementById('athleteSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const athleteCategoryFilter = document.getElementById('athleteCategoryFilter');
    const athleteSortFilter = document.getElementById('athleteSortFilter');
    const athletesCountBadge = document.getElementById('athletesCountBadge');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    const athleteProfileContainer = document.getElementById('athleteProfileContainer');
    const backToListBtn = document.getElementById('backToListBtn');
    const profileName = document.getElementById('profileName');
    const profileDetails = document.getElementById('profileDetails');
    const pbListContainer = document.getElementById('pbListContainer');
    const racesListBody = document.getElementById('racesListBody');
    const raceEventFilter = document.getElementById('raceEventFilter');
    
    // Charts
    const chartEventSelect = document.getElementById('chartEventSelect');
    const progressionChartCanvas = document.getElementById('progressionChart');
    const radarChartCanvas = document.getElementById('radarChart');

    // Compare Modal Elements
    const openCompareBtn = document.getElementById('openCompareBtn');
    const closeCompareBtn = document.getElementById('closeCompareBtn');
    const compareModal = document.getElementById('compareModal');
    const compareAthleteA = document.getElementById('compareAthleteA');
    const compareAthleteB = document.getElementById('compareAthleteB');
    const compareEventSelect = document.getElementById('compareEventSelect');
    const compareContent = document.getElementById('compareContent');
    const compareEmptyState = document.getElementById('compareEmptyState');
    
    const commonPbsContainer = document.getElementById('commonPbsContainer');
    const commonPbsBody = document.getElementById('commonPbsBody');
    const pbColNameA = document.getElementById('pbColNameA');
    const pbColNameB = document.getElementById('pbColNameB');
    
    const tapeNameA = document.getElementById('tapeNameA');
    const tapeNameB = document.getElementById('tapeNameB');
    const tapePbA = document.getElementById('tapePbA');
    const tapePbB = document.getElementById('tapePbB');
    const tapeRacesA = document.getElementById('tapeRacesA');
    const tapeRacesB = document.getElementById('tapeRacesB');

    const compareProgressionChartCanvas = document.getElementById('compareProgressionChart');
    const compareRadarChartCanvas = document.getElementById('compareRadarChart');
    
    let currentCompareProgressionChart = null;
    let currentCompareRadarChart = null;

    // Convert time string to total seconds for charting
    const timeToSeconds = (timeStr) => {
        if (!timeStr) return 0;
        timeStr = timeStr.trim().replace('pt', '').replace('m', '').trim();
        
        let hours = 0;
        if (timeStr.includes('h')) {
            const hParts = timeStr.split('h');
            hours = parseFloat(hParts[0]) || 0;
            timeStr = hParts[1];
        }
        
        const parts = timeStr.split(':');
        let totalSeconds = hours * 3600;
        
        if (parts.length === 3) {
            totalSeconds += parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
        } else if (parts.length === 2) {
            totalSeconds += parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
        } else if (parts.length === 1) {
            totalSeconds += parseFloat(parts[0]) || 0;
        }
        return totalSeconds;
    };

    // Format seconds back to mm:ss or h:mm:ss for charts
    const formatTimeFromSeconds = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = (secs % 60).toFixed(2);
        if (h > 0) {
            return `${h}h${m.toString().padStart(2, '0')}:${s.padStart(5, '0')}`;
        }
        return m > 0 ? `${m}:${s.padStart(5, '0')}` : s;
    };

    // Normalizzazione rigorosa eventi FIDAL
    const normalizeEvent = (name) => {
        if (!name) return '';
        const s = name.toLowerCase().trim();
        
        // Siepi
        if (s.includes('siepi')) {
            if (s.includes('1200')) return '1200 siepi';
            if (s.includes('2000')) return '2000 siepi';
            if (s.includes('3000')) return '3000 siepi';
            return s;
        }

        // Ostacoli / Hs
        if (s.includes('hs') || s.includes('ostacoli')) {
            if (s.includes('60')) return '60 hs';
            if (s.includes('100')) return '100 hs';
            if (s.includes('110')) return '110 hs';
            if (s.includes('400')) return '400 hs';
            return s;
        }

        // Mezza maratona / Maratonina (NON deve mai matchare con Maratona intera!)
        if (s.includes('maratonina') || s.includes('mezza') || s === '21km' || s === '21 km' || s === '21.097km') {
            return 'mezza maratona';
        }

        // Maratona intera
        if (s === 'maratona' || s === 'marathon' || s === '42km' || s === '42 km') {
            return 'maratona';
        }

        // Distanze comuni su pista
        if (s.startsWith('500 ') || s === '500m' || s === '500 metri') return '500 metri';
        if (s.startsWith('60 ') || s === '60m' || s === '60 metri') return '60 metri';
        if (s.startsWith('80 ') || s === '80m' || s === '80 metri') return '80 metri';
        if (s.startsWith('100 ') || s === '100m' || s === '100 metri') return '100 metri';
        if (s.startsWith('200 ') || s === '200m' || s === '200 metri') return '200 metri';
        if (s.startsWith('300 ') || s === '300m' || s === '300 metri') return '300 metri';
        if (s.startsWith('400 ') || s === '400m' || s === '400 metri') return '400 metri';
        if (s.startsWith('800 ') || s === '800m' || s === '800 metri') return '800 metri';
        if (s.startsWith('1000 ') || s === '1000m' || s === '1000 metri') return '1000 metri';
        if (s.startsWith('1500 ') || s === '1500m' || s === '1500 metri') return '1500 metri';
        if (s.includes('miglio')) return '1 miglio';
        if (s.startsWith('2000 ') || s === '2000m' || s === '2000 metri') return '2000 metri';
        if (s.startsWith('3000 ') || s === '3000m' || s === '3000 metri') return '3000 metri';
        if (s.startsWith('5000 ') || s === '5000m' || s === '5000 metri') return '5000 metri';
        if (s.startsWith('10000 ') || s === '10000m' || s === '10000 metri') return '10000 metri';
        if (s.startsWith('5 km') || s === '5km') return '5 km';
        if (s.startsWith('10 km') || s === '10km') return '10 km';

        // Pulizia generica (rimozione 'metri' / 'm' finali)
        return s.replace(/\s*metri|\s*m\b/g, '').replace(/\s+/g, ' ').trim();
    };

    const areEventsEquivalent = (e1, e2) => {
        if (!e1 || !e2) return false;
        return normalizeEvent(e1) === normalizeEvent(e2);
    };

    const isFieldEvent = (eventName) => {
        if (!eventName) return false;
        const s = eventName.toLowerCase();
        const fieldKeywords = ['salto', 'peso', 'disco', 'giavellotto', 'martello', 'vortex', 'asta', 'lungo', 'alto', 'triplo', 'decathlon', 'eptathlon', 'esathlon', 'pentathlon', 'tetrathlon', 'biathlon'];
        return fieldKeywords.some(kw => s.includes(kw));
    };

    const getAthleteRacesForEvent = (athlete, eventName) => {
        if (!athlete || !athlete.races) return [];
        let races = [];
        for (const key in athlete.races) {
            if (areEventsEquivalent(key, eventName)) {
                races = races.concat(athlete.races[key]);
            }
        }
        return races;
    };

    const getAthletePbForEvent = (athlete, eventName) => {
        if (!athlete || !athlete.pbs) return '-';
        const pb = athlete.pbs.find(p => areEventsEquivalent(p.event, eventName));
        return pb ? pb.performance : '-';
    };

    // --- Dashboard Filters State & Logica ---
    const listFilterState = {
        search: '',
        category: 'all',
        sortBy: 'name-asc'
    };

    const parseDobToDate = (dobStr) => {
        if (!dobStr) return new Date(0);
        const parts = dobStr.split('-');
        if (parts.length === 3) {
            const d = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const y = parseInt(parts[2], 10);
            return new Date(y, m, d);
        }
        const d = new Date(dobStr);
        return isNaN(d.getTime()) ? new Date(0) : d;
    };

    const getTotalRacesCount = (athlete) => {
        if (!athlete.races) return 0;
        let count = 0;
        for (const key in athlete.races) {
            if (Array.isArray(athlete.races[key])) {
                count += athlete.races[key].length;
            }
        }
        return count;
    };

    const initCategoryFilter = () => {
        if (!athleteCategoryFilter) return;
        const categories = new Set();
        athletes.forEach(a => {
            if (a.category) {
                categories.add(a.category.trim());
            }
        });

        athleteCategoryFilter.innerHTML = '<option value="all">Tutte le Categorie</option>';
        Array.from(categories).sort().forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            athleteCategoryFilter.appendChild(opt);
        });
    };

    const isFilterActive = () => {
        return Boolean(
            listFilterState.search.trim() !== '' ||
            listFilterState.category !== 'all' ||
            listFilterState.sortBy !== 'name-asc'
        );
    };

    const updateFilterStatsUI = (filteredCount) => {
        if (athletesCountBadge) {
            if (athletes.length === 0) {
                athletesCountBadge.textContent = '0 atleti';
            } else if (filteredCount === athletes.length) {
                athletesCountBadge.textContent = `${athletes.length} ${athletes.length === 1 ? 'atleta' : 'atleti'}`;
            } else {
                athletesCountBadge.textContent = `${filteredCount} di ${athletes.length} atleti`;
            }
        }

        if (resetFiltersBtn) {
            if (isFilterActive()) {
                resetFiltersBtn.classList.remove('hidden');
            } else {
                resetFiltersBtn.classList.add('hidden');
            }
        }

        if (clearSearchBtn) {
            if (listFilterState.search.trim().length > 0) {
                clearSearchBtn.classList.remove('hidden');
            } else {
                clearSearchBtn.classList.add('hidden');
            }
        }
    };

    const resetFilters = () => {
        listFilterState.search = '';
        listFilterState.category = 'all';
        listFilterState.sortBy = 'name-asc';

        if (athleteSearchInput) athleteSearchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
        if (athleteCategoryFilter) athleteCategoryFilter.value = 'all';
        if (athleteSortFilter) athleteSortFilter.value = 'name-asc';
        renderDashboard();
    };

    const getFilteredAthletes = () => {
        const query = listFilterState.search.toLowerCase().trim();
        return athletes
            .filter(athlete => {
                // Ricerca testuale per nome o società
                if (query) {
                    const nameMatch = (athlete.name || '').toLowerCase().includes(query);
                    const clubMatch = (athlete.club || '').toLowerCase().includes(query);
                    if (!nameMatch && !clubMatch) return false;
                }

                // Categoria
                if (listFilterState.category !== 'all') {
                    if (athlete.category !== listFilterState.category) return false;
                }

                return true;
            })
            .sort((a, b) => {
                switch (listFilterState.sortBy) {
                    case 'name-desc':
                        return b.name.localeCompare(a.name, 'it', { sensitivity: 'base' });
                    case 'age-asc': // più giovani prima -> data di nascita più recente
                        return parseDobToDate(b.dob) - parseDobToDate(a.dob);
                    case 'age-desc': // più esperti prima -> data di nascita meno recente
                        return parseDobToDate(a.dob) - parseDobToDate(b.dob);
                    case 'races-desc': // più gare
                        return getTotalRacesCount(b) - getTotalRacesCount(a);
                    case 'name-asc':
                    default:
                        return a.name.localeCompare(b.name, 'it', { sensitivity: 'base' });
                }
            });
    };

    // --- UI Render ---
    const renderDashboard = () => {
        athletesListContainer.innerHTML = '';
        athleteProfileContainer.classList.add('hidden');
        athleteProfileContainer.classList.remove('flex');
        
        if (athletesFilterToolbar) {
            athletesFilterToolbar.classList.remove('hidden');
        }

        athletesListContainer.classList.remove('hidden');
        athletesListContainer.classList.add('grid');

        if (athletes.length === 0) {
            if (emptyState) {
                emptyState.classList.remove('hidden');
                athletesListContainer.appendChild(emptyState);
            }
            updateFilterStatsUI(0);
            return;
        }

        const filteredAthletes = getFilteredAthletes();
        updateFilterStatsUI(filteredAthletes.length);

        if (filteredAthletes.length === 0) {
            if (noResultsState) {
                noResultsState.classList.remove('hidden');
                athletesListContainer.appendChild(noResultsState);
            }
            return;
        }

        filteredAthletes.forEach(athlete => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2';

            let topEvent = 'Nessun Dato';
            let topTime = '-';
            
            if (athlete.races) {
                let maxRaces = 0;
                for (const event in athlete.races) {
                    if (athlete.races[event].length > maxRaces) {
                        maxRaces = athlete.races[event].length;
                        topEvent = event;
                    }
                }
            }

            if (topEvent !== 'Nessun Dato') {
                topTime = getAthletePbForEvent(athlete, topEvent);
            }

            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 rounded-full flex items-center justify-center font-bold text-xl font-display">
                        ${athlete.name.charAt(0)}
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900 dark:text-white leading-tight">${athlete.name}</h3>
                        <p class="text-xs text-gray-500">${athlete.category}</p>
                    </div>
                </div>
                <div class="mt-2 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span class="text-gray-500 block mb-1">Specialità principale:</span>
                    <span class="font-bold text-gray-900 dark:text-white">${topEvent}</span> 
                    <span class="text-primary-600 font-medium float-right">${topTime}</span>
                </div>
            `;

            card.addEventListener('click', () => openAthleteProfile(athlete.id));
            athletesListContainer.appendChild(card);
        });
    };

    const openAthleteProfile = (id) => {
        const athlete = athletes.find(a => a.id === id);
        if (!athlete) return;
        currentAthleteId = id;

        // Toggle Views
        if (athletesFilterToolbar) {
            athletesFilterToolbar.classList.add('hidden');
        }
        athletesListContainer.classList.add('hidden');
        athletesListContainer.classList.remove('grid');
        athleteProfileContainer.classList.remove('hidden');
        athleteProfileContainer.classList.add('flex');

        // Header
        profileName.innerText = athlete.name;
        profileDetails.innerText = `Nato il: ${athlete.dob} | Categoria: ${athlete.category} | Società: ${athlete.club}`;

        // PB Table
        pbListContainer.innerHTML = '';
        if (!athlete.pbs || athlete.pbs.length === 0) {
            pbListContainer.innerHTML = '<p class="text-sm text-gray-500">Nessun Personal Best trovato.</p>';
        } else {
            let pbTable = `<table class="w-full text-sm text-left"><tbody class="divide-y divide-gray-50 dark:divide-gray-800">`;
            athlete.pbs.forEach(pb => {
                pbTable += `
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                        <td class="py-2 font-medium text-gray-900 dark:text-gray-100">${pb.event} <span class="text-xs text-gray-400 font-normal ml-1">(${pb.type})</span></td>
                        <td class="py-2 text-primary-600 dark:text-primary-400 font-bold text-right">${pb.performance}</td>
                        <td class="py-2 text-gray-400 text-xs text-right w-16">${pb.year}</td>
                    </tr>
                `;
            });
            pbTable += `</tbody></table>`;
            pbListContainer.innerHTML = pbTable;
        }

        // Full Races List Setup
        currentAthleteRaces = [];
        if (athlete.races) {
            for (let event in athlete.races) {
                athlete.races[event].forEach(r => currentAthleteRaces.push({...r, event}));
            }
        }
        
        currentAthleteRaces.sort((a, b) => {
            if (a.dateObj && b.dateObj) return b.dateObj - a.dateObj;
            return 0;
        });

        // Populate Event Filter Dropdown
        raceEventFilter.innerHTML = '<option value="ALL">Tutte le specialità</option>';
        const uniqueEvents = [...new Set(currentAthleteRaces.map(r => r.event))];
        uniqueEvents.sort().forEach(e => {
            raceEventFilter.innerHTML += `<option value="${e}">${e}</option>`;
        });

        // Render initially
        renderRacesTable();

        // Setup Charts
        setupChart(athlete);
        drawRadarChart(athlete);
    };

    const renderRacesTable = () => {
        racesListBody.innerHTML = '';
        const eventFilter = raceEventFilter ? raceEventFilter.value : 'ALL';

        const filteredRaces = currentAthleteRaces.filter(r => {
            return eventFilter === 'ALL' || r.event === eventFilter;
        });

        if (filteredRaces.length === 0) {
            racesListBody.innerHTML = `<tr><td colspan="5" class="px-4 py-4 text-center text-gray-500">Nessuna gara trovata con questi filtri.</td></tr>`;
        } else {
            filteredRaces.forEach(r => {
                racesListBody.innerHTML += `
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td class="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">${r.dateStr}</td>
                        <td class="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">${r.event}</td>
                        <td class="px-4 py-3 text-xs text-gray-500">${r.type}</td>
                        <td class="px-4 py-3 text-primary-600 dark:text-primary-400 font-bold">${r.performance}</td>
                        <td class="px-4 py-3 text-gray-500 text-xs whitespace-normal break-words min-w-[120px]">${r.city}</td>
                    </tr>
                `;
            });
        }
    };

    // Bind filters
    if (raceEventFilter) raceEventFilter.addEventListener('change', renderRacesTable);

    const setupChart = (athlete) => {
        chartEventSelect.innerHTML = '';

        // Find events with at least 2 races to plot
        let plottableEvents = [];
        if (athlete.races) {
            plottableEvents = Object.keys(athlete.races).filter(e => athlete.races[e].length > 1);
        }

        if (plottableEvents.length === 0) {
            chartEventSelect.innerHTML = '<option>Dati insufficienti</option>';
            if (currentChart) currentChart.destroy();
            return;
        }

        plottableEvents.forEach(e => {
            const opt = document.createElement('option');
            opt.value = e;
            opt.innerText = e;
            chartEventSelect.appendChild(opt);
        });

        chartEventSelect.onchange = () => drawChart(athlete, chartEventSelect.value);
        drawChart(athlete, plottableEvents[0]);
    };

    const drawChart = (athlete, eventName) => {
        if (!athlete.races || !athlete.races[eventName]) return;

        const races = athlete.races[eventName];
        // Sort oldest to newest for the chart (left to right)
        const sorted = [...races].sort((a, b) => a.dateObj - b.dateObj);

        const labels = sorted.map(r => r.dateStr);
        const dataSeconds = sorted.map(r => timeToSeconds(r.performance));

        if (currentChart) {
            currentChart.destroy();
        }

        // formatTimeFromSeconds is now global

        const isField = isFieldEvent(eventName);

        currentChart = new Chart(progressionChartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Miglioramento ${eventName}`,
                    data: dataSeconds,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        reverse: !isField,
                        ticks: {
                            callback: function(value) {
                                return isField ? value : formatTimeFromSeconds(value);
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return isField ? `Misura/Punti: ${context.parsed.y}` : `Tempo: ${formatTimeFromSeconds(context.parsed.y)}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });
    };

    const drawRadarChart = (athlete) => {
        if (currentRadarChart) {
            currentRadarChart.destroy();
        }

        // Macro-categories definition using regex to avoid partial matches (e.g., 1500 matching 150)
        const catKeywords = {
            'Velocità': [/\b60\b/, /\b80\b/, /\b100\b/, /\b150\b/, /\b200\b/, /\b300\b/, /\b400\b/, /\b500\b/, /4x100/, /4x400/],
            'Mezzofondo': [/\b800\b/, /\b1000\b/, /\b1500\b/, /miglio/, /\b2000\b/],
            'Resistenza': [/\b3000\b/, /\b5000\b/, /\b10000\b/, /strada/, /km/, /mezza/, /maratona/, /cross/, /campestre/],
            'Lanci/Salti': [/peso/, /disco/, /giavellotto/, /martello/, /vortex/, /lungo/, /alto/, /triplo/, /asta/, /esathlon/, /eptathlon/, /decathlon/, /pentathlon/]
        };

        const scores = {
            'Velocità': 0,
            'Mezzofondo': 0,
            'Resistenza': 0,
            'Lanci/Salti': 0
        };

        let totalRaces = 0;

        // Count races per category
        if (athlete.races) {
            for (const eventName in athlete.races) {
                const numRaces = athlete.races[eventName].length;
                const evLower = eventName.toLowerCase();
                
                for (const cat in catKeywords) {
                    if (catKeywords[cat].some(regex => regex.test(evLower))) {
                        scores[cat] += numRaces;
                        totalRaces += numRaces;
                        break; // Count in first matching category
                    }
                }
            }
        }

        // Normalize to 0-100 scale based on relative percentage
        const maxScore = Math.max(...Object.values(scores), 1); // Avoid division by zero
        const dataValues = [
            (scores['Velocità'] / maxScore) * 100,
            (scores['Mezzofondo'] / maxScore) * 100,
            (scores['Resistenza'] / maxScore) * 100,
            (scores['Lanci/Salti'] / maxScore) * 100
        ];

        currentRadarChart = new Chart(radarChartCanvas, {
            type: 'radar',
            data: {
                labels: ['Velocità', 'Mezzofondo', 'Resistenza', 'Salti & Lanci'],
                datasets: [{
                    label: 'Attitudine',
                    data: dataValues,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            color: '#6b7280'
                        },
                        ticks: {
                            display: false,
                            min: 0,
                            max: 100
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function() {
                                return 'Attitudine';
                            }
                        }
                    }
                }
            }
        });
    };

    // --- Compare Logic ---
    const openCompareModal = () => {
        compareModal.classList.remove('hidden');
        populateCompareDropdowns();
        resetCompareView();
    };

    const closeCompareModal = () => {
        compareModal.classList.add('hidden');
    };

    const populateCompareDropdowns = () => {
        let options = '<option value="">Seleziona...</option>';
        athletes.forEach(a => {
            options += `<option value="${a.id}">${a.name}</option>`;
        });
        compareAthleteA.innerHTML = options;
        compareAthleteB.innerHTML = options;
    };

    const resetCompareView = () => {
        compareContent.classList.add('hidden');
        commonPbsContainer.classList.add('hidden');
        compareEmptyState.classList.remove('hidden');
        compareEventSelect.innerHTML = '<option value="">Seleziona atleti prima</option>';
        compareEventSelect.disabled = true;
    };

    const handleCompareSelection = () => {
        const idA = compareAthleteA.value;
        const idB = compareAthleteB.value;
        
        if (!idA || !idB || idA === idB) {
            resetCompareView();
            return;
        }

        const athleteA = athletes.find(a => a.id === idA);
        const athleteB = athletes.find(a => a.id === idB);

        // Trova specialità in comune (sia dallo storico gare che dai PB)
        const raceEventsA = Object.keys(athleteA.races || {});
        const raceEventsB = Object.keys(athleteB.races || {});
        
        const pbEventsA = (athleteA.pbs || []).map(p => p.event);
        const pbEventsB = (athleteB.pbs || []).map(p => p.event);

        // Deduplicate events equivalent-wise for each athlete
        const getUniqueEvents = (raceEv, pbEv) => {
            const list = [...raceEv, ...pbEv];
            const unique = [];
            list.forEach(e => {
                let canonical = e;
                if (areEventsEquivalent(e, 'Mezza Maratona')) canonical = 'Mezza Maratona';
                if (!unique.some(u => areEventsEquivalent(u, canonical))) {
                    unique.push(canonical);
                }
            });
            return unique;
        };

        const allEventsA = getUniqueEvents(raceEventsA, pbEventsA);
        const allEventsB = getUniqueEvents(raceEventsB, pbEventsB);
        
        // Find intersection with equivalence
        const commonEvents = allEventsA.filter(eA => allEventsB.some(eB => areEventsEquivalent(eB, eA)));

        if (commonEvents.length === 0) {
            compareEventSelect.innerHTML = '<option value="">Nessuna gara in comune</option>';
            compareEventSelect.disabled = true;
            compareContent.classList.add('hidden');
            commonPbsContainer.classList.add('hidden');
            compareEmptyState.classList.remove('hidden');
            return;
        }

        compareEventSelect.disabled = false;
        compareEmptyState.classList.add('hidden');
        
        let options = '';
        const dropdownEvents = commonEvents.filter(e => !e.toLowerCase().includes('strada'));
        
        if (dropdownEvents.length > 0) {
            dropdownEvents.sort().forEach(e => {
                options += `<option value="${e}">${e}</option>`;
            });
        } else {
            options = '<option value="">Solo gare su strada/nessuna</option>';
            compareEventSelect.disabled = true;
        }
        compareEventSelect.innerHTML = options;
        
        // Populate Common PBs Table
        commonPbsContainer.classList.remove('hidden');
        pbColNameA.innerText = athleteA.name;
        pbColNameB.innerText = athleteB.name;
        
        let pbsHtml = '';
        commonEvents.sort().forEach(eventName => {
            const pbA = getAthletePbForEvent(athleteA, eventName);
            const pbB = getAthletePbForEvent(athleteB, eventName);
            
            // Highlight the best time (simple heuristic for common track formats)
            let pbAClass = 'text-gray-900 dark:text-gray-100';
            let pbBClass = 'text-gray-900 dark:text-gray-100';
            
            if (pbA !== '-' && pbB !== '-') {
                const secA = timeToSeconds(pbA);
                const secB = timeToSeconds(pbB);
                const isField = isFieldEvent(eventName);
                if (!isField) {
                    if (secA < secB) pbAClass = 'text-primary-600 dark:text-primary-400 font-bold';
                    else if (secB < secA) pbBClass = 'text-primary-600 dark:text-primary-400 font-bold';
                } else {
                    if (secA > secB) pbAClass = 'text-primary-600 dark:text-primary-400 font-bold';
                    else if (secB > secA) pbBClass = 'text-primary-600 dark:text-primary-400 font-bold';
                }
            }

            pbsHtml += `
                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                    <td class="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">${eventName}</td>
                    <td class="px-4 py-2 ${pbAClass}">${pbA}</td>
                    <td class="px-4 py-2 ${pbBClass}">${pbB}</td>
                </tr>
            `;
        });
        commonPbsBody.innerHTML = pbsHtml;

        if (dropdownEvents.length > 0) {
            updateCompareView(athleteA, athleteB, dropdownEvents.sort()[0]);
        } else {
            // Se non ci sono specialità per il grafico (es. solo strada), nascondi i grafici
            compareContent.classList.add('hidden');
        }
    };

    const updateCompareView = (athleteA, athleteB, eventName) => {
        compareEmptyState.classList.add('hidden');
        compareContent.classList.remove('hidden');
        compareContent.classList.add('flex');

        // Tale of the Tape
        tapeNameA.innerText = athleteA.name;
        tapeNameB.innerText = athleteB.name;
        
        const pbA = getAthletePbForEvent(athleteA, eventName);
        const pbB = getAthletePbForEvent(athleteB, eventName);
        tapePbA.innerText = pbA;
        tapePbB.innerText = pbB;

        // Fetch race history using equivalence
        const racesA = getAthleteRacesForEvent(athleteA, eventName);
        const racesB = getAthleteRacesForEvent(athleteB, eventName);
        
        tapeRacesA.innerText = racesA.length;
        tapeRacesB.innerText = racesB.length;

        drawCompareProgressionChart(racesA, racesB, eventName, athleteA.name, athleteB.name);
        drawCompareRadarChart(athleteA, athleteB);
    };

    const drawCompareProgressionChart = (racesA, racesB, eventName, nameA, nameB) => {
        if (currentCompareProgressionChart) currentCompareProgressionChart.destroy();
        
        // formatTimeFromSeconds is now global

        const processRaces = (races) => {
            const sorted = [...races].filter(r => r.dateObj).sort((a,b) => a.dateObj - b.dateObj);
            return sorted.map(r => ({ x: r.dateObj, y: timeToSeconds(r.performance) })).filter(d => d.y > 0);
        };

        const dataA = processRaces(racesA);
        const dataB = processRaces(racesB);
        const isField = isFieldEvent(eventName);

        currentCompareProgressionChart = new Chart(compareProgressionChartCanvas, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: nameA,
                        data: dataA,
                        borderColor: '#3b82f6', // blue
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#2563eb',
                        pointRadius: 4,
                    },
                    {
                        label: nameB,
                        data: dataB,
                        borderColor: '#ef4444', // red
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#dc2626',
                        pointRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                month: 'MMM yyyy'
                            }
                        },
                        grid: { display: false }
                    },
                    y: {
                        reverse: !isField,
                        ticks: {
                            callback: function(value) { return isField ? value : formatTimeFromSeconds(value); }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) { return isField ? `${context.dataset.label}: ${context.parsed.y}` : `${context.dataset.label}: ${formatTimeFromSeconds(context.parsed.y)}`; }
                        }
                    }
                }
            }
        });
    };

    const drawCompareRadarChart = (athleteA, athleteB) => {
        if (currentCompareRadarChart) currentCompareRadarChart.destroy();

        const catKeywords = {
            'Velocità': [/\b60\b/, /\b80\b/, /\b100\b/, /\b150\b/, /\b200\b/, /\b300\b/, /\b400\b/, /\b500\b/, /4x100/, /4x400/],
            'Mezzofondo': [/\b800\b/, /\b1000\b/, /\b1500\b/, /miglio/, /\b2000\b/],
            'Resistenza': [/\b3000\b/, /\b5000\b/, /\b10000\b/, /strada/, /km/, /mezza/, /maratona/, /cross/, /campestre/],
            'Lanci/Salti': [/peso/, /disco/, /giavellotto/, /martello/, /vortex/, /lungo/, /alto/, /triplo/, /asta/, /esathlon/, /eptathlon/, /decathlon/, /pentathlon/]
        };

        const getScores = (athlete) => {
            const scores = { 'Velocità': 0, 'Mezzofondo': 0, 'Resistenza': 0, 'Lanci/Salti': 0 };
            if (athlete.races) {
                for (const eventName in athlete.races) {
                    const numRaces = athlete.races[eventName].length;
                    const evLower = eventName.toLowerCase();
                    for (const cat in catKeywords) {
                        if (catKeywords[cat].some(regex => regex.test(evLower))) {
                            scores[cat] += numRaces;
                            break;
                        }
                    }
                }
            }
            const maxScore = Math.max(...Object.values(scores), 1);
            return [
                (scores['Velocità'] / maxScore) * 100,
                (scores['Mezzofondo'] / maxScore) * 100,
                (scores['Resistenza'] / maxScore) * 100,
                (scores['Lanci/Salti'] / maxScore) * 100
            ];
        };

        currentCompareRadarChart = new Chart(compareRadarChartCanvas, {
            type: 'radar',
            data: {
                labels: ['Velocità', 'Mezzofondo', 'Resistenza', 'Salti & Lanci'],
                datasets: [
                    {
                        label: athleteA.name,
                        data: getScores(athleteA),
                        backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue
                        borderColor: 'rgba(59, 130, 246, 1)',
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                        pointBorderColor: '#fff',
                    },
                    {
                        label: athleteB.name,
                        data: getScores(athleteB),
                        backgroundColor: 'rgba(239, 68, 68, 0.2)', // red
                        borderColor: 'rgba(239, 68, 68, 1)',
                        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                        pointBorderColor: '#fff',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: { ticks: { display: false, min: 0, max: 100 } }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    };

    // --- Init ---
    initCategoryFilter();
    renderDashboard();

    // --- Event Listeners ---
    backToListBtn.addEventListener('click', renderDashboard);
    if(raceEventFilter) raceEventFilter.addEventListener('change', renderRacesTable);

    // Dashboard Filters Event Listeners
    if (athleteSearchInput) {
        athleteSearchInput.addEventListener('input', (e) => {
            listFilterState.search = e.target.value;
            renderDashboard();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            listFilterState.search = '';
            athleteSearchInput.value = '';
            renderDashboard();
            athleteSearchInput.focus();
        });
    }

    if (athleteCategoryFilter) {
        athleteCategoryFilter.addEventListener('change', (e) => {
            listFilterState.category = e.target.value;
            renderDashboard();
        });
    }

    if (athleteSortFilter) {
        athleteSortFilter.addEventListener('change', (e) => {
            listFilterState.sortBy = e.target.value;
            renderDashboard();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }

    if (resetEmptyStateBtn) {
        resetEmptyStateBtn.addEventListener('click', resetFilters);
    }
    
    if(openCompareBtn) openCompareBtn.addEventListener('click', openCompareModal);
    if(closeCompareBtn) closeCompareBtn.addEventListener('click', closeCompareModal);
    if(compareAthleteA) compareAthleteA.addEventListener('change', handleCompareSelection);
    if(compareAthleteB) compareAthleteB.addEventListener('change', handleCompareSelection);
    if(compareEventSelect) compareEventSelect.addEventListener('change', () => {
        const idA = compareAthleteA.value;
        const idB = compareAthleteB.value;
        const athleteA = athletes.find(a => a.id === idA);
        const athleteB = athletes.find(a => a.id === idB);
        updateCompareView(athleteA, athleteB, compareEventSelect.value);
    });

})
