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
    window.openArticle = (id) => {
        const article = ARTICOLI_NEWS.find(a => a.id === id);
        if (!article) return;

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
        }, 300);
    };

    if (closeArticleBtn) {
        closeArticleBtn.addEventListener('click', closeArticle);
    }

    // Ricerca News
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = ARTICOLI_NEWS.filter(article => 
                article.titolo.toLowerCase().includes(term) || 
                article.riassunto.toLowerCase().includes(term) ||
                article.contenuto.toLowerCase().includes(term) ||
                article.categoria.toLowerCase().includes(term)
            );
            renderNewsFeed(filtered);
        });
    }

    // Inizializza Feed
    renderNewsFeed();
});
