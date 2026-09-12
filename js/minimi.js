document.addEventListener('DOMContentLoaded', () => {
    const btnMale = document.getElementById('btnMale');
    const btnFemale = document.getElementById('btnFemale');
    const categorySelect = document.getElementById('categorySelect');
    const tableBody = document.getElementById('minimiTableBody');
    const tableTitle = document.getElementById('tableTitle');
    const searchInput = document.getElementById('searchInput');
    const noResultsMsg = document.getElementById('noResultsMsg');

    let currentGender = 'M';
    let currentCategory = 'Assoluti';
    let currentSearchTerm = '';

    const data = window.minimiData || {};

    // Inizializza categorie nel selettore
    function initCategories() {
        const categories = Object.keys(data[currentGender] || {});
        categorySelect.innerHTML = '';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            if (cat === currentCategory) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
    }

    // Aggiorna l'interfaccia bottoni sesso
    function updateGenderUI() {
        if (currentGender === 'M') {
            btnMale.className = 'flex-1 py-2 px-4 rounded-lg text-sm font-bold bg-white dark:bg-dark-card text-blue-600 dark:text-blue-400 shadow-sm transition-all focus:outline-none';
            btnFemale.className = 'flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all focus:outline-none';
        } else {
            btnFemale.className = 'flex-1 py-2 px-4 rounded-lg text-sm font-bold bg-white dark:bg-dark-card text-pink-600 dark:text-pink-400 shadow-sm transition-all focus:outline-none';
            btnMale.className = 'flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all focus:outline-none';
        }
    }

    // Renderizza la tabella
    function renderTable() {
        tableBody.innerHTML = '';
        tableTitle.textContent = `Minimi ${currentGender === 'M' ? 'Uomini' : 'Donne'} - ${currentCategory}`;

        const events = data[currentGender]?.[currentCategory] || {};
        let renderedCount = 0;

        Object.entries(events).forEach(([eventName, limitTime]) => {
            // Filtro di ricerca
            if (currentSearchTerm && !eventName.toLowerCase().includes(currentSearchTerm.toLowerCase())) {
                return;
            }

            renderedCount++;
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors';
            
            tr.innerHTML = `
                <td class="px-5 py-3.5 font-medium text-gray-900 dark:text-white">${eventName}</td>
                <td class="px-5 py-3.5 text-right font-display font-bold text-primary-600 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">${limitTime}</td>
            `;
            
            tableBody.appendChild(tr);
        });

        if (renderedCount === 0) {
            tableBody.parentElement.classList.add('hidden');
            noResultsMsg.classList.remove('hidden');
        } else {
            tableBody.parentElement.classList.remove('hidden');
            noResultsMsg.classList.add('hidden');
        }
    }

    // Listeners
    btnMale.addEventListener('click', () => {
        if (currentGender !== 'M') {
            currentGender = 'M';
            updateGenderUI();
            initCategories();
            renderTable();
        }
    });

    btnFemale.addEventListener('click', () => {
        if (currentGender !== 'F') {
            currentGender = 'F';
            updateGenderUI();
            initCategories();
            renderTable();
        }
    });

    categorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderTable();
    });

    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        renderTable();
    });

    // Init
    updateGenderUI();
    initCategories();
    renderTable();
});
