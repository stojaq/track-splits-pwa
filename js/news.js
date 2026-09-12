// news.js

document.addEventListener('DOMContentLoaded', () => {
    

    // === News Rendering Logic ===
    const newsFeed = document.getElementById('newsFeed');
    const articleModal = document.getElementById('articleModal');
    const closeArticleBtn = document.getElementById('closeArticleBtn');
    
    // Modal Elements
    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleTag = document.getElementById('articleTag');
    const articleBody = document.getElementById('articleBody');
    const searchInput = document.getElementById('searchInput');

    const renderNewsFeed = (articlesToRender = ARTICOLI_NEWS) => {
        if (typeof articlesToRender === 'undefined' || articlesToRender.length === 0) {
            newsFeed.innerHTML = `
                <div class="text-center text-gray-500 py-10">
                    <p>Nessuna news trovata.</p>
                </div>
            `;
            return;
        }

        let html = '';
        articlesToRender.forEach(article => {
            html += `
                <div class="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]" onclick="openArticle('${article.id}')">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-md">${article.categoria}</span>
                        <span class="text-xs font-medium text-gray-400 dark:text-gray-500">${article.data}</span>
                    </div>
                    <h3 class="font-display font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 leading-snug">${article.titolo}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">${article.riassunto}</p>
                </div>
            `;
        });
        newsFeed.innerHTML = html;
    };

    // Apri modale articolo
    let currentArticle = null;
    window.openArticle = (id) => {
        const article = ARTICOLI_NEWS.find(a => a.id === id);
        if (!article) return;
        
        currentArticle = article;

        // Popola i dati
        articleTitle.innerText = article.titolo;
        articleDate.innerText = article.data;
        articleTag.innerText = article.categoria;
        articleBody.innerHTML = article.contenuto;

        // Mostra il modal con animazione
        articleModal.classList.remove('hidden');
        articleModal.classList.add('flex');
        
        // Timeout per attivare la transizione CSS di transform translateY
        setTimeout(() => {
            articleModal.classList.remove('translate-y-full');
            articleModal.scrollTop = 0;
            document.body.style.overflow = 'hidden'; // Previeni scroll di sfondo
        }, 10);
    };

    // Chiudi modale articolo
    const closeArticle = () => {
        articleModal.classList.add('translate-y-full');
        document.body.style.overflow = ''; // Ripristina scroll
        setTimeout(() => {
            articleModal.classList.add('hidden');
            articleModal.classList.remove('flex');
            currentArticle = null;
        }, 300);
    };

    if (closeArticleBtn) {
        closeArticleBtn.addEventListener('click', closeArticle);
    }

    // Tasto Condividi (Web Share API)
    const shareArticleBtn = document.getElementById('shareArticleBtn');
    if (navigator.share && shareArticleBtn) {
        // Mostra il tasto solo se il browser supporta la Web Share API (es. smartphone)
        shareArticleBtn.classList.remove('hidden');
        
        shareArticleBtn.addEventListener('click', async () => {
            if (!currentArticle) return;
            
            try {
                // Genera il Deep Link univoco per questo articolo
                const shareUrl = new URL(window.location.href);
                shareUrl.searchParams.set('id', currentArticle.id);

                await navigator.share({
                    title: currentArticle.titolo,
                    text: currentArticle.riassunto,
                    url: shareUrl.href
                });
            } catch (err) {
                // L'utente potrebbe aver annullato la condivisione, ignoriamo l'errore
                console.log('Condivisione annullata o non riuscita:', err);
            }
        });
    }

    // === Generazione Filtri e Logica ===
    const filterPillsContainer = document.getElementById('filterPills');
    let currentFilter = 'all';
    let currentSearchTerm = '';

    const initFilters = () => {
        // Estrai categorie uniche dal database
        const categories = new Set();
        ARTICOLI_NEWS.forEach(article => {
            if (article.categoria) categories.add(article.categoria);
        });

        // Crea HTML per le pillole
        let pillsHtml = `<button class="pill-btn whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-colors bg-primary-500 text-white" data-filter="all">Tutto</button>`;
        
        categories.forEach(cat => {
            pillsHtml += `<button class="pill-btn whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-colors bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border" data-filter="${cat}">${cat}</button>`;
        });

        if (filterPillsContainer) {
            filterPillsContainer.innerHTML = pillsHtml;

            // Aggiungi event listeners
            const btns = filterPillsContainer.querySelectorAll('.pill-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Reset di tutte le pillole allo stato inattivo
                    btns.forEach(b => {
                        b.classList.remove('bg-primary-500', 'text-white');
                        b.classList.add('bg-white', 'dark:bg-dark-card', 'text-gray-700', 'dark:text-gray-300', 'border-gray-200', 'dark:border-dark-border');
                    });
                    
                    // Applica stato attivo alla pillola cliccata
                    const target = e.currentTarget;
                    target.classList.remove('bg-white', 'dark:bg-dark-card', 'text-gray-700', 'dark:text-gray-300', 'border-gray-200', 'dark:border-dark-border');
                    target.classList.add('bg-primary-500', 'text-white');

                    currentFilter = target.dataset.filter;
                    applyFilters();
                });
            });
        }
    };

    const applyFilters = () => {
        let filtered = ARTICOLI_NEWS;
        
        // Applica filtro pillola
        if (currentFilter !== 'all') {
            filtered = filtered.filter(article => article.categoria === currentFilter);
        }

        // Applica filtro ricerca testo
        if (currentSearchTerm) {
            filtered = filtered.filter(article => 
                article.titolo.toLowerCase().includes(currentSearchTerm) || 
                article.riassunto.toLowerCase().includes(currentSearchTerm) ||
                article.contenuto.toLowerCase().includes(currentSearchTerm) ||
                article.categoria.toLowerCase().includes(currentSearchTerm)
            );
        }

        renderNewsFeed(filtered);
    };

    // Event Listener Ricerca Testuale
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    // Inizializza filtri e carica feed iniziale
    initFilters();
    applyFilters();

    // === Gestione Deep Link (Articolo Condiviso) ===
    const urlParams = new URLSearchParams(window.location.search);
    const sharedArticleId = urlParams.get('id');
    if (sharedArticleId) {
        // Piccolo ritardo per permettere il rendering iniziale prima di aprire il modale
        setTimeout(() => {
            window.openArticle(sharedArticleId);
        }, 300);
    }
});
