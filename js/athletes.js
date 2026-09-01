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

    // --- UI Render ---
    const renderDashboard = () => {
        athletesListContainer.innerHTML = '';
        athleteProfileContainer.classList.add('hidden');
        athleteProfileContainer.classList.remove('flex');
        athletesListContainer.classList.remove('hidden');
        athletesListContainer.classList.add('grid');

        if (athletes.length === 0) {
            emptyState.classList.remove('hidden');
            athletesListContainer.appendChild(emptyState);
            return;
        }

        athletes.forEach(athlete => {
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

            if (topEvent !== 'Nessun Dato' && athlete.pbs) {
                const pb = athlete.pbs.find(p => p.event.toLowerCase() === topEvent.toLowerCase() || topEvent.toLowerCase().includes(p.event.toLowerCase()) || p.event.toLowerCase().includes(topEvent.toLowerCase()));
                if (pb) {
                    topTime = pb.performance;
                }
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
                        <td class="px-4 py-3 text-gray-500 text-xs truncate max-w-[120px]" title="${r.city}">${r.city}</td>
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
                        reverse: true, // Lower time is better (higher on graph)
                        ticks: {
                            callback: function(value) {
                                return formatTimeFromSeconds(value);
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
                                return `Tempo: ${formatTimeFromSeconds(context.parsed.y)}`;
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

        // Deduplicate events case-insensitively for each athlete
        const getUniqueEvents = (raceEv, pbEv) => {
            const unique = new Map();
            raceEv.forEach(e => unique.set(e.toUpperCase(), e));
            pbEv.forEach(e => {
                if (!unique.has(e.toUpperCase())) {
                    unique.set(e.toUpperCase(), e);
                }
            });
            return Array.from(unique.values());
        };

        const allEventsA = getUniqueEvents(raceEventsA, pbEventsA);
        const allEventsB = getUniqueEvents(raceEventsB, pbEventsB);
        
        // Find intersection case-insensitively
        const commonEvents = allEventsA.filter(eA => allEventsB.some(eB => eB.toUpperCase() === eA.toUpperCase()));

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
            const pbA = athleteA.pbs?.find(p => p.event.toLowerCase() === eventName.toLowerCase())?.performance || '-';
            const pbB = athleteB.pbs?.find(p => p.event.toLowerCase() === eventName.toLowerCase())?.performance || '-';
            
            // Highlight the best time (simple heuristic for common track formats)
            let pbAClass = 'text-gray-900 dark:text-gray-100';
            let pbBClass = 'text-gray-900 dark:text-gray-100';
            
            if (pbA !== '-' && pbB !== '-') {
                const secA = timeToSeconds(pbA);
                const secB = timeToSeconds(pbB);
                if (secA < secB) pbAClass = 'text-primary-600 dark:text-primary-400 font-bold';
                else if (secB < secA) pbBClass = 'text-primary-600 dark:text-primary-400 font-bold';
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
        
        const pbA = athleteA.pbs?.find(p => p.event.toLowerCase() === eventName.toLowerCase())?.performance || '-';
        const pbB = athleteB.pbs?.find(p => p.event.toLowerCase() === eventName.toLowerCase())?.performance || '-';
        tapePbA.innerText = pbA;
        tapePbB.innerText = pbB;

        // Fetch race history case-insensitively
        const eventKeyA = Object.keys(athleteA.races || {}).find(e => e.toLowerCase() === eventName.toLowerCase());
        const eventKeyB = Object.keys(athleteB.races || {}).find(e => e.toLowerCase() === eventName.toLowerCase());
        
        const racesA = eventKeyA ? athleteA.races[eventKeyA] : [];
        const racesB = eventKeyB ? athleteB.races[eventKeyB] : [];
        
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
                        reverse: true, // Lower is better
                        ticks: {
                            callback: function(value) { return formatTimeFromSeconds(value); }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) { return `${context.dataset.label}: ${formatTimeFromSeconds(context.parsed.y)}`; }
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
    renderDashboard();

    // --- Event Listeners ---
    backToListBtn.addEventListener('click', renderDashboard);
    if(raceEventFilter) raceEventFilter.addEventListener('change', renderRacesTable);
    
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
