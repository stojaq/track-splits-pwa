document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'trackSplits_workouts';
    let workouts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let editingWorkoutId = null;

    // DOM Elements
    const feedContainer = document.getElementById('diaryFeed');
    const emptyState = document.getElementById('emptyDiary');
    const addBtnTop = document.getElementById('addWorkoutBtnTop');
    const addBtnEmpty = document.getElementById('addWorkoutBtnEmpty');
    const modal = document.getElementById('workoutModal');
    const modalContent = document.getElementById('workoutModalContent');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('workoutForm');

    // Init Date to today
    const dateInput = document.getElementById('workoutDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    const renderStats = () => {
        const statsSection = document.getElementById('diaryStats');
        if (workouts.length === 0) {
            statsSection.classList.add('hidden');
            return;
        }

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const currentMonthWorkouts = workouts.filter(w => {
            const d = new Date(w.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        if (currentMonthWorkouts.length === 0) {
            statsSection.classList.add('hidden');
            return;
        }

        statsSection.classList.remove('hidden');

        // Total Km
        let totalKm = 0;
        let typesCount = {
            'Lento': 0,
            'Medio': 0,
            'Ripetute': 0
        };

        currentMonthWorkouts.forEach(w => {
            if (w.distance) {
                totalKm += parseFloat(w.distance);
            }
            if (typesCount[w.type] !== undefined) {
                typesCount[w.type]++;
            } else {
                typesCount[w.type] = 1;
            }
        });

        document.getElementById('statsTotalKm').innerText = totalKm.toFixed(1);

        // Chart
        const ctx = document.getElementById('workoutsChart').getContext('2d');
        const data = [typesCount['Lento'], typesCount['Medio'], typesCount['Ripetute']];
        const labels = ['Lento', 'Medio', 'Ripetute'];
        const bgColors = ['#22c55e', '#f97316', '#ef4444'];

        if (window.diaryChartInstance) {
            window.diaryChartInstance.destroy();
        }

        window.diaryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: bgColors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8,
                            padding: 10,
                            font: { family: "'Inter', sans-serif", size: 10 }
                        }
                    }
                }
            }
        });
    };

    const renderFeed = () => {
        // Sort from newest to oldest
        workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (workouts.length === 0) {
            emptyState.style.display = 'block';
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
        
        workouts.forEach((workout, index) => {
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
            card.className = 'bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border relative group';
            
            // Delete button
            const delBtn = document.createElement('button');
            delBtn.className = 'absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity';
            delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`;
            delBtn.onclick = () => {
                if (confirm('Sei sicuro di voler eliminare questo allenamento?')) {
                    workouts.splice(index, 1);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
                    renderFeed();
                }
            };

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'absolute top-4 right-12 text-gray-400 hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity';
            editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>`;
            editBtn.onclick = () => {
                editingWorkoutId = workout.id;
                document.getElementById('workoutDate').value = workout.date;
                document.getElementById('workoutTitle').value = workout.title || '';
                document.getElementById('workoutType').value = workout.type;
                document.getElementById('workoutDistance').value = workout.distance || '';
                document.getElementById('workoutNotes').value = workout.notes || '';
                
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
            
            const titleHTML = workout.title ? `<h4 class="font-bold text-lg text-gray-900 dark:text-white pr-6">${workout.title}</h4>` : '';
            const typeColor = workout.type === 'Ripetute' ? 'bg-red-100 text-red-700' : (workout.type === 'Medio' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700');
            
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
            
            card.innerHTML = `
                ${titleHTML}
                <div class="flex items-center gap-2 mt-2">
                    <span class="text-xs font-semibold px-2 py-1 rounded-full ${typeColor}">${workout.type}</span>
                    <span class="text-sm text-gray-500">${wDate.toLocaleDateString('it-IT')}</span>
                    ${workout.distance ? `<span class="text-sm font-medium ml-auto">${workout.distance} km</span>` : ''}
                </div>
                ${structureHTML}
                ${workout.notes ? `<p class="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">${workout.notes}</p>` : ''}
            `;
            
            card.appendChild(editBtn);
            card.appendChild(delBtn);
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
        
        const structureContainer = document.getElementById('repsStructureContainer');
        const blocksList = document.getElementById('blocksList');
        structureContainer.classList.add('hidden');
        structureContainer.classList.remove('flex');
        
        const rows = blocksList.querySelectorAll('.block-row');
        rows.forEach((r, i) => { if (i > 0) r.remove(); });
        const firstRow = blocksList.querySelector('.block-row');
        if(firstRow) firstRow.querySelectorAll('input').forEach(input => input.value = '');
        
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

        const newWorkout = {
            id: editingWorkoutId ? editingWorkoutId : Date.now(),
            date: document.getElementById('workoutDate').value || new Date().toISOString().split('T')[0],
            title: document.getElementById('workoutTitle').value.trim(),
            type: typeSelect.value,
            distance: document.getElementById('workoutDistance').value,
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
        structureContainer.classList.add('hidden');
        structureContainer.classList.remove('flex');
        
        // Reset blocks list
        const rows = blocksList.querySelectorAll('.block-row');
        rows.forEach((row, i) => { if (i > 0) row.remove(); });
        const firstRow = blocksList.querySelector('.block-row');
        if(firstRow) firstRow.querySelectorAll('input').forEach(input => input.value = '');
        updateRemoveButtons();
        
        closeModal();
        renderFeed();
    });

    // Initial render
    renderFeed();
});
