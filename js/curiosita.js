document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('curiositiesContainer');
    const filtersContainer = document.getElementById('categoryFilters');
    const randomBtn = document.getElementById('randomFactBtn');
    
    let currentCategory = 'Tutte';
    const data = window.curiositiesData || [];

    // Estrae le categorie uniche dai dati
    const categories = ['Tutte', ...new Set(data.map(item => item.category))];

    // Crea i filtri (chip)
    function renderFilters() {
        filtersContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category;
            
            const baseClasses = 'whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none';
            const activeClasses = 'bg-primary-600 text-white shadow-sm';
            const inactiveClasses = 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800';

            btn.className = `${baseClasses} ${category === currentCategory ? activeClasses : inactiveClasses}`;
            
            btn.addEventListener('click', () => {
                currentCategory = category;
                renderFilters();
                renderCards();
            });

            filtersContainer.appendChild(btn);
        });
    }

    // Crea la singola card
    function createCardHTML(item) {
        return `
        <div class="flip-card h-64 perspective-1000 cursor-pointer" data-id="${item.id}">
            <div class="flip-card-inner w-full h-full relative transform-style-3d">
                
                <!-- Fronte della Card -->
                <div class="absolute w-full h-full backface-hidden bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col items-center justify-center text-center card-transition hover:shadow-md">
                    <div class="text-4xl mb-4">${item.icon}</div>
                    <span class="text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">${item.category}</span>
                    <h3 class="font-display font-bold text-xl text-gray-900 dark:text-white leading-tight">${item.title}</h3>
                    <div class="mt-auto pt-4 text-gray-400 text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>
                        Tocca per scoprire
                    </div>
                </div>

                <!-- Retro della Card -->
                <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br ${item.color || 'from-primary-500 to-primary-700'} rounded-2xl p-6 shadow-lg text-white flex flex-col justify-center">
                    <div class="overflow-y-auto no-scrollbar">
                        <h4 class="font-display font-bold text-lg mb-3 opacity-90">${item.title}</h4>
                        <p class="text-white/90 text-sm leading-relaxed">${item.content}</p>
                    </div>
                </div>

            </div>
        </div>
        `;
    }

    // Renderizza le card in base alla categoria attiva
    function renderCards() {
        container.innerHTML = '';
        
        const filteredData = currentCategory === 'Tutte' 
            ? data 
            : data.filter(item => item.category === currentCategory);

        if (filteredData.length === 0) {
            container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center col-span-full py-8">Nessuna curiosità trovata.</p>';
            return;
        }

        filteredData.forEach(item => {
            container.insertAdjacentHTML('beforeend', createCardHTML(item));
        });

        // Aggiungi event listener per il flip
        const flipCards = container.querySelectorAll('.flip-card');
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });
        });
    }

    // Curiosità Casuale
    randomBtn.addEventListener('click', () => {
        if (data.length === 0) return;
        
        // Seleziona un item a caso
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex];
        
        // Cambia la categoria per mostrare quella corretta (oppure passa a 'Tutte')
        currentCategory = 'Tutte';
        renderFilters();
        renderCards();

        // Trova la card nel DOM
        setTimeout(() => {
            const cardElement = document.querySelector(`.flip-card[data-id="${randomItem.id}"]`);
            if (cardElement) {
                // Scrolla verso la card
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Gira la card dopo un piccolo delay
                setTimeout(() => {
                    if (!cardElement.classList.contains('is-flipped')) {
                        cardElement.classList.add('is-flipped');
                    }
                }, 500);
            }
        }, 100);
    });

    // Inizializzazione
    renderFilters();
    renderCards();
});
