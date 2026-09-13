document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'trackSplits_workouts';
    let workouts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let editingWorkoutId = null;
    let currentFilter = 'Tutti';
    
    let currentCalendarDate = new Date();
    let calendarFilterDate = null;

    // DOM Elements
    const feedContainer = document.getElementById('diaryFeed');
    const emptyState = document.getElementById('emptyDiary');
    const addBtnTop = document.getElementById('addWorkoutBtnTop');
    const addBtnEmpty = document.getElementById('addWorkoutBtnEmpty');
    const modal = document.getElementById('workoutModal');
    const modalContent = document.getElementById('workoutModalContent');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('workoutForm');

    const dateInput = document.getElementById('workoutDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    const durHr = document.getElementById('durationHr');
    const durMin = document.getElementById('durationMin');
    const durSec = document.getElementById('durationSec');
    
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const calendarMonthLabel = document.getElementById('calendarMonthLabel');
    const calendarGrid = document.getElementById('calendarGrid');
    const resetCalendarFilterBtn = document.getElementById('resetCalendarFilterBtn');

    const rpeInput = document.getElementById('workoutRpe');
    const rpeDisplay = document.getElementById('rpeValueDisplay');
    
    if (rpeInput && rpeDisplay) {
        rpeInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            rpeDisplay.textContent = val;
            rpeDisplay.className = 'font-bold ';
            if (val <= 3) rpeDisplay.classList.add('text-green-600');
            else if (val <= 6) rpeDisplay.classList.add('text-yellow-600');
            else if (val <= 8) rpeDisplay.classList.add('text-orange-600');
            else rpeDisplay.classList.add('text-red-600');
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary-600', 'text-white', 'shadow-sm');
                b.classList.add('bg-white', 'dark:bg-dark-card', 'text-gray-600', 'dark:text-gray-300');
            });
            e.target.classList.remove('bg-white', 'dark:bg-dark-card', 'text-gray-600', 'dark:text-gray-300');
            e.target.classList.add('active', 'bg-primary-600', 'text-white', 'shadow-sm');
            renderFeed();
        });
    });

    // Close dropdowns globally
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.diary-menu-container')) {
            document.querySelectorAll('.diary-dropdown').forEach(d => {
                d.classList.add('hidden');
            });
        }
    });

    // Event Listeners for Calendar
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderStats();
        });
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderStats();
        });
        resetCalendarFilterBtn.addEventListener('click', () => {
            calendarFilterDate = null;
            renderFeed();
        });
    }

    const renderStats = () => {
        const statsSection = document.getElementById('diaryStats');
        if (workouts.length === 0) {
            statsSection.classList.add('hidden');
            return;
        }
        statsSection.classList.remove('hidden');

        // --- CALENDAR LOGIC ---
        if (calendarMonthLabel && calendarGrid) {
            const year = currentCalendarDate.getFullYear();
            const month = currentCalendarDate.getMonth();
            
            calendarMonthLabel.textContent = currentCalendarDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            let firstDayIndex = firstDay === 0 ? 6 : firstDay - 1;
            calendarGrid.innerHTML = '';
            
            for (let i = 0; i < firstDayIndex; i++) {
                const div = document.createElement('div');
                calendarGrid.appendChild(div);
            }
            
            const workoutDates = new Set(workouts.map(w => w.date));
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isWorkout = workoutDates.has(dStr);
                const isSelected = calendarFilterDate === dStr;
                const isToday = dStr === today;
                
                const btn = document.createElement('button');
                btn.className = `w-full aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-colors `;
                
                if (isSelected) {
                    btn.className += 'bg-primary-600 text-white shadow-sm';
                } else if (isWorkout) {
                    btn.className += 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800';
                } else {
                    btn.className += 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
                    if (isToday) btn.className += ' border border-gray-300 dark:border-gray-600';
                }
                
                btn.textContent = day;
                if (isWorkout) {
                    btn.addEventListener('click', () => {
                        if (calendarFilterDate === dStr) calendarFilterDate = null;
                        else calendarFilterDate = dStr;
                        renderFeed();
                    });
                } else {
                    btn.disabled = true;
                    btn.classList.add('cursor-default');
                }
                
                calendarGrid.appendChild(btn);
            }

            if (calendarFilterDate) resetCalendarFilterBtn.classList.remove('hidden');
            else resetCalendarFilterBtn.classList.add('hidden');
        }

        // --- BAR CHART LOGIC ---
        let totalKm30 = 0;
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 28); // exactly 4 weeks
        
        const recentWorkouts = workouts.filter(w => new Date(w.date) >= thirtyDaysAgo);
        recentWorkouts.forEach(w => {
            if (w.distance) totalKm30 += parseFloat(w.distance);
        });
        
        const totKmEl = document.getElementById('statsTotalKm');
        if (totKmEl) totKmEl.innerText = totalKm30.toFixed(1);
        
        let weekBins = [0, 0, 0, 0];
        const labels = ['Sett 1', 'Sett 2', 'Sett 3', 'Ultimi 7gg'];
        
        recentWorkouts.forEach(w => {
            if (!w.distance) return;
            const wDate = new Date(w.date);
            const diffTime = Math.abs(now - wDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 7) weekBins[3] += parseFloat(w.distance);
            else if (diffDays <= 14) weekBins[2] += parseFloat(w.distance);
            else if (diffDays <= 21) weekBins[1] += parseFloat(w.distance);
            else if (diffDays <= 28) weekBins[0] += parseFloat(w.distance);
        });

        const canvas = document.getElementById('workoutsChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        if (window.diaryChartInstance) window.diaryChartInstance.destroy();
        
        window.diaryChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Km Percorsi',
                    data: weekBins,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return context.parsed.y.toFixed(1) + ' km'; }
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, display: false },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'Inter', sans-serif", size: 10 }, color: '#9ca3af' }
                    }
                }
            }
        });
    };

    const renderFeed = () => {
        // Sort from newest to oldest
        workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

        let filteredWorkouts = workouts;
        if (currentFilter !== 'Tutti') {
            filteredWorkouts = filteredWorkouts.filter(w => w.type === currentFilter);
        }
        if (calendarFilterDate) {
            filteredWorkouts = filteredWorkouts.filter(w => w.date === calendarFilterDate);
        }

        if (filteredWorkouts.length === 0) {
            emptyState.style.display = 'block';
            emptyState.querySelector('p').innerText = currentFilter === 'Tutti' ? 'Nessun allenamento presente.' : `Nessun allenamento di tipo "${currentFilter}" presente.`;
            Array.from(feedContainer.children).forEach(child => {
                if (child.id !== 'emptyDiary') child.remove();
            });
            renderStats();
            return;
        }

        emptyState.style.display = 'none';
        
        // Remove old workout cards
        Array.from(feedContainer.children).forEach(child => {
            if (child.id !== 'emptyDiary') child.remove();
        });

        // Group by month
        let currentMonth = '';
        
        filteredWorkouts.forEach((workout, index) => {
            const wDate = new Date(workout.date);
            const monthStr = wDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
            
            if (monthStr !== currentMonth) {
                currentMonth = monthStr;
                const monthHeader = document.createElement('h3');
                monthHeader.className = 'text-sm font-bold text-gray-500 uppercase mt-4 mb-2';
                monthHeader.innerText = currentMonth;
                feedContainer.appendChild(monthHeader);
            }

            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border relative';
            
            // Header with Title and Menu
            const headerDiv = document.createElement('div');
            headerDiv.className = 'flex justify-between items-start gap-4 mb-2';
            
            const titleHTML = workout.title ? `<h4 class="font-bold text-lg text-gray-900 dark:text-white">${workout.title}</h4>` : `<div></div>`;
            headerDiv.innerHTML = titleHTML;

            const menuContainer = document.createElement('div');
            menuContainer.className = 'relative diary-menu-container';
            
            const menuBtn = document.createElement('button');
            menuBtn.className = 'p-1 -mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors';
            menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>`;
            
            const dropdown = document.createElement('div');
            dropdown.className = 'hidden absolute right-0 top-full mt-1 w-36 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-lg z-10 overflow-hidden diary-dropdown';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2';
            editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Modifica`;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 border-t border-gray-100 dark:border-dark-border';
            delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Elimina`;

            menuBtn.onclick = (e) => {
                e.stopPropagation();
                document.querySelectorAll('.diary-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.add('hidden');
                });
                dropdown.classList.toggle('hidden');
            };

            dropdown.appendChild(editBtn);
            dropdown.appendChild(delBtn);
            menuContainer.appendChild(menuBtn);
            menuContainer.appendChild(dropdown);
            headerDiv.appendChild(menuContainer);

            delBtn.onclick = () => {
                if (confirm('Sei sicuro di voler eliminare questo allenamento?')) {
                    workouts.splice(index, 1);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
                    renderFeed();
                }
            };

            editBtn.onclick = () => {
                editingWorkoutId = workout.id;
                document.getElementById('workoutDate').value = workout.date;
                document.getElementById('workoutTitle').value = workout.title || '';
                document.getElementById('workoutType').value = workout.type;
                document.getElementById('workoutDistance').value = workout.distance || '';
                document.getElementById('workoutNotes').value = workout.notes || '';
                
                if (durHr) durHr.value = '';
                if (durMin) durMin.value = '';
                if (durSec) durSec.value = '';
                if (workout.duration) {
                    const p = workout.duration.split(':');
                    if (p.length === 3) {
                        if (durHr && p[0] !== '00') durHr.value = p[0];
                        if (durMin && p[1] !== '00') durMin.value = p[1];
                        if (durSec && p[2] !== '00') durSec.value = p[2];
                    }
                }
                
                if (workout.rpe) {
                    document.getElementById('workoutRpe').value = workout.rpe;
                    document.getElementById('rpeValueDisplay').textContent = workout.rpe;
                } else {
                    document.getElementById('workoutRpe').value = 5;
                    document.getElementById('rpeValueDisplay').textContent = 5;
                }
                
                document.querySelector('#workoutModalContent h2').innerText = 'Modifica Allenamento';
                
                const structureContainer = document.getElementById('repsStructureContainer');
                const blocksList = document.getElementById('blocksList');
                
                if (workout.type === 'Ripetute') {
                    structureContainer.classList.remove('hidden');
                    structureContainer.classList.add('flex');
                    
                    // Reset blocks
                    const rows = blocksList.querySelectorAll('.block-row');
                    rows.forEach((r, i) => { if(i>0) r.remove(); });
                    const firstRow = blocksList.querySelector('.block-row');
                    if(firstRow) firstRow.querySelectorAll('input').forEach(i => i.value = '');
                    
                    if (Array.isArray(workout.structure) && workout.structure.length > 0) {
                        workout.structure.forEach((b, i) => {
                            let row = blocksList.querySelectorAll('.block-row')[i];
                            if (!row) {
                                row = blocksList.querySelector('.block-row').cloneNode(true);
                                blocksList.appendChild(row);
                            }
                            row.querySelector('.block-reps').value = b.reps;
                            row.querySelector('.block-dist').value = b.distance;
                            row.querySelector('.block-rec').value = b.recovery || '';
                        });
                    }
                    
                    // Update buttons
                    const updatedRows = blocksList.querySelectorAll('.block-row');
                    updatedRows.forEach(row => {
                        const btn = row.querySelector('.remove-block-btn');
                        if (updatedRows.length === 1) {
                            btn.disabled = true;
                            btn.classList.add('opacity-50', 'cursor-not-allowed');
                            btn.classList.remove('hover:text-red-500');
                        } else {
                            btn.disabled = false;
                            btn.classList.remove('opacity-50', 'cursor-not-allowed');
                            btn.classList.add('hover:text-red-500');
                        }
                    });

                } else {
                    structureContainer.classList.add('hidden');
                    structureContainer.classList.remove('flex');
                }
                
                openModal();
            };
            
            const typeColor = workout.type === 'Ripetute' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : (workout.type === 'Medio' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400');
            
            const getRpeColor = (val) => {
                if (!val) return '';
                if (val <= 3) return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50';
                if (val <= 6) return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50';
                if (val <= 8) return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/50';
                return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50';
            };
            const rpeHtml = workout.rpe ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded border ${getRpeColor(workout.rpe)}" title="Fatica: ${workout.rpe}/10">RPE ${workout.rpe}</span>` : '';

            let structureHTML = '';
            if (workout.type === 'Ripetute' && workout.structure) {
                if (typeof workout.structure === 'string') {
                    structureHTML = `<p class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">${workout.structure}</p>`;
                } else if (Array.isArray(workout.structure) && workout.structure.length > 0) {
                    const formatted = workout.structure.map(b => {
                        let s = `${b.reps}x${b.distance}m`;
                        if (b.recovery) s += ` rec. ${b.recovery}`;
                        return s;
                    }).join(' + ');
                    structureHTML = `<p class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">${formatted}</p>`;
                }
            }
            
            let paceHtml = '';
            if (workout.distance && workout.duration) {
                const parts = workout.duration.split(':');
                const hr = parseInt(parts[0]) || 0;
                const min = parseInt(parts[1]) || 0;
                const sec = parseInt(parts[2]) || 0;
                
                const totalSec = (hr * 3600) + (min * 60) + sec;
                if (totalSec > 0) {
                    const distKm = parseFloat(workout.distance);
                    const secPerKm = totalSec / distKm;
                    const pMin = Math.floor(secPerKm / 60);
                    const pSec = Math.floor(secPerKm % 60);
                    let displayTime = '';
                    if (hr > 0) displayTime = `${hr}h ${min}m`;
                    else if (min > 0) displayTime = `${min}m ${sec}s`;
                    else displayTime = `${sec}s`;
                    
                    paceHtml = `<span class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50" title="Tempo: ${workout.duration}">⏱️ ${displayTime} - ⚡ ${pMin}:${pSec.toString().padStart(2,'0')}/km</span>`;
                }
            }
            
            const bodyDiv = document.createElement('div');
            bodyDiv.innerHTML = `
                <div class="flex items-center flex-wrap gap-2 mt-2">
                    <span class="text-xs font-semibold px-2 py-1 rounded-full ${typeColor}">${workout.type}</span>
                    ${rpeHtml}
                    ${paceHtml}
                    <span class="text-sm text-gray-500 ml-auto sm:ml-0">${wDate.toLocaleDateString('it-IT')}</span>
                    ${workout.distance ? `<span class="text-sm font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded ml-auto">${workout.distance} km</span>` : ''}
                </div>
                ${structureHTML}
                ${workout.notes ? `<p class="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">${workout.notes}</p>` : ''}
            `;
            
            card.appendChild(headerDiv);
            card.appendChild(bodyDiv);
            feedContainer.appendChild(card);
        });
        
        renderStats();
    };

    // Modal Logic
    const openModal = () => {
        modal.classList.remove('hidden');
        // small delay for transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('translate-y-full');
        }, 10);
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    const openNewModal = () => {
        editingWorkoutId = null;
        form.reset();
        document.getElementById('workoutDate').value = today;
        document.querySelector('#workoutModalContent h2').innerText = 'Nuovo Allenamento';
        
        if (rpeInput && rpeDisplay) {
            rpeInput.value = 5;
            rpeDisplay.textContent = 5;
            rpeDisplay.className = 'font-bold text-yellow-600';
        }
        
        const structureContainer = document.getElementById('repsStructureContainer');
        const blocksList = document.getElementById('blocksList');
        structureContainer.classList.add('hidden');
        structureContainer.classList.remove('flex');
        
        const rows = blocksList.querySelectorAll('.block-row');
        rows.forEach((r, i) => { if (i > 0) r.remove(); });
        const firstRow = blocksList.querySelector('.block-row');
        if(firstRow) firstRow.querySelectorAll('input').forEach(input => input.value = '');
        
        if(durHr) durHr.value='';
        if(durMin) durMin.value='';
        if(durSec) durSec.value='';
        
        const btn = firstRow.querySelector('.remove-block-btn');
        if(btn) {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            btn.classList.remove('hover:text-red-500');
        }

        openModal();
    };

    addBtnTop.addEventListener('click', openNewModal);
    if(addBtnEmpty) addBtnEmpty.addEventListener('click', openNewModal);
    closeBtn.addEventListener('click', closeModal);

    // Dynamic Form Logic
    const typeSelect = document.getElementById('workoutType');
    const structureContainer = document.getElementById('repsStructureContainer');
    const blocksList = document.getElementById('blocksList');
    const addBlockBtn = document.getElementById('addBlockBtn');
    
    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Ripetute') {
            structureContainer.classList.remove('hidden');
            structureContainer.classList.add('flex');
        } else {
            structureContainer.classList.add('hidden');
            structureContainer.classList.remove('flex');
        }
    });

    const updateRemoveButtons = () => {
        const rows = blocksList.querySelectorAll('.block-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-block-btn');
            if (rows.length === 1) {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.classList.remove('hover:text-red-500');
            } else {
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
                btn.classList.add('hover:text-red-500');
            }
        });
    };

    addBlockBtn.addEventListener('click', () => {
        const firstRow = blocksList.querySelector('.block-row');
        const newRow = firstRow.cloneNode(true);
        newRow.querySelectorAll('input').forEach(input => input.value = '');
        blocksList.appendChild(newRow);
        updateRemoveButtons();
    });

    blocksList.addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-block-btn');
        if (btn && !btn.disabled) {
            btn.closest('.block-row').remove();
            updateRemoveButtons();
        }
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let structureData = '';
        if (typeSelect.value === 'Ripetute') {
            const rows = blocksList.querySelectorAll('.block-row');
            const blocksArray = [];
            rows.forEach(row => {
                const reps = row.querySelector('.block-reps').value;
                const dist = row.querySelector('.block-dist').value;
                const rec = row.querySelector('.block-rec').value;
                if (reps && dist) {
                    blocksArray.push({ reps, distance: dist, recovery: rec });
                }
            });
            structureData = blocksArray;
        }

        let durationStr = null;
        const h = durHr ? durHr.value : '';
        const m = durMin ? durMin.value : '';
        const s = durSec ? durSec.value : '';
        if (h || m || s) {
            durationStr = `${h.padStart(2,'0') || '00'}:${m.padStart(2,'0') || '00'}:${s.padStart(2,'0') || '00'}`;
        }

        const newWorkout = {
            id: editingWorkoutId ? editingWorkoutId : Date.now(),
            date: document.getElementById('workoutDate').value || new Date().toISOString().split('T')[0],
            title: document.getElementById('workoutTitle').value.trim(),
            type: typeSelect.value,
            distance: document.getElementById('workoutDistance').value,
            duration: durationStr,
            rpe: document.getElementById('workoutRpe') ? parseInt(document.getElementById('workoutRpe').value) : null,
            structure: structureData,
            notes: document.getElementById('workoutNotes').value.trim()
        };

        if (editingWorkoutId) {
            const index = workouts.findIndex(w => w.id === editingWorkoutId);
            if (index !== -1) {
                workouts[index] = newWorkout;
            }
        } else {
            workouts.push(newWorkout);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
        
        editingWorkoutId = null;
        form.reset();
        document.getElementById('workoutDate').value = today;
        document.querySelector('#workoutModalContent h2').innerText = 'Nuovo Allenamento';
        
        if (rpeInput && rpeDisplay) {
            rpeInput.value = 5;
            rpeDisplay.textContent = 5;
            rpeDisplay.className = 'font-bold text-yellow-600';
        }

        structureContainer.classList.add('hidden');
        structureContainer.classList.remove('flex');
        
        // Reset blocks list
        const rows = blocksList.querySelectorAll('.block-row');
        rows.forEach((row, i) => { if (i > 0) row.remove(); });
        const firstRow = blocksList.querySelector('.block-row');
        if(firstRow) firstRow.querySelectorAll('input').forEach(input => input.value = '');
        if(durHr) durHr.value='';
        if(durMin) durMin.value='';
        if(durSec) durSec.value='';
        updateRemoveButtons();
        
        closeModal();
        renderFeed();
    });

    // Initial render
    renderFeed();
});
